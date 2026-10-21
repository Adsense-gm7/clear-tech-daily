document.getElementById("year")?.replaceChildren(String(new Date().getFullYear()));
const menu=document.querySelector(".menu");
const nav=document.getElementById("primary-nav");
menu?.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));nav?.classList.toggle("open",!open)});

// Optional notebook: no network requests and no automatic writes.
const logForm=document.getElementById('workout-log');
if(logForm){
 const fields=[...logForm.querySelectorAll('input')],status=document.getElementById('log-status');
 const key='form-first-session-v1';
 const date=document.getElementById('log-date');
 const now=new Date();date.value=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
 try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&typeof saved==='object')for(const f of fields){const v=saved[f.dataset.cell||'date'];if(typeof v==='string')f.value=v.slice(0,200)}}catch{status.textContent='Browser saving is unavailable or the previous entry could not be read. You can still download or print.'}
 logForm.addEventListener('submit',e=>{e.preventDefault();try{localStorage.setItem(key,JSON.stringify(Object.fromEntries(fields.map(f=>[f.dataset.cell||'date',f.value]))));status.textContent='Session saved in this browser. Download a CSV before replacing it with another session.'}catch{status.textContent='Could not save in this browser. Download a CSV to keep this session.'}});
 document.getElementById('print-log').addEventListener('click',()=>window.print());
 document.getElementById('export-log').addEventListener('click',()=>{
  // Neutralize spreadsheet formulas in user-supplied cells.
  const quote=v=>'"'+(/^[\s]*[=+@-]/.test(v)?"'"+v:v).replaceAll('"','""')+'"';
  const rows=[['Date','Exercise / variation','Load / equipment','Reps or seconds per set','Technique / next step']];
  for(let r=0;r<6;r++){const values=[0,1,2,3].map(c=>logForm.querySelector(`[data-cell="${r}-${c}"]`).value);if(values.some(v=>v.trim()))rows.push([date.value,...values]);}
  const blob=new Blob(['\uFEFF'+rows.map(row=>row.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`form-first-${date.value||'session'}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='CSV downloaded. Keep it somewhere private on shared devices.';
 });
}
const guideSearch=document.getElementById('guide-search');
if(guideSearch){const cards=[...document.querySelectorAll('#guide-results .card')];guideSearch.addEventListener('input',()=>{const q=guideSearch.value.trim().toLowerCase();let count=0;for(const card of cards){const show=card.textContent.toLowerCase().includes(q);card.hidden=!show;if(show)count++;}document.getElementById('guide-count').textContent=`${count} ${count===1?'guide':'guides'}`;document.getElementById('guide-empty').hidden=count!==0;});}
