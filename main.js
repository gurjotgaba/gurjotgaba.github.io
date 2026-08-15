
const menu=document.querySelector('.menu-button'),nav=document.querySelector('.site-nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const current=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.site-nav a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active')});
document.querySelector('#current-year').textContent=new Date().getFullYear();
const topBtn=document.querySelector('.to-top');addEventListener('scroll',()=>topBtn.classList.toggle('visible',scrollY>500));topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const pubSearch=document.querySelector('#publication-search'),pubFilter=document.querySelector('#publication-filter');
function filterPubs(){const q=(pubSearch?.value||'').toLowerCase(),cat=pubFilter?.value||'all';document.querySelectorAll('.pub-card').forEach(card=>{card.hidden=!(card.dataset.text.includes(q)&&(cat==='all'||card.dataset.category===cat));});document.querySelectorAll('.pub-category').forEach(sec=>{const visible=[...sec.querySelectorAll('.pub-card')].some(x=>!x.hidden);sec.hidden=!visible;});}
pubSearch?.addEventListener('input',filterPubs);pubFilter?.addEventListener('change',filterPubs);

const showStudents=document.querySelector('.show-students'),students=document.querySelector('.collapsible-students');
showStudents?.addEventListener('click',()=>{const open=students.classList.toggle('open');showStudents.setAttribute('aria-expanded',String(open));showStudents.textContent=open?'Hide theses −':'Show all 25 theses ＋';});

document.querySelectorAll('.activity-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.activity-tabs button').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.activity-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');document.querySelector('#'+btn.dataset.panel).classList.add('active');}));

document.querySelectorAll('.event-open').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.querySelector('.event-full').classList.add('open')));
document.querySelectorAll('.event-close').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.event-full').classList.remove('open')));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.event-full.open').forEach(x=>x.classList.remove('open'));});

if(window.Plotly&&window.VISITED_COUNTRIES&&document.querySelector('#world-map')){
 const data=[{type:'choropleth',locationmode:'country names',locations:window.VISITED_COUNTRIES,z:window.VISITED_COUNTRIES.map(()=>1),text:window.VISITED_COUNTRIES,hovertemplate:'<b>%{text}</b><extra>Visited</extra>',colorscale:[[0,'#8e2638'],[1,'#8e2638']],showscale:false,marker:{line:{color:'#ffffff',width:.6}}}];
 const layout={geo:{projection:{type:'natural earth'},showframe:false,showcoastlines:false,showland:true,landcolor:'#d8dee4',showocean:true,oceancolor:'#f7fafc',bgcolor:'#ffffff'},margin:{l:0,r:0,t:0,b:0},paper_bgcolor:'#ffffff',plot_bgcolor:'#ffffff'};
 Plotly.newPlot('world-map',data,layout,{responsive:true,displayModeBar:false});
}

/* =========================================================
   AWARDS POPUP
   ========================================================= */

const awardModal = document.querySelector('#award-modal');

if (awardModal) {

    const modalImage = document.querySelector('#award-modal-image');
    const modalYear = document.querySelector('#award-modal-year');
    const modalTitle = document.querySelector('#award-modal-title');
    const modalDescription = document.querySelector('#award-modal-description');
    const modalLinks = document.querySelector('#award-modal-links');
    const closeButton = awardModal.querySelector('.award-modal-close');

    function openAward(card) {

        const image = card.querySelector('.award-showcase-image img');
        const year = card.querySelector('time');
        const title = card.querySelector('h3');
        const description = card.querySelector('.award-showcase-content > p');
        const links = card.querySelector('.link-row');

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        modalYear.textContent = year ? year.textContent : '';
        modalTitle.textContent = title ? title.textContent : '';
        modalDescription.textContent =
            description ? description.textContent : '';

        modalLinks.innerHTML = '';

        if (links) {
            links.querySelectorAll('a').forEach(function(link) {
                modalLinks.appendChild(link.cloneNode(true));
            });
        }

        awardModal.showModal();
    }

    document.querySelectorAll('.award-showcase-card').forEach(function(card) {

        card.addEventListener('click', function(event) {

            if (event.target.closest('a')) {
                return;
            }

            openAward(card);
        });

        card.addEventListener('keydown', function(event) {

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openAward(card);
            }
        });

    });

    closeButton.addEventListener('click', function() {
        awardModal.close();
    });

    awardModal.addEventListener('click', function(event) {

        if (event.target === awardModal) {
            awardModal.close();
        }
    });
}