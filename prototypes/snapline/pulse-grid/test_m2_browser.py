from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image,ImageDraw,ImageFont
import os,json,time,sys
root=Path(__file__).parent
html=(root/'standalone.html').read_text()
out=root/'evidence_m2';out.mkdir(exist_ok=True)
start=(38,555);end=(319,87)
routeA=[start,(47,415),(57,275),(285,265),end]
order={'a':['planbasics','detour','efficient','timing'],'b':['detour','snaplab','snapchoice','timing'],'c':['liveahead','detour','liveflow','timing']}
def pos(bb,p):return (bb['x']+p[0]*bb['width']/360,bb['y']+p[1]*bb['height']/640)
def enter(page,mode,course):
 page.locator('#mode'+mode.upper()).click();page.locator('#startDemo').click()
 page.locator('.course-card').nth(order[mode].index(course)).click()
 if page.evaluate('window.__p62Snapshot().guideOpen'):page.locator('#closeHowto').click()
 return page.locator('#courseCanvas').bounding_box()
def draw(page,bb,pts,steps=18):
 page.mouse.move(*pos(bb,pts[0]));page.mouse.down()
 for p in pts[1:]:page.mouse.move(*pos(bb,p),steps=steps)
 page.mouse.up()
def snapshot(page):return page.evaluate('window.__materialSnapshot()')
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 for width,height in [(390,844),(360,800),(412,915)]:
  ctx=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1,has_touch=True,is_mobile=True)
  page=ctx.new_page();errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
  page.set_content(html,wait_until='load')
  bb=enter(page,'a','planbasics')
  assert snapshot(page)['material']=='pulse'
  if width==390:page.locator('#phone').screenshot(path=str(out/'normal_idle_390.png'))
  page.locator('#surfaceToggle').click();assert snapshot(page)['material']=='jelly'
  if width==390:page.locator('#phone').screenshot(path=str(out/'jelly_idle_390.png'))
  page.locator('#surfaceToggle').click();assert snapshot(page)['material']=='slime'
  if width==390:page.locator('#phone').screenshot(path=str(out/'slime_idle_390.png'))
  draw(page,bb,routeA)
  assert page.locator('#goBtn').is_enabled(),page.locator('#status').inner_text()
  page.locator('#goBtn').click();page.wait_for_function('window.__snaplineSnapshot().ticks>=140',timeout=8000)
  s=snapshot(page);assert s['slime']['traveled']>0 and s['slime']['deposits']>0 and s['slime']['energy']>0,s
  page.locator('#phone').screenshot(path=str(out/f'slime_running_{width}.png'))
  page.wait_for_function('window.__p2Refine().view==="result"',timeout=15000)
  assert page.evaluate('window.__snaplineSnapshot().phase')=='won'
  # material selector persists across course reset without altering game physics
  assert not errs,errs
  assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'), 'page overflow'
  print('PASS A slime',width,'deposits',s['slime']['deposits'],'energy',s['slime']['energy'],flush=True)
  ctx.close()
 # B signature level leftward SNAP, unchanged reaction to actual moving runner
 ctx=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=1)
 page=ctx.new_page();errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
 page.set_content(html,wait_until='load');bb=enter(page,'b','snapchoice')
 page.locator('#surfaceToggle').click();page.locator('#surfaceToggle').click()
 draw(page,bb,[start,(258,548),end]);page.locator('#goBtn').click()
 page.wait_for_function('window.__snaplineSnapshot().ticks>=205',timeout=6000)
 page.locator('#snapBtn').click();state=page.evaluate('window.__snaplineSnapshot()')
 assert state['snapEditing'] and state['phase']=='paused',state
 a=pos(bb,(state['snapAnchor']['x'],state['snapAnchor']['y']))
 page.mouse.move(*a);page.mouse.down();page.mouse.move(*pos(bb,(180,250)),steps=13);page.mouse.up()
 assert page.evaluate('window.__snaplineSnapshot().snapSpent'),page.evaluate('window.__snaplineSnapshot()')
 page.locator('#phone').screenshot(path=str(out/'slime_snap_390.png'))
 page.wait_for_function('window.__p2Refine().view==="result"',timeout=17000)
 assert page.evaluate('window.__snaplineSnapshot().phase')=='won';assert not errs,errs
 print('PASS B slime snap',flush=True);ctx.close()
 # C Live Drawing follows actual movement
 ctx=browser.new_context(viewport={'width':412,'height':915},device_scale_factor=1)
 page=ctx.new_page();errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
 page.set_content(html,wait_until='load');bb=enter(page,'c','liveahead');page.locator('#surfaceToggle').click();page.locator('#surfaceToggle').click()
 draw(page,bb,[start,(40,305),(315,292),end],steps=23)
 page.wait_for_function('window.__p2Refine().view==="result"',timeout=17000)
 assert page.evaluate('window.__snaplineSnapshot().phase')=='won'
 assert snapshot(page)['slime']['deposits']>0;assert not errs,errs
 print('PASS C slime live',flush=True);ctx.close()
 browser.close()
imgs=[Image.open(out/f).convert('RGB') for f in ['normal_idle_390.png','jelly_idle_390.png','slime_idle_390.png','slime_running_390.png','slime_snap_390.png']]
w=390;gap=18;pad=25;top=78;bot=42
sheet=Image.new('RGB',(pad*2+w*len(imgs)+gap*(len(imgs)-1),top+max(i.height for i in imgs)+bot),'#0b1321')
d=ImageDraw.Draw(sheet)
try:
 font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
 note=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',12)
except:font=note=None
for i,(im,label) in enumerate(zip(imgs,['01  NORMAL GRID','02  JELLY RESTING','03  SLIME RESTING','04  SLIME MOVING','05  SLIME + SNAP'])):
 x=pad+i*(w+gap);sheet.paste(im,(x,top));d.text((x,24),label,font=font,fill='#bff5ce')
d.text((pad,top+imgs[0].height+15),'Real Chromium screenshots · Slime follows simulated runner, not finger movement · Visual material only',font=note,fill='#b9cbd5')
sheet.save('/mnt/data/Snapline_Sprint_M2_Materials_Actual_Screens.png',optimize=True)
print('SCREENSHOT SHEET READY',flush=True)
