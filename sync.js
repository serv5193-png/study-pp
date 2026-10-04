/* مذاكرتي — المزامنة عبر GitHub API (مستودع خاص) */
const GH=()=>{try{return JSON.parse(localStorage.sa_gh||'null')}catch(e){return null}};
const ghU=p=>{const c=GH();return `https://api.github.com/repos/${c.u}/${c.r}/contents/${p}`};
const ghH=raw=>({Authorization:'Bearer '+GH().t,Accept:raw?'application/vnd.github.raw+json':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'});
const b64e=s=>btoa(unescape(encodeURIComponent(s))),b64d=s=>decodeURIComponent(escape(atob(s.replace(/\s/g,''))));
const SY={sha:null,busy:false,t:null};
const syS=m=>{const e=$('#sy');if(e)e.textContent=m};
async function ghGet(p){const r=await fetch(ghU(p),{headers:ghH()});if(r.status==404)return null;if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}
async function ghPut(p,c64,sha,msg){const b={message:msg||'sync',content:c64};if(sha)b.sha=sha;const r=await fetch(ghU(p),{method:'PUT',headers:{...ghH(),'Content-Type':'application/json'},body:JSON.stringify(b)});if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}
async function sync(){if(!GH()||SY.busy)return;SY.busy=true;syS('⏳');
try{const rm=await ghGet('data.json');let rd=null;if(rm){rd=JSON.parse(b64d(rm.content));SY.sha=rm.sha}
if(rd&&(rd._ts||0)>(S._ts||0)){S=Object.assign({},D0,rd);localStorage.sa=JSON.stringify(S);applyAcc();document.documentElement.dataset.t=S.theme;if(tab!='sync')R[tab]()}
else if(!rd||(S._ts||0)>(rd._ts||0)){const r=await ghPut('data.json',b64e(JSON.stringify(S)),SY.sha,'sync '+new Date().toISOString());SY.sha=r.content.sha}
localStorage.sa_last=new Date().toLocaleTimeString('ar');syS('☁️ '+localStorage.sa_last)}
catch(e){syS('⚠️');toast('تعذّرت المزامنة: '+e.message)}SY.busy=false}
R.sync=()=>{const c=GH()||{};$('#v').innerHTML=`<h2>السحابة والمزامنة</h2><div class="card"><h3>الربط مع GitHub</h3><input id="gu" placeholder="اسم حساب GitHub" value="${esc(c.u||'')}"><input id="gr" placeholder="اسم المستودع الخاص، مثل study-data" value="${esc(c.r||'')}"><input id="gt" type="password" placeholder="Personal Access Token" value="${esc(c.t||'')}"><div class="row"><button onclick="gSave()">حفظ واختبار الاتصال</button>${c.t?`<button class="s" onclick="sync()">مزامنة الآن</button><button class="r" onclick="gOff()">فصل</button>`:''}</div><p class="m">آخر مزامنة: ${esc(localStorage.sa_last||'—')}</p></div>
<div class="card"><h3>خطوات الإعداد</h3><p class="m">1) أنشئ مستودعاً <b>Private</b> باسم study-data.<br>2) من Settings ثم Developer settings ثم Fine-grained tokens، أنشئ توكن لهذا المستودع وحده، بصلاحية Contents: Read and write، مع تحديد تاريخ انتهاء.<br>3) أدخل البيانات نفسها على كل جهاز.</p></div>
<div class="card"><h3>الأمان</h3><p class="m">يُحفَظ التوكن على هذا الجهاز فقط ولا يدخل في النسخة الاحتياطية. لا تضعه داخل كود التطبيق أو في مستودع التطبيق العام. عند فقدان الجهاز ألغِ التوكن من GitHub فوراً. عند حدوث تعارض يُعتمد آخر تعديل.</p></div>`};
async function gSave(){const c={u:$('#gu').value.trim(),r:$('#gr').value.trim(),t:$('#gt').value.trim()};if(!c.u||!c.r||!c.t)return toast('يرجى تعبئة جميع الحقول');localStorage.sa_gh=JSON.stringify(c);
try{const r=await fetch(`https://api.github.com/repos/${c.u}/${c.r}`,{headers:ghH()});if(!r.ok)throw new Error('HTTP '+r.status);const j=await r.json();
if(!j.private&&!confirm('المستودع عام (Public) وسيتمكن الجميع من رؤية بياناتك. هل تريد المتابعة؟')){gOff();return}
const rm=await ghGet('data.json');if(rm){if(confirm('وُجدت بيانات في السحابة. هل تريد استبدال بيانات هذا الجهاز بها؟')){S=Object.assign({},D0,JSON.parse(b64d(rm.content)));SY.sha=rm.sha;applyAcc()}else S._ts=Date.now();localStorage.sa=JSON.stringify(S)}
toast('✅ تم الربط');await sync();R.sync()}catch(e){localStorage.removeItem('sa_gh');toast('فشل الاتصال: '+e.message)}}
function gOff(){localStorage.removeItem('sa_gh');syS('');R.sync()}
function syncInit(){window.syncQ=()=>{if(!GH())return;clearTimeout(SY.t);SY.t=setTimeout(sync,4000)};document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync()});sync()}
