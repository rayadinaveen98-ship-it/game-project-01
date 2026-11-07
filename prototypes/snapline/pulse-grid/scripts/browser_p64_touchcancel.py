from pathlib import Path
from playwright.sync_api import sync_playwright
HTML=(Path(__file__).resolve().parents[1]/'standalone.html').read_text()
with sync_playwright() as p:
 br=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 ctx=br.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2,reduced_motion='reduce')
 pg=ctx.new_page();pg.evaluate("""() => {Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}});}""")
 pg.set_content(HTML);pg.locator('#modeC').tap();pg.locator('#startDemo').tap();pg.locator('.course-card').first.tap();pg.locator('#closeHowto').tap()
 box=pg.locator('#courseCanvas').bounding_box()
 def xy(pt):return box['x']+pt[0]*box['width']/360,box['y']+pt[1]*box['height']/640
 cdp=ctx.new_cdp_session(pg)
 def send(type,pt=None):
  points=[] if pt is None else [dict(x=xy(pt)[0],y=xy(pt)[1],id=1,radiusX=2,radiusY=2,force=1)]
  cdp.send('Input.dispatchTouchEvent',dict(type=type,touchPoints=points))
 send('touchStart',(38,555))
 for j in range(1,65):send('touchMove',(38+2*j/64,555+(305-555)*j/64))
 st=pg.evaluate('window.__snaplineSnapshot()');assert st['phase']=='running' and st['drawing'],st
 send('touchCancel')
 st=pg.evaluate('window.__snaplineSnapshot()');assert st['phase']=='paused' and not st['drawing'] and st['points']>2,st
 previous=st['ticks'];pg.wait_for_timeout(200);assert pg.evaluate('window.__snaplineSnapshot().ticks')==previous
 print('PASS P6.4 synthetic touchscreen OS cancel pauses Live Drawing and keeps trail',flush=True)
 ctx.close();br.close()
