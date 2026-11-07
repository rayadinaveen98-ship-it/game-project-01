import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
mkdirSync(resolve(root,'dist'),{recursive:true});
for(const file of ['index.html','style.css']) cpSync(resolve(root,file),resolve(root,'dist',file));
writeFileSync(resolve(root,'dist','.nojekyll'),'');
console.log('Built static prototype in dist/ (no external runtime dependencies).');
