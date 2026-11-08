from pathlib import Path
from playwright.sync_api import sync_playwright
html=Path(__file__).parent.joinpath('standalone.html').read_text()
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 for name,options in [('standard',{}),('reduced-motion',{'reduced_motion':'reduce'})]:
  ctx=browser.new_context(viewport={'width':360,'height':800},device_scale_factor=1,**options)
  page=ctx.new_page();errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
  page.set_content(html,wait_until='load')
  page.locator('#modeA').click();page.locator('#startDemo').click();page.locator('.course-card').first.click()
  if page.evaluate('window.__p62Snapshot().guideOpen'):page.locator('#closeHowto').click()
  assert page.locator('#surfaceToggle').get_attribute('aria-label').startswith('Board surface Normal')
  for expected in ['jelly','slime','pulse']:
   page.locator('#surfaceToggle').click()
   snap=page.evaluate('window.__materialSnapshot()')
   assert snap['material']==expected,(name,expected,snap)
  page.locator('#surfaceToggle').click();page.locator('#surfaceToggle').click()
  assert page.evaluate('window.__materialSnapshot().material')=='slime'
  snap=page.evaluate('window.__materialSnapshot()');assert snap['reducedMotion']==(name=='reduced-motion')
  assert snap['slime']['deposits']==0
  assert page.locator('#surfaceToggle').is_visible()
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
  assert not errs,errs
  print('PASS selector cycle, accessibility label, reduced-motion static field:',name,flush=True)
  ctx.close()
 browser.close()
