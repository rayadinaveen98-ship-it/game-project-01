import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
let ts;
try { ts=require('typescript'); }
catch { ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js'); }
// In CI the pinned local TypeScript devDependency is used. The fallback permits offline local authoring.
const root=path.resolve(new URL('..',import.meta.url).pathname);
const walk=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const modules=walk(path.join(root,'src')).filter(f=>f.endsWith('.ts')).map(f=>{
  const id='src/'+path.relative(path.join(root,'src'),f).replace(/\\/g,'/').replace(/\.ts$/,'.js');
  const compiled=ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  return `${JSON.stringify(id)}:function(require,module,exports){\n${compiled}\n}`;
});
const bundle=`(()=>{const modules={${modules.join(',\n')}};const cache={};function load(id){if(cache[id])return cache[id].exports;const fn=modules[id];if(!fn)throw Error('Module not found: '+id);const mod={exports:{}};cache[id]=mod;const localReq=(spec)=>{if(!spec.startsWith('.'))throw Error('External dependency refused: '+spec);const arr=id.split('/').slice(0,-1);for(const part of spec.split('/')){if(part==='..')arr.pop();else if(part!=='.')arr.push(part)}return load(arr.join('/'))};fn(localReq,mod,mod.exports);return mod.exports}load('src/main.js')})();`;
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="./style.css" />',`<style>\n${css}\n</style>`);
html=html.replace('<script type="module" src="./src/main.js"></script>',`<script>\n${bundle}\n</script>`);
fs.writeFileSync(path.join(root,'standalone.html'),html);
console.log('Standalone offline HTML:',Buffer.byteLength(html),'bytes.');
