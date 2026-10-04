/* مذاكرتي — المؤقت والأصوات */
const P={pomo:['بومودورو 25/5',25,5],p52:['52/17',52,17],u90:['90/20 تركيز عميق',90,20],p50:['50/10',50,10],p15:['سبرنت 15/3',15,3],fl:['ماراثون 120/15',120,15]};
let T={k:'pomo',ph:'w',left:25*60,run:false,end:0,sw:false,sub:'',cnt:0};
function ac(){return window.AC||(window.AC=new(window.AudioContext||window.webkitAudioContext))}
function beep(){try{const a=ac(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;g.gain.setValueAtTime(.3,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+1);o.start();o.stop(a.currentTime+1)}catch(e){}}
function setK(k){T.k=k;T.sw=k=='sw';T.ph='w';T.run=false;T.left=k=='sw'?0:k=='cu'?(+$('#cm')?.value||30)*60:P[k][1]*60;R.timer()}
function fmt(s){s=Math.max(0,Math.round(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return (h?h+':':'')+String(m).padStart(h?2:2,'0')+':'+String(s%60).padStart(2,'0')}
function tg(){T.sub=$('#ts')?.value||T.sub;if(T.run){T.left=T.sw?(Date.now()-T.end)/1000:(T.end-Date.now())/1000;T.run=false}else{T.run=true;T.end=T.sw?Date.now()-T.left*1000:Date.now()+T.left*1000;ac().resume&&ac().resume();if(window.Notification&&Notification.permission=='default')Notification.requestPermission()}R.timer()}
function addLog(min){if(min<=0)return;const k=today(),s=T.sub||'عام';S.log[k]=S.log[k]||{};S.log[k][s]=(S.log[k][s]||0)+min;save()}
function rs(){if(T.sw)addLog(Math.floor(T.left/60));T.run=false;T.ph='w';T.left=T.sw?0:T.k=='cu'?(+$('#cm')?.value||30)*60:P[T.k][1]*60;R.timer()}
setInterval(()=>{if(!T.run)return;const l=T.sw?(Date.now()-T.end)/1000:(T.end-Date.now())/1000;if(!T.sw&&l<=0){beep();const w=T.ph=='w';if(w){addLog(T.k=='cu'?Math.round(+$('#cm')?.value||30):P[T.k][1]);T.cnt++}
if(window.Notification&&Notification.permission=='granted')new Notification(w?'اكتملت جلسة المذاكرة 🎉':'انتهت الاستراحة، لنعد إلى المذاكرة');
if(T.k=='cu'){T.run=false;T.left=0}else{T.ph=w?'b':'w';T.left=P[T.k][w?2:1]*60;T.end=Date.now()+T.left*1000}if(tab=='timer')R.timer();return}
T.left=T.sw?l:l;const e=$('#tm');if(e){e.textContent=fmt(l);rgu(l);document.title=fmt(l)+' • مذاكرتي'}},250);
let SN=null;function noise(type){stopN();const a=ac(),b=a.createBuffer(1,a.sampleRate*3,a.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){const w=Math.random()*2-1;if(type=='w')d[i]=w*.4;else{l=(l+.02*w)/1.02;d[i]=l*3.5}}
const s=a.createBufferSource();s.buffer=b;s.loop=true;const g=a.createGain();g.gain.value=.5;s.connect(g);g.connect(a.destination);s.start();SN=s}
function stopN(){if(SN){SN.stop();SN=null}}
