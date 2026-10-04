/* مذاكرتي — أدوات عامة */
const VER='1.2';
function toast(m,rl){const e=$('#toast');e.innerHTML=esc(m)+(rl?' <button onclick="location.reload()">إعادة التحميل</button>':'');e.classList.add('on');clearTimeout(window.TT);window.TT=setTimeout(()=>e.classList.remove('on'),rl?9000:4500)}
const ACC=[['#6d5efc','#c04bff'],['#0ea5e9','#6366f1'],['#10b981','#06b6d4'],['#f97316','#ec4899'],['#e11d48','#f59e0b']];
function applyAcc(){const a=ACC[S.acc]||ACC[0],r=document.documentElement.style;r.setProperty('--p',a[0]);r.setProperty('--p2',a[1]);document.querySelector('meta[name=theme-color]').content=a[0]}
function rgu(l){const e=$('#rg');if(!e)return;const tot=T.sw?3600:(T.k=='cu'?(+$('#cm')?.value||30)*60:P[T.k][T.ph=='w'?1:2]*60),p=T.sw?(l%3600)/36:(1-l/tot)*100;e.style.background=`conic-gradient(var(--p) ${Math.max(0,p)}%,var(--bd) 0)`}
const clk=()=>{const e=$('#clk');if(e)e.textContent=new Date().toLocaleString('ar',{weekday:'long',hour:'2-digit',minute:'2-digit'})};clk();setInterval(clk,30000);
