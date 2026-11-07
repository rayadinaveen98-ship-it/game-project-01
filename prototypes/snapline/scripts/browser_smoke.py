from playwright.sync_api import sync_playwright
import json, os, time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'standalone.html').read_text(encoding='utf8')
OUT=str(ROOT/'evidence')
os.makedirs(OUT,exist_ok=True)

def coord(box,x,y):return (box['x']+box['width']*x/360,box['y']+box['height']*y/640)
def draw(page, pts, mobile=False):
    box=page.locator('#courseCanvas').bounding_box()
    assert box, 'missing canvas'
    if not mobile:
        x,y=coord(box,*pts[0]);page.mouse.move(x,y);page.mouse.down()
        for p in pts[1:]:
            x,y=coord(box,*p);page.mouse.move(x,y,steps=25)
        page.mouse.up()
    else:
        session=page.context.new_cdp_session(page)
        def dispatch(typ,p):
            x,y=coord(box,*p)
            session.send('Input.dispatchTouchEvent',{'type':typ,'touchPoints':[] if typ=='touchEnd' else [{'x':x,'y':y,'id':3}]})
        dispatch('touchStart',pts[0])
        for a,b in zip(pts,pts[1:]):
            for j in range(1,21):
                p=(a[0]+(b[0]-a[0])*j/20,a[1]+(b[1]-a[1])*j/20)
                dispatch('touchMove',p)
        dispatch('touchEnd',pts[-1])
    return page.evaluate('window.__snaplineSnapshot()')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    errors=[]
    desktop=browser.new_page(viewport={'width':900,'height':1040},device_scale_factor=1)
    desktop.on('pageerror',lambda e:errors.append('desktop: '+str(e)))
    desktop.set_content(HTML,wait_until='load')
    desktop.screenshot(path=OUT+'/p1_desktop_initial.png',full_page=True)
    print('Initial desktop',desktop.evaluate('window.__snaplineSnapshot()'))
    ok=draw(desktop,[(38,555),(310,550),(319,87)])
    print('After desktop draw',ok,'go_enabled',desktop.locator('#goBtn').is_enabled())
    assert desktop.locator('#goBtn').is_enabled()
    desktop.screenshot(path=OUT+'/p1_desktop_route.png',full_page=True)
    desktop.locator('#goBtn').click()
    desktop.wait_for_function("['won','lost'].includes(window.__snaplineSnapshot().phase)",timeout=15000)
    end=desktop.evaluate('window.__snaplineSnapshot()')
    print('After desktop run',end)
    assert end['phase']=='won',end
    desktop.screenshot(path=OUT+'/p1_desktop_win.png',full_page=True)
    desktop.locator('#resetBtn').click()
    draw(desktop,[(38,555),(319,87)])
    assert desktop.locator('#goBtn').is_enabled()
    desktop.locator('#goBtn').click()
    desktop.wait_for_function("['won','lost'].includes(window.__snaplineSnapshot().phase)",timeout=15000)
    lost=desktop.evaluate('window.__snaplineSnapshot()')
    print('Static collision test',lost)
    assert lost['phase']=='lost' and 'solid' in (lost['result'] or '')
    desktop.close()  # Prevent headless Chromium from throttling the background mobile page.
    browser.close()
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])

    mobile=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
    page=mobile.new_page();page.on('pageerror',lambda e:errors.append('mobile: '+str(e)))
    page.set_content(HTML,wait_until='load')
    page.bring_to_front()
    page.screenshot(path=OUT+'/p1_mobile_initial.png',full_page=True)
    touch=draw(page,[(38,555),(310,550),(319,87)],mobile=True)
    print('After mobile touch',touch,'go enabled',page.locator('#goBtn').is_enabled())
    assert page.locator('#goBtn').is_enabled(), touch
    page.screenshot(path=OUT+'/p1_mobile_route.png',full_page=True)
    page.wait_for_timeout(400)  # Allow synthetic touch-end suppression window to clear.
    page.locator('#goBtn').tap()
    page.wait_for_function("['won','lost'].includes(window.__snaplineSnapshot().phase)",timeout=15000)
    endm=page.evaluate('window.__snaplineSnapshot()');print('After mobile run',endm)
    assert endm['phase']=='won',endm
    page.screenshot(path=OUT+'/p1_mobile_win.png',full_page=True)
    page.locator('#courseSelect').select_option('timing')
    touch2=draw(page,[(38,555),(310,550),(319,87)],mobile=True)
    print('Mobile course2',touch2)
    page.wait_for_timeout(400)  # Allow synthetic touch-end suppression window to clear.
    page.locator('#goBtn').tap()
    page.wait_for_function("['won','lost'].includes(window.__snaplineSnapshot().phase)",timeout=15000)
    assert page.evaluate('window.__snaplineSnapshot().phase')=='won'
    print('Mobile course2 win verified')
    print('Browser JS errors',errors)
    assert not errors
    browser.close()
