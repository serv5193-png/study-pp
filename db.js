/* مذاكرتي — قاعدة بيانات الكتب */
const db=()=>new Promise((r,j)=>{const q=indexedDB.open('sa',1);q.onupgradeneeded=()=>q.result.createObjectStore('b',{keyPath:'id',autoIncrement:true});q.onsuccess=()=>r(q.result);q.onerror=j});
async function bk(m,v){const d=await db();return new Promise(r=>{const o=d.transaction('b',m=='get'||m=='all'?'readonly':'readwrite').objectStore('b');const q=m=='put'?o.put(v):m=='all'?o.getAll():m=='del'?o.delete(v):o.get(v);q.onsuccess=()=>r(q.result)})}
