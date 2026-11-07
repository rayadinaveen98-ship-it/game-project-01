from pathlib import Path
from playwright.sync_api import sync_playwright
html=(Path(__file__).resolve().parents[1]/'standalone.html').read_text()
with sync_playwright() as p:
 br=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=br.new_page(viewport={'width':390,'height':844},reduced_motion='reduce');page.set_content(html)
 page.locator('#modeC').click();page.locator('#startDemo').click();page.locator('.course-card').first.click();page.locator('#closeHowto').click()
 box=page.locator('#courseCanvas').bounding_box()
 def pos(pt):return box['x']+pt[0]/360*box['width'],box['y']+pt[1]/640*box['height']
 page.mouse.move(*pos((38,555)));page.mouse.down();page.mouse.move(*pos((40,305)),steps=80)
 before=page.evaluate('window.__snaplineSnapshot()');assert before['phase']=='running' and before['drawing'],before
 page.evaluate("document.querySelector('#helpBtn').click()")
 st=page.evaluate('window.__snaplineSnapshot()');assert st['phase']=='paused' and not st['drawing'] and not st['activePointer'],st
 assert page.evaluate('window.__p62Snapshot().guideOpen')
 page.mouse.up();assert page.evaluate('window.__snaplineSnapshot().points')==st['points'],'unexpected new segment while Help was open'
 page.locator('#closeHowto').click();assert page.evaluate('window.__snaplineSnapshot().phase')=='paused'
 print('PASS Help while finger active: stops simulation, releases captured pointer, no hidden route mutation')
 br.close()
