
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.primary-nav');
menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
const current=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.primary-nav a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active')});
document.querySelector('#year').textContent=new Date().getFullYear();
const back=document.querySelector('.back-to-top');addEventListener('scroll',()=>back.classList.toggle('show',scrollY>500));back.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const search=document.querySelector('#pub-search'),type=document.querySelector('#pub-type'),pubs=[...document.querySelectorAll('.publication-card')];
function filterPubs(){const q=(search?.value||'').toLowerCase(),t=type?.value||'all';pubs.forEach(p=>p.hidden=!p.textContent.toLowerCase().includes(q)||(t!=='all'&&p.dataset.type!==t))}
search?.addEventListener('input',filterPubs);type?.addEventListener('change',filterPubs);
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab-panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('#'+b.dataset.tab).classList.add('active')}));
