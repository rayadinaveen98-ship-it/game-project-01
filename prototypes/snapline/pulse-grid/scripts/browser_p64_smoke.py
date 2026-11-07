from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'standalone.html').read_text()
OUT=ROOT/'evidence_p64'; OUT.mkdir(exist_ok=True)
START=(38,555)
COURSES={'a':['planbasics','detour','efficient','timing'],'b':['detour','snaplab','snapchoice','timing'],'c':['liveahead','detour','liveflow','timing']}

def xy(box,point):return (box['x']+box['width']*point[0]/360,box['y']+box['height']*point[1]/640)
def start(page,mode,course):
 page.evaluate("""() => {window.__mockStorage={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>window.__mockStorage[k]??null,setItem:(k,v)=>window.__mockStorage[k]=v,removeItem:k=>{delete window.__mockStorage[k]}}});}""")
 page.set_content(HTML,wait_until='domcontentloaded')
 page.locator('#mode'+mode.upper()).click();page.locator('#startDemo').click()
 page.locator('.course-card').nth(COURSES[mode].index(course)).click()
 if page.evaluate('window.__p62Snapshot().guideOpen'):page.locator('#closeHowto').click()
 assert page.evaluate('window.__p63Snapshot().course')==course
 return page.locator('#courseCanvas').bounding_box()
def draw(page,box,points,finish=True,steps=30):
 page.mouse.move(*xy(box,points[0]));page.mouse.down()
 for x in points[1:]:page.mouse.move(*xy(box,x),steps=steps)
 if finish:page.mouse.up()
def snap(page):return page.evaluate('window.__snaplineSnapshot()')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 # A: interrupted single stroke never becomes a valid route.
 ctx=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
 page=ctx.new_page();errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
 box=start(page,'a','planbasics');draw(page,box,[START,(47,415)],False)
 before=snap(page); assert before['drawing'] and before['activePointer'] is not None, before
 page.evaluate("""()=>{const id=window.__snaplineSnapshot().activePointer;document.querySelector('#courseCanvas').dispatchEvent(new PointerEvent('pointercancel',{pointerId:id,bubbles:true}));}""")
 after=snap(page);assert not after['drawing'] and after['activePointer'] is None and after['points']==0 and after['phase']=='ready',after
 page.mouse.up();assert not page.locator('#goBtn').is_enabled()
 assert not errors,errors
 print('PASS P6.4 A cancel invalidates unfinished stroke',flush=True)
 ctx.close()
 # C: live stroke cancellation pauses immediately but preserves completed trail; resumed input continues.
 ctx=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
 page=ctx.new_page();errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
 box=start(page,'c','liveahead')
 draw(page,box,[START,(40,405),(40,305)],False,steps=40)
 previous=snap(page);assert previous['phase']=='running' and previous['drawing'],previous
 page.evaluate("""()=>{const id=window.__snaplineSnapshot().activePointer;document.querySelector('#courseCanvas').dispatchEvent(new PointerEvent('pointercancel',{pointerId:id,bubbles:true}));}""")
 interrupted=snap(page)
 assert interrupted['phase']=='paused' and not interrupted['drawing'] and interrupted['points']>=2,interrupted
 position=interrupted['runnerPosition'];ticks=interrupted['ticks']
 page.wait_for_timeout(230)
 assert snap(page)['ticks']==ticks,'ticks advanced during interruption pause'
 page.locator('#phone').screenshot(path=str(OUT/'p64_live_interruption_390.png'))
 assert page.locator('#substatus').inner_text().startswith('App or touch interrupted'),page.locator('#substatus').inner_text()
 page.mouse.up();page.locator('#pauseBtn').click()
 assert snap(page)['phase']=='running' and snap(page)['points']==interrupted['points']
 assert not errors,errors
 print('PASS P6.4 C cancels safely, preserves trail & pauses time',flush=True)
 ctx.close()
 # A: blur while running freezes simulation; resume keeps physical position and reaches real result.
 ctx=browser.new_context(viewport={'width':360,'height':800},reduced_motion='reduce')
 page=ctx.new_page();errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
 box=start(page,'a','planbasics')
 draw(page,box,[START,(47,415),(57,275),(285,265),(319,87)])
 assert page.locator('#goBtn').is_enabled(),snap(page)
 page.locator('#goBtn').click();page.wait_for_function('window.__snaplineSnapshot().ticks>=10',timeout=4000)
 page.evaluate('window.dispatchEvent(new Event("blur"))')
 a=snap(page);assert a['phase']=='paused',a
 page.wait_for_timeout(200);b=snap(page)
 assert b['ticks']==a['ticks'] and b['runnerPosition']==a['runnerPosition'],(a,b)
 page.locator('#phone').screenshot(path=str(OUT/'p64_plan_paused_360.png'))
 page.locator('#pauseBtn').click();page.wait_for_function('window.__p2Refine().view==="result"',timeout=16000)
 assert snap(page)['phase']=='won';assert not errors,errors
 print('PASS P6.4 A background freeze and resume-to-win',flush=True)
 ctx.close()
 # B: blur during active snap editing cancels preview without spending the correction.
 ctx=browser.new_context(viewport={'width':412,'height':915},reduced_motion='reduce')
 page=ctx.new_page();errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
 box=start(page,'b','snapchoice')
 draw(page,box,[START,(258,548),(319,87)])
 assert page.locator('#goBtn').is_enabled(),snap(page)
 page.locator('#goBtn').click();page.wait_for_function('window.__snaplineSnapshot().ticks>=12',timeout=5000)
 page.locator('#snapBtn').click();assert snap(page)['snapEditing'] and snap(page)['phase']=='paused',snap(page)
 page.evaluate('window.dispatchEvent(new Event("blur"))')
 s=snap(page);assert s['phase']=='paused' and not s['snapEditing'] and not s['snapSpent'],s
 page.locator('#phone').screenshot(path=str(OUT/'p64_snap_interrupted_412.png'))
 page.locator('#pauseBtn').click();assert snap(page)['phase']=='running'
 page.locator('#snapBtn').click();assert snap(page)['snapEditing'] and not snap(page)['snapSpent']
 assert not errors,errors
 print('PASS P6.4 B interrupted snap is recoverable and unspent',flush=True)
 ctx.close()
 # No origin-backed persistence claims: this browser is only allowed inline documents.
 browser.close()
