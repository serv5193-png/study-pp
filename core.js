/* مذاكرتي — الأساس */
const R={};

const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const D0={sub:['رياضيات','عربي','إنجليزي','علوم'],log:{},tasks:[],cards:[],notes:[],exams:[],mine:[],theme:'l',goal:240,plan:[],rem:{on:false,daily:'20:00',pre:10},acc:0};
let S=Object.assign({},D0,JSON.parse(localStorage.sa||'{}'));const save=()=>{S._ts=Date.now();localStorage.sa=JSON.stringify(S);if(window.syncQ)syncQ()};
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const dayMin=k=>Object.values(S.log[k]||{}).reduce((a,b)=>a+b,0);
document.documentElement.dataset.t=S.theme;
const c=document.createElement('canvas');c.width=c.height=180;const x=c.getContext('2d');x.fillStyle='#4f46e5';x.fillRect(0,0,180,180);x.font='110px serif';x.textAlign='center';x.fillText('📖',90,128);$('#ai').href=c.toDataURL();
const TABS=[['home','🏠','الرئيسية'],['timer','⏱','المؤقت'],['plan','🗓','الجدول'],['tasks','✅','المهام'],['cards','🃏','بطاقات'],['notes','📝','ملاحظات'],['books','📚','كتب'],['links','🔗','روابط'],['sync','☁️','السحابة'],['more','⚙️','المزيد']];
let tab='home';function go(t){tab=t;$('#n').innerHTML=TABS.map(a=>`<button class="${a[0]==t?'on':''}" onclick="go('${a[0]}')"><b>${a[1]}</b>${a[2]}</button>`).join('');const v=$('#v');v.style.animation='none';v.offsetHeight;v.style.animation='';R[t]();scrollTo(0,0)}
const subOpts=()=>S.sub.map(s=>`<option>${esc(s)}</option>`).join('');
