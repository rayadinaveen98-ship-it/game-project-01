from playwright.sync_api import sync_playwright
from pathlib import Path
html=(Path(__file__).parent/'dist'/'Snapline_Sprint_P65_Playtest_Lab.html').read_text()
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1280,'height':960})
 page.set_content(html,wait_until='load')
 frame=page.locator('#game').element_handle().content_frame()
 assert frame, 'srcdoc iframe missing'
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 frame.locator('#modeA').click()
 frame.locator('#startDemo').click()
 assert frame.locator('.course-card').count()==4
 frame.locator('.course-card').first.click()
 if frame.locator('#howtoOverlay').is_visible():frame.locator('#closeHowto').click()
 assert frame.evaluate('window.__p63Snapshot().course')=='planbasics'
 box=frame.locator('#courseCanvas').bounding_box()
 pts=[(38,555),(47,415),(57,275),(285,265),(319,87)]
 def xy(x,y):return (box['x']+box['width']*x/360,box['y']+box['height']*y/640)
 page.mouse.move(*xy(*pts[0]));page.mouse.down()
 for pt in pts[1:]:page.mouse.move(*xy(*pt),steps=32)
 page.mouse.up()
 assert frame.locator('#goBtn').is_enabled(),frame.evaluate('window.__snaplineSnapshot()')
 frame.locator('#goBtn').click()
 frame.wait_for_function('window.__p2Refine().view==="result"',timeout=20000)
 assert frame.evaluate('window.__snaplineSnapshot().phase')=='won'
 assert page.evaluate('window.__p65Snapshot().studySessions')==0,'Gameplay must not auto-collect session data'
 assert not errors,errors
 print('PASS embedded original P6.4 game actual Home -> Plan Basics -> route drawn -> GO -> real win; no study auto-recording')
 b.close()
