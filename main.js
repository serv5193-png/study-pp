/* مذاكرتي — التشغيل */
if('serviceWorker'in navigator){navigator.serviceWorker.register('./sw.js').then(r=>{window.SWR=r;r.addEventListener('updatefound',()=>toast('⬇️ جارٍ تنزيل تحديث جديد...'))}).catch(()=>{});let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had)toast('✅ تم تحديث التطبيق، أعد التحميل لتطبيق التغييرات',1);had=true})}
applyAcc();syncInit();go('home');
