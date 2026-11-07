from playwright.sync_api import sync_playwright
from pathlib import Path
from PIL import Image
import threading,http.server,json,os,time
root=Path(__file__).resolve().parents[1];out=root/'evidence_p21';out.mkdir(exist_ok=True)
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*a,**kw):super().__init__(*a,directory=str(root),**kw)
    def log_message(self,*args):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/standalone.html'
route=[(38,555),(48,480),(48,330),(48,190),(50,78),(319,87)]
exceptions=[]

def draw_mouse(page):
    b=page.locator('#courseCanvas').bounding_box();assert b
    p=lambda x,y:(b['x']+x/360*b['width'],b['y']+y/640*b['height'])
    page.mouse.move(*p(*route[0]));page.mouse.down()
    for pt in route[1:]:page.mouse.move(*p(*pt),steps=22)
    page.mouse.up()

with sync_playwright() as P:
    br=P.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=br.new_page(viewport={'width':1280,'height':960},device_scale_factor=1)
    page.on('pageerror',lambda e:exceptions.append('desktop '+str(e)))
    page.set_content((root/'standalone.html').read_text(),wait_until='load')
    assert page.evaluate('window.__p2Refine().view')=='home'
    page.locator('#phone').screenshot(path=str(out/'pulse_home.png'))
    page.locator('#startDemo').click()
    assert page.evaluate('window.__p2Refine().view')=='game'
    page.locator('#helpBtn').click();assert page.locator('#howtoOverlay').is_visible()
    page.locator('#closeHowto').click();assert page.locator('#howtoOverlay').is_hidden()
    draw_mouse(page)
    assert page.locator('#goBtn').is_enabled(),page.evaluate('window.__snaplineSnapshot()')
    drawn=page.evaluate('window.__snaplineSnapshot()')
    page.locator('#phone').screenshot(path=str(out/'pulse_game.png'))
    page.locator('#goBtn').click()
    page.wait_for_function('window.__p2Refine().view==="result"',timeout=13000)
    results=page.evaluate('window.__p2Refine()'); assert results['phase']=='won',results
    ink=float(page.locator('#resultInk').inner_text());assert ink==drawn['ink'],(ink,drawn)
    seconds=float(page.locator('#resultTime').inner_text());assert seconds>0
    page.locator('#phone').screenshot(path=str(out/'pulse_result.png'))
    page.locator('#retryResult').click();assert page.evaluate('window.__p2Refine().view')=='game'
    assert page.evaluate('window.__snaplineSnapshot().phase')=='ready'
    page.locator('#backToHome').click();assert page.evaluate('window.__p2Refine().view')=='home'
    page.screenshot(path=str(out/'pulse_desktop.png'),full_page=True)
    print('desktop_pass',json.dumps({'route':drawn,'result':results,'ink':ink,'seconds':seconds}))
    for width,height in [(412,915)]:
        ctx=br.new_context(viewport={'width':width,'height':height},device_scale_factor=2,is_mobile=True,has_touch=True)
        mob=ctx.new_page();mob.on('pageerror',lambda e:exceptions.append(f'mobile{width} '+str(e)))
        mob.set_content((root/'standalone.html').read_text(),wait_until='load');assert mob.evaluate('window.__p2Refine().view')=='home'
        assert mob.evaluate('document.documentElement.scrollWidth - innerWidth')<=2,(width,'overflow home')
        mob.locator('#startDemo').click();assert mob.evaluate('window.__p2Refine().view')=='game'
        assert mob.evaluate('document.documentElement.scrollWidth - innerWidth')<=2,(width,'overflow game')
        b=mob.locator('#courseCanvas').bounding_box();assert b,(width,'board missing')
        assert b['width']>250,(width,'board too small',b)
        cdp=ctx.new_cdp_session(mob)
        def finger(ty,x,y):
            px=b['x']+x/360*b['width'];py=b['y']+y/640*b['height']
            cdp.send('Input.dispatchTouchEvent',{'type':ty,'touchPoints':[] if ty=='touchEnd' else [{'x':px,'y':py,'id':1,'radiusX':2,'radiusY':2,'force':1}]})
        finger('touchStart',*route[0])
        for a,z in zip(route,route[1:]):
            for j in range(1,23):finger('touchMove',a[0]+(z[0]-a[0])*j/22,a[1]+(z[1]-a[1])*j/22)
        finger('touchEnd',*route[-1]);mob.wait_for_timeout(450)
        s=mob.evaluate('window.__snaplineSnapshot()')
        assert s['points']>5 and mob.locator('#goBtn').is_enabled(),(width,s)
        mob.screenshot(path=str(out/f'pulse_{width}_route.png'))
        mob.locator('#goBtn').click()
        mob.wait_for_function('window.__p2Refine().view==="result"',timeout=15000)
        r=mob.evaluate('window.__p2Refine()');assert r['phase']=='won',(width,r)
        assert mob.evaluate('document.documentElement.scrollWidth - innerWidth')<=2,(width,'overflow result')
        mob.screenshot(path=str(out/f'pulse_{width}_result.png'))
        mob.locator('#nextDemo').click()
        assert mob.evaluate('window.__p2Refine().course')=='timing',(width,'next failed')
        print('mobile_pass',json.dumps({'width':width,'draw':s['ink'],'result':r,'boardH':round(b['height'])}))
        ctx.close()
    assert not exceptions,exceptions
    br.close()
from PIL import Image
imgs=[Image.open(out/f'pulse_{v}.png').convert('RGB') for v in ('home','game','result')]
pad=18;sheet=Image.new('RGB',(3*390+4*pad,844+2*pad),'#121820')
for i,im in enumerate(imgs):sheet.paste(im,(pad+i*(390+pad),pad))
sheet.save(out/'pulse_p21_three_screens.png')
print('smoke_and_visual_qa_PASS',len(list(out.glob('*.png'))),'screenshots')
server.shutdown()
