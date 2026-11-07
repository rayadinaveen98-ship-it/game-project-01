from playwright.sync_api import sync_playwright
from pathlib import Path
import json
source=Path(__file__).parent/'dist'/'Snapline_Sprint_P65_Playtest_Lab.html'
html=source.read_text()
evidence=Path(__file__).parent/'evidence'
evidence.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(1280,920),(390,844)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1,is_mobile=(width<500),has_touch=(width<500))
  errors=[]
  page.on('pageerror',lambda e: errors.append(str(e)))
  page.set_content(html,wait_until='load',timeout=30000)
  page.wait_for_function("!!window.__p65Snapshot && document.getElementById('game').contentDocument===null",timeout=20000)
  assert page.evaluate('window.__p65Snapshot().studySessions')==0
  assert page.locator('#emptyResult').is_visible()
  assert page.locator('#exportJSON').is_disabled()
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth+1'), 'horizontal overflow'
  iframe=page.frame_locator('#game')
  iframe.locator('#modeA').wait_for(timeout=15000)
  assert iframe.locator('#modeB').count()==1
  page.screenshot(path=str(evidence/('p65_lab_desktop.png' if width>500 else 'p65_lab_mobile.png')),full_page=(width>500),animations='disabled')
  if width>500:
   page.locator('#consent').check()
   assert page.locator('#startSession').is_enabled()
   page.locator('#startSession').click()
   assert page.evaluate('window.__p65Snapshot().activeSession')=='S01'
   assert page.locator('#testOrder').inner_text().startswith('1. A')
   page.locator('#understood').select_option('yes')
   page.locator('#hintCount').fill('1')
   page.locator('#winCount').fill('2')
   page.locator('#retried').check()
   page.locator('input[name="rating_fun"][value="4"]').check()
   page.locator('#modeForm button[type="submit"]').click()
   assert page.evaluate('window.__p65Snapshot().recordedModes')==['a']
   page.locator('#understood').select_option('no')
   page.locator('#modeForm button[type="submit"]').click()
   page.locator('#understood').select_option('unsure')
   page.locator('#modeForm button[type="submit"]').click()
   assert len(page.evaluate('window.__p65Snapshot().recordedModes'))==3
   page.locator('#preference').select_option('a')
   page.locator('#finishSession').click()
   assert page.evaluate('window.__p65Snapshot().studySessions')==1
   assert page.evaluate('window.__p65Snapshot().summary.complete')==1
   assert page.locator('#exportJSON').is_enabled()
   assert page.locator('#exportCSV').is_enabled()
   exported=page.evaluate('window.SnaplineStudy.toJSON([window.SnaplineStudy.makeSession(0)])')
   assert '"observations": {}' in exported
   # New study sessions are only recorded by explicit user events, not by starting the game.
   page.locator('#consent').check();page.locator('#startSession').click()
   assert page.locator('#testOrder').inner_text().startswith('1. B')
   page.locator('#discardSession').click()
   page.on('dialog', lambda dialog: dialog.accept())
   page.locator('#discardSession').click()
  else:
   page.locator('#fullscreenGame').click()
   assert page.locator('#playArea.full-play').count()==1
   assert page.locator('#exitFull').is_visible()
   assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth+1')
   page.locator('#exitFull').click()
   assert page.locator('#playArea.full-play').count()==0
  assert not errors,errors[:6]
  print('PASS',width,height,'game iframe and research flow',page.evaluate('window.__p65Snapshot()'))
  page.close()
 browser.close()
