/* مذاكرتي — التذكيرات */
const FI={};
function notify(t,b){toast('🔔 '+t+(b?' — '+b:''));beep();if(window.Notification&&Notification.permission=='granted')try{new Notification(t,{body:b,icon:$('#ai').href})}catch(e){}}
setInterval(()=>{if(!S.rem.on)return;const hm=h=>String(h.getHours()).padStart(2,'0')+':'+String(h.getMinutes()).padStart(2,'0'),now=hm(new Date()),k=today();
if(now==S.rem.daily&&!FI[k+'d']){FI[k+'d']=1;notify('تذكير المذاكرة اليومي','حان موعد جلسة اليوم، والهدف '+S.goal+' دقيقة')}
S.plan.forEach((a,i)=>{if(a.d!=dI())return;const p=a.t.split(':'),s=new Date();s.setHours(+p[0],+p[1]-S.rem.pre,0,0);if(hm(s)==now&&!FI[k+i]){FI[k+i]=1;notify('حصة '+a.s,'تبدأ بعد '+S.rem.pre+' دقيقة، عند الساعة '+a.t)}})},15000);
function remT(){S.rem.on=!S.rem.on;save();if(S.rem.on&&window.Notification&&Notification.permission=='default')Notification.requestPermission();R.more()}
function chk(){if(window.SWR)SWR.update().then(()=>toast('اكتمل الفحص، ستظهر رسالة عند توفر إصدار جديد')).catch(()=>toast('تعذّر الفحص، تحقق من الاتصال'));else toast('خدمة التحديث غير متاحة حالياً')}
