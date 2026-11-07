from pathlib import Path
from playwright.sync_api import sync_playwright
HTML=(Path(__file__).resolve().parents[1]/'standalone.html').read_text()
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce')
 page.set_content(HTML)
 page.locator('#modeC').click();page.locator('#startDemo').click();page.locator('.course-card').nth(0).click();page.locator('#closeHowto').click()
 box=page.locator('#courseCanvas').bounding_box()
 def xy(t):return (box['x']+t[0]*box['width']/360,box['y']+t[1]*box['height']/640)
 page.mouse.move(*xy((38,555)));page.mouse.down();page.mouse.move(*xy((40,305)),steps=90)
 assert page.evaluate('window.__snaplineSnapshot().phase')=='running'
 page.evaluate("""()=>{const id=window.__snaplineSnapshot().activePointer;document.querySelector('canvas').dispatchEvent(new PointerEvent('pointercancel',{pointerId:id,bubbles:true}));}""")
 page.mouse.up()
 assert page.evaluate('window.__snaplineSnapshot().phase')=='paused'
 page.mouse.move(*xy((40,305)))
 page.locator('#pauseBtn').click()
 page.mouse.move(*xy((40,305)));page.mouse.down();page.mouse.move(*xy((315,292)),steps=55);page.mouse.move(*xy((319,87)),steps=45);page.mouse.up()
 page.wait_for_function('window.__p2Refine().view==="result"',timeout=17000)
 print('LIVE C RECOVER AND WIN',page.evaluate('window.__snaplineSnapshot()'))
 browser.close()
