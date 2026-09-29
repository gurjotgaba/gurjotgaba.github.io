
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

        modalImage.hidden = false;

    const modalPdf = document.querySelector('#award-modal-pdf');

    if (modalPdf) {
        modalPdf.hidden = true;
        modalPdf.src = '';
    }
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

/* =========================================================
   CERTIFICATIONS — USE EXISTING AWARDS POPUP
   ========================================================= */

if (awardModal) {

    const certificationCards =
        document.querySelectorAll('.certification-showcase-card');

    const awardModalImage =
        document.querySelector('#award-modal-image');

    const awardModalPdf =
        document.querySelector('#award-modal-pdf');

    const awardModalYear =
        document.querySelector('#award-modal-year');

    const awardModalTitle =
        document.querySelector('#award-modal-title');

    const awardModalDescription =
        document.querySelector('#award-modal-description');

    const awardModalLinks =
        document.querySelector('#award-modal-links');


    function openCertificationModal(card) {

        const year =
            card.querySelector('time');

        const title =
            card.querySelector('h3');

        const description =
            card.querySelector('.certification-showcase-content > p');

        const certificateFile =
            card.querySelector('.certificate-file');

        const pdf =
            certificateFile
                ? certificateFile.dataset.pdf
                : '';


        /* Hide award image */
        awardModalImage.hidden = true;
        awardModalImage.src = '';


        /* Show certificate PDF */
        awardModalPdf.hidden = false;
        awardModalPdf.src =
            pdf + '#page=1&view=FitH';


        awardModalYear.textContent =
            year ? year.textContent : '';

        awardModalTitle.textContent =
            title ? title.textContent : '';

        awardModalDescription.textContent =
            description ? description.textContent : '';


        /* No external links required */
        awardModalLinks.innerHTML = '';


        awardModal.showModal();
    }


    certificationCards.forEach(function(card) {

        card.addEventListener('click', function() {
            openCertificationModal(card);
        });


        card.addEventListener('keydown', function(event) {

            if (event.key === 'Enter' ||
                event.key === ' ') {

                event.preventDefault();

                openCertificationModal(card);
            }

        });

    });

}

/* =========================================================
   GLOBAL RESEARCH NETWORK
   SVG + vanilla JavaScript

   The geographic SVG is only a background.
   Future network changes should normally be made only
   inside RESEARCH_NETWORK below.
   ========================================================= */

const researchNetworkMap =
    document.querySelector('#research-network-map');

if (researchNetworkMap) {

    const SVG_NS = 'http://www.w3.org/2000/svg';

    const MAP_WIDTH = 1200;
    const MAP_HEIGHT = 600;


    /* =====================================================
       RESEARCH HUB
       ===================================================== */

    const RESEARCH_HUB = {
        institution: 'Linköping University',
        location: 'Linköping, Sweden',
        lat: 58.4108,
        lon: 15.6214,

        collaborators: [
            {
                name: 'Andrei Gurtov',
                themes: [
                    'Aviation Cybersecurity',
                    'Zero Trust',
                    'IoT/IoMT Security',
                    'Federated Learning',
                    'Cyber Risk Assessment'
                ]
            }
        ]
    };


    /* =====================================================
       COLLABORATION DATA

       For future updates, this is normally the only
       section that needs to be edited.
       ===================================================== */

    const RESEARCH_NETWORK = [

        {
            id: 'foi',
            institution:
                'FOI (Swedish Defence Research Agency)',

            location:
                'Linköping, Sweden',

            /*
             * Slight visual offset from LiU because both
             * organisations are in Linköping.
             */

            lat: 58.30,
            lon: 16.25,

            collaborators: [
                {
                    name: 'Martin Karresand',

                    themes: [
                        'Password Security',
                        'Password Analysis'
                    ]
                }
            ]
        },


        {
            id: 'lfv',

            institution:
                'LFV (Luftfartsverket)',

            location:
                'Norrköping, Sweden',

            lat: 58.5877,
            lon: 16.1924,

            collaborators: [
                {
                    name: 'Supathida Boonsong',

                    themes: [
                        'ATC Cybersecurity',
                        'Cybersecurity Awareness & Training'
                    ]
                }
            ]
        },


        {
            id: 'kth',

            institution:
                'KTH Royal Institute of Technology',

            location:
                'Stockholm, Sweden',

            lat: 59.3498,
            lon: 18.0686,

            collaborators: [
                {
                    name: 'Ismail Butun',

                    themes: [
                        'IIoT Authentication & Key Exchange',
                        'Industry 4.0 Security & Privacy'
                    ]
                }
            ]
        },


        {
            id: 'warwick',

            institution:
                'University of Warwick',

            location:
                'Coventry, United Kingdom',

            lat: 52.3793,
            lon: -1.5615,

            collaborators: [
                {
                    name: 'Pardeep Kumar',

                    themes: [
                        'Authentication & Key Exchange',
                        'IIoT/IoT Security',
                        'Aviation Communications',
                        'Healthcare Security'
                    ]
                }
            ]
        },


        {
            id: 'ucd',

            institution:
                'UCD (University College Dublin)',

            location:
                'Dublin, Ireland',

            lat: 53.3067,
            lon: -6.2210,

            collaborators: [
                {
                    name: 'Madhusanka Liyanage',

                    themes: [
                        'Key Exchange',
                        'Healthcare Authentication',
                        'Industry 4.0 Security & Privacy'
                    ]
                }
            ]
        },


        {
            id: 'mtu',

            institution:
                'MTU (Munster Technological University)',

            location:
                'Cork, Ireland',

            lat: 51.885,
            lon: -8.533,

            collaborators: [
                {
                    name: 'Kapal Dev',

                    themes: [
                        'HTTPS Cybersecurity Assessment'
                    ]
                }
            ]
        },


        {
            id: 'vub',

            institution:
                'VUB (Vrije Universiteit Brussel)',

            location:
                'Brussels, Belgium',

            lat: 50.8216,
            lon: 4.395,

            collaborators: [
                {
                    name: 'An Braeken',

                    themes: [
                        'Healthcare Authentication',
                        'Zero-Knowledge Proofs',
                        'Aviation Authentication & Secure Handover'
                    ]
                }
            ]
        },


        {
            id: 'dlr',

            institution:
                'DLR (German Aerospace Center)',

            location:
                'Germany',

            lat: 51.1657,
            lon: 10.4515,

            collaborators: [

                {
                    name: 'Maria Hagl',

                    themes: [
                        'ATC Cybersecurity',
                        'Cybersecurity Awareness & Training',
                        'ATM Risk Management'
                    ]
                },

                {
                    name: 'Nils Mäurer',

                    themes: [
                        'LDACS Cybersecurity',
                        'Aviation Authentication & Key Agreement',
                        'Post-Quantum Aviation Security'
                    ]
                },

                {
                    name: 'Tim H. Stelkens-Kobsch',

                    themes: [
                        'ATM Cybersecurity',
                        'Cyber Risk Assessment',
                        'ATC Cybersecurity Training'
                    ]
                }

            ]
        },


        {
            id: 'unibw',

            institution:
                'University of the Bundeswehr Munich – SECOsys',

            location:
                'Munich, Germany',

            lat: 48.080,
            lon: 11.638,

            collaborators: [
                {
                    name: 'Corinna Schmitt',

                    themes: [
                        'LDACS Cybersecurity',
                        'Aviation Authentication & Key Agreement',
                        'Post-Quantum Aviation Security'
                    ]
                }
            ]
        },


        {
            id: 'padua',

            institution:
                'University of Padua',

            location:
                'Padua, Italy',

            lat: 45.4064,
            lon: 11.8768,

            collaborators: [
                {
                    name: 'Gulshan Kumar',

                    themes: [
                        'Authentication',
                        'Key Exchange',
                        '5G/IoT Security'
                    ]
                }
            ]
        },


        {
            id: 'cefriel',

            institution:
                'Cefriel',

            location:
                'Milan, Italy',

            lat: 45.4642,
            lon: 9.1900,

            collaborators: [
                {
                    name: 'Enrico Frumento',

                    themes: [
                        'Future ATM Cybersecurity'
                    ]
                }
            ]
        },


        {
            id: 'collins',

            institution:
                'Collins Aerospace',

            location:
                'Italy',

            lat: 42.8,
            lon: 12.8,

            collaborators: [

                {
                    name: 'Davide Martintoni',

                    themes: [
                        'Future ATM Cybersecurity',
                        'ATM Cyber Risk Assessment'
                    ]
                },

                {
                    name: 'Valerio Senni',

                    themes: [
                        'Future ATM Cybersecurity',
                        'ATM Cyber Risk Assessment'
                    ]
                }

            ]
        },


        {
            id: 'patras',

            institution:
                'University of Patras',

            location:
                'Patras, Greece',

            lat: 38.2892,
            lon: 21.7854,

            collaborators: [
                {
                    name: 'Nicolas Sklavos',

                    themes: [
                        'AI & Blockchain for Secure 6G Communications'
                    ]
                }
            ]
        },


        {
            id: 'sintef',

            institution:
                'SINTEF Digital',

            location:
                'Norway',

            lat: 63.4305,
            lon: 10.3951,

            collaborators: [

                {
                    name: 'Karin Bernsmed',

                    themes: [
                        'ATM Cybersecurity',
                        'Cyber Risk Assessment'
                    ]
                },

                {
                    name: 'Per Håkon Meland',

                    themes: [
                        'ATM Cybersecurity',
                        'ATM Risk Management'
                    ]
                },

                {
                    name: 'Gencer Erdogan',

                    themes: [
                        'ATM Cybersecurity',
                        'ATM Risk Management'
                    ]
                }

            ]
        },


        {
            id: 'um6p',

            institution:
                'UM6P (Mohammed VI Polytechnic University)',

            location:
                'Morocco',

            lat: 32.2359,
            lon: -7.9536,

            collaborators: [

                {
                    name: 'Mustapha Hedabou',

                    themes: [
                        'Healthcare Security',
                        'Federated Learning Intrusion Detection',
                        'Adversarial/Evasion Attacks'
                    ]
                },

                {
                    name: 'El Mehdi Amhoud',

                    themes: [
                        'GAN-Based Evasion Attacks',
                        'Multicarrier Communication Security'
                    ]
                }

            ]
        },


        {
            id: 'cadi-ayyad',

            institution:
                'Cadi Ayyad University',

            location:
                'Marrakech, Morocco',

            lat: 31.6295,
            lon: -7.9811,

            collaborators: [
                {
                    name: 'Yassine Sadqi',

                    themes: [
                        'Web Attack Detection',
                        'HTTPS Cybersecurity Assessment',
                        'Cybersecurity Virtual Labs'
                    ]
                }
            ]
        },


        {
            id: 'taif',

            institution:
                'Taif University',

            location:
                'Taif, Saudi Arabia',

            lat: 21.2854,
            lon: 40.4248,

            collaborators: [
                {
                    name: 'Mehedi Masud',

                    themes: [
                        'IoMT/Healthcare Security',
                        'Authentication',
                        'Privacy-Preserving Security',
                        'Secure Key Establishment'
                    ]
                }
            ]
        },


        {
            id: 'lpu',

            institution:
                'LPU (Lovely Professional University)',

            location:
                'Punjab, India',

            lat: 31.2536,
            lon: 75.7037,

            collaborators: [
                {
                    name: 'Parminder Singh',

                    themes: [
                        'Federated Learning for IoMT Intrusion Detection',
                        'Industry 4.0 Security & Privacy'
                    ]
                }
            ]
        },


        {
            id: 'konkuk',

            institution:
                'Konkuk University',

            location:
                'South Korea',

            lat: 37.541,
            lon: 127.078,

            collaborators: [
                {
                    name: 'Tai-Hoon Kim',

                    themes: [
                        'Authentication',
                        'Key Exchange',
                        '5G/IoT Security'
                    ]
                }
            ]
        },


        {
            id: 'bi-management',

            institution:
                'BI Management',

            location:
                'Singapore',

            lat: 1.3521,
            lon: 103.8198,

            collaborators: [
                {
                    name: 'Christina Boguszewicz',

                    themes: [
                        'Cyberspace Mental Wellbeing',
                        'Fourth Industrial Revolution'
                    ]
                }
            ]
        },


        {
            id: 'cdu',

            institution:
                'Charles Darwin University',

            location:
                'Darwin, Australia',

            lat: -12.371,
            lon: 130.869,

            collaborators: [
                {
                    name: 'Mamoun Alazab',

                    themes: [
                        'Industrial Network Security',
                        'Privacy-Preserving Key Establishment',
                        'Healthcare Authentication'
                    ]
                }
            ]
        },


        {
            id: 'cyberverge',

            institution:
                'CyberVerge',

            location:
                'British Columbia, Canada',

            lat: 53.7267,
            lon: -127.6476,

            collaborators: [
                {
                    name: 'Harsimranjit Singh Gill',

                    themes: [
                        'Secure Multimedia Big Data',
                        'IoT-Based Smart Cities'
                    ]
                }
            ]
        },


        {
            id: 'jpmorgan',

            institution:
                'JPMorgan Chase',

            location:
                'United States',

            /*
             * Country-level placement because the precise
             * current work city has not been established.
             */

            lat: 39.5,
            lon: -98.35,

            collaborators: [
                {
                    name: 'Alparslan Sari',

                    themes: [
                        'Industry 4.0 Security & Privacy'
                    ]
                }
            ]
        }

    ];


    /* =====================================================
       DOM REFERENCES
       ===================================================== */

    const networkContainer =
        document.querySelector('.research-network');

    const networkMapWrap =
        document.querySelector(
            '.research-network-map-wrap'
        );

    const tooltip =
        document.querySelector(
            '#research-network-tooltip'
        );

    const panel =
        document.querySelector(
            '#research-network-panel'
        );

    const panelContent =
        document.querySelector(
            '#research-network-panel-content'
        );

    const panelClose =
        document.querySelector(
            '#research-network-panel-close'
        );


    /* =====================================================
       MAP BACKGROUND
       ===================================================== */

    const mapBackground =
        document.createElement('img');

    mapBackground.src =
        'assets/world-map.svg';

    mapBackground.alt = '';

    mapBackground.setAttribute(
        'aria-hidden',
        'true'
    );

    mapBackground.className =
        'network-map-background';

    researchNetworkMap.appendChild(
        mapBackground
    );


    /* =====================================================
       SVG OVERLAY
       ===================================================== */

    const svg =
        document.createElementNS(
            SVG_NS,
            'svg'
        );

    svg.setAttribute(
        'viewBox',
        `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`
    );

    svg.setAttribute(
        'preserveAspectRatio',
        'none'
    );

    svg.classList.add(
        'network-map-overlay'
    );

    researchNetworkMap.appendChild(svg);


    /* =====================================================
       COORDINATE CONVERSION

       world-map.svg uses an equirectangular projection.
       ===================================================== */

    function project(lat, lon) {

        return {

            x:
                ((lon + 180) / 360) *
                MAP_WIDTH,

            y:
                ((90 - lat) / 180) *
                MAP_HEIGHT

        };

    }


    const hubPoint =
        project(
            RESEARCH_HUB.lat,
            RESEARCH_HUB.lon
        );


    /* =====================================================
       SVG HELPER
       ===================================================== */

    function makeSvgElement(
        tag,
        attributes = {}
    ) {

        const element =
            document.createElementNS(
                SVG_NS,
                tag
            );

        Object.entries(attributes)
            .forEach(([key, value]) => {

                element.setAttribute(
                    key,
                    value
                );

            });

        return element;

    }


    /* =====================================================
       CONNECTION LAYER
       ===================================================== */

    const connectionLayer =
        makeSvgElement('g');

    connectionLayer.classList.add(
        'network-connections'
    );

    svg.appendChild(
        connectionLayer
    );


    /* =====================================================
       NODE LAYER
       ===================================================== */

    const nodeLayer =
        makeSvgElement('g');

    nodeLayer.classList.add(
        'network-nodes'
    );

    svg.appendChild(
        nodeLayer
    );


    /* =====================================================
       CURVED CONNECTION
       ===================================================== */

    function createConnection(
        node,
        point
    ) {

        const midX =
            (hubPoint.x + point.x) / 2;

        const midY =
            (hubPoint.y + point.y) / 2;


        const distance =
            Math.hypot(
                point.x - hubPoint.x,
                point.y - hubPoint.y
            );


        /*
         * Gentle upward curve.
         * Longer connections receive slightly
         * more curvature.
         */

        const curve =
            Math.min(
                70,
                Math.max(
                    14,
                    distance * .09
                )
            );


        const path =
            makeSvgElement(
                'path',
                {
                    d:
                        `M ${hubPoint.x} ${hubPoint.y} ` +
                        `Q ${midX} ${midY - curve} ` +
                        `${point.x} ${point.y}`
                }
            );


        path.classList.add(
            'network-connection'
        );

        path.dataset.node =
            node.id;


        connectionLayer.appendChild(
            path
        );


        return path;

    }


    /* =====================================================
       TOOLTIP
       ===================================================== */

    function showTooltip(
        event,
        node,
        hub = false
    ) {

        if (!tooltip) {
            return;
        }


        if (hub) {

            tooltip.innerHTML = `
                <strong>
                    ${RESEARCH_HUB.institution}
                </strong>

                <span>
                    ${RESEARCH_HUB.location}
                </span>

                <small>
                    Research hub · Click to explore →
                </small>
            `;

        } else {

            const count =
                node.collaborators.length;


            tooltip.innerHTML = `
                <strong>
                    ${node.institution}
                </strong>

                <span>
                    ${node.location}
                </span>

                <small>
                    ${count}
                    ${count === 1
                        ? 'collaborator'
                        : 'collaborators'}
                    · Click to explore →
                </small>
            `;

        }


        tooltip.hidden = false;

        moveTooltip(event);

    }


    function moveTooltip(event) {

        if (
            !tooltip ||
            tooltip.hidden
        ) {
            return;
        }


        const rect =
            networkMapWrap
                .getBoundingClientRect();


        let x =
            event.clientX -
            rect.left;

        let y =
            event.clientY -
            rect.top;


        /*
         * Keep tooltip inside the map.
         */

        const tooltipWidth =
            tooltip.offsetWidth;

        const tooltipHeight =
            tooltip.offsetHeight;


        if (
            x + tooltipWidth + 30 >
            rect.width
        ) {

            x =
                x -
                tooltipWidth -
                25;

        }


        y =
            Math.max(
                tooltipHeight / 2 + 8,
                Math.min(
                    rect.height -
                    tooltipHeight / 2 -
                    8,
                    y
                )
            );


        tooltip.style.left =
            `${x}px`;

        tooltip.style.top =
            `${y}px`;

    }


    function hideTooltip() {

        if (tooltip) {
            tooltip.hidden = true;
        }

    }


    /* =====================================================
       DETAILS PANEL
       ===================================================== */

    function openPanel(node) {

        const people =
            node.collaborators
                .map(person => {

                    const themes =
                        person.themes
                            .map(theme =>
                                `<span>${theme}</span>`
                            )
                            .join('');


                    return `
                        <article class="network-person">

                            <h4>
                                ${person.name}
                            </h4>

                            <div class="network-themes">
                                ${themes}
                            </div>

                        </article>
                    `;

                })
                .join('');


        const count =
            node.collaborators.length;


        panelContent.innerHTML = `

            <div class="network-panel-inner">

                <p class="network-panel-location">
                    ${node.location}
                </p>

                <h3 class="network-panel-title">
                    ${node.institution}
                </h3>

                <p class="network-panel-count">
                    ${count}
                    ${count === 1
                        ? 'research collaborator'
                        : 'research collaborators'}
                </p>

                ${people}

            </div>
        `;


        networkContainer
            .classList
            .add('panel-open');


        document
            .querySelectorAll(
                '.network-node.active, ' +
                '.network-hub.active'
            )
            .forEach(element => {

                element.classList
                    .remove('active');

            });


        const selected =
            document.querySelector(
                `[data-network-id="${node.id}"]`
            );


        selected?.classList.add(
            'active'
        );

    }


    function closePanel() {

        networkContainer
            .classList
            .remove('panel-open');


        document
            .querySelectorAll(
                '.network-node.active, ' +
                '.network-hub.active'
            )
            .forEach(element => {

                element.classList
                    .remove('active');

            });

    }


    panelClose?.addEventListener(
        'click',
        closePanel
    );


    /* =====================================================
       COLLABORATION NODES
       ===================================================== */

    RESEARCH_NETWORK.forEach(
        (node, index) => {

            const point =
                project(
                    node.lat,
                    node.lon
                );


            const connection =
                createConnection(
                    node,
                    point
                );


            const group =
                makeSvgElement(
                    'g',
                    {
                        tabindex: '0',
                        role: 'button',

                        'aria-label':
                            `${node.institution}, ` +
                            `${node.location}`
                    }
                );


            group.classList.add(
                'network-node'
            );


            group.dataset.networkId =
                node.id;


            /*
             * Stagger pulse timing.
             */

            const halo =
                makeSvgElement(
                    'circle',
                    {
                        cx: point.x,
                        cy: point.y,
                        r: 9
                    }
                );


            halo.classList.add(
                'network-node-halo'
            );


            halo.style.animationDelay =
                `${(index % 7) * .37}s`;


            const core =
                makeSvgElement(
                    'circle',
                    {
                        cx: point.x,
                        cy: point.y,
                        r:
                            node.collaborators
                                .length >= 3
                                ? 5.8
                                : node.collaborators
                                    .length === 2
                                    ? 5.2
                                    : 4.7
                    }
                );


            core.classList.add(
                'network-node-core'
            );


            group.appendChild(
                halo
            );

            group.appendChild(
                core
            );


            nodeLayer.appendChild(
                group
            );


            /* ---------- Hover ---------- */

            group.addEventListener(
                'mouseenter',
                event => {

                    connection.classList
                        .add('visible');


                    showTooltip(
                        event,
                        node
                    );

                }
            );


            group.addEventListener(
                'mousemove',
                moveTooltip
            );


            group.addEventListener(
                'mouseleave',
                () => {

                    connection.classList
                        .remove('visible');

                    hideTooltip();

                }
            );


            /* ---------- Keyboard focus ---------- */

            group.addEventListener(
                'focus',
                () => {

                    connection.classList
                        .add('visible');

                }
            );


            group.addEventListener(
                'blur',
                () => {

                    connection.classList
                        .remove('visible');

                }
            );


            /* ---------- Click ---------- */

            group.addEventListener(
                'click',
                () => {

                    hideTooltip();

                    openPanel(node);

                }
            );


            /* ---------- Enter / Space ---------- */

            group.addEventListener(
                'keydown',
                event => {

                    if (
                        event.key === 'Enter' ||
                        event.key === ' '
                    ) {

                        event.preventDefault();

                        openPanel(node);

                    }

                }
            );

        }
    );


    /* =====================================================
       LINKÖPING HUB
       Draw last so that it stays visually on top.
       ===================================================== */

    const hubGroup =
        makeSvgElement(
            'g',
            {
                tabindex: '0',
                role: 'button',

                'aria-label':
                    'Linköping University, ' +
                    'Linköping, Sweden, research hub'
            }
        );


    hubGroup.classList.add(
        'network-hub'
    );


    hubGroup.dataset.networkId =
        'research-hub';


    const hubHalo =
        makeSvgElement(
            'circle',
            {
                cx: hubPoint.x,
                cy: hubPoint.y,
                r: 12
            }
        );


    hubHalo.classList.add(
        'network-hub-halo'
    );


    const hubCore =
        makeSvgElement(
            'circle',
            {
                cx: hubPoint.x,
                cy: hubPoint.y,
                r: 6.8
            }
        );


    hubCore.classList.add(
        'network-hub-core'
    );


    hubGroup.appendChild(
        hubHalo
    );

    hubGroup.appendChild(
        hubCore
    );


    nodeLayer.appendChild(
        hubGroup
    );


    hubGroup.addEventListener(
        'mouseenter',
        event => {

            showTooltip(
                event,
                RESEARCH_HUB,
                true
            );

        }
    );


    hubGroup.addEventListener(
        'mousemove',
        moveTooltip
    );


    hubGroup.addEventListener(
        'mouseleave',
        hideTooltip
    );


    hubGroup.addEventListener(
        'click',
        () => {

            hideTooltip();


            openPanel({
                id: 'research-hub',

                institution:
                    RESEARCH_HUB.institution,

                location:
                    RESEARCH_HUB.location,

                collaborators:
                    RESEARCH_HUB.collaborators
            });

        }
    );


    hubGroup.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Enter' ||
                event.key === ' '
            ) {

                event.preventDefault();


                openPanel({
                    id: 'research-hub',

                    institution:
                        RESEARCH_HUB.institution,

                    location:
                        RESEARCH_HUB.location,

                    collaborators:
                        RESEARCH_HUB.collaborators
                });

            }

        }
    );


    /* =====================================================
       ESCAPE CLOSES PANEL
       ===================================================== */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                networkContainer
                    .classList
                    .contains('panel-open')
            ) {

                closePanel();

            }

        }
    );


    /* =====================================================
       V2 — SEQUENTIAL RESEARCH NETWORK ANIMATION
       ===================================================== */

    const liveInstitution =
        document.querySelector('#network-live-institution');

    const liveLocation =
        document.querySelector('#network-live-location');

    const liveProgress =
        document.querySelector('#network-live-progress');

    const reducedMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );


    /*
     * Reuse the SVG paths created by the existing renderer.
     * No additional collaborator data is required.
     */

    const tourConnections =
        [...connectionLayer.querySelectorAll(
            '.network-connection'
        )];


    /*
     * A single travelling particle.
     */

    const travelParticle =
        makeSvgElement(
            'circle',
            {
                cx: hubPoint.x,
                cy: hubPoint.y,
                r: 4.2
            }
        );

    travelParticle.classList.add(
        'network-travel-particle'
    );

    travelParticle.style.display = 'none';

    svg.appendChild(travelParticle);


    /* ---------- Animation state ---------- */

    let tourIndex = 0;

    let tourTimer = null;

    let tourFrame = null;

    let tourToken = 0;

    let touring = false;

    let activeTourPath = null;

    let activeTourNode = null;


    const TRAVEL_DURATION = 1550;

    const ARRIVAL_DURATION = 850;

    const BETWEEN_CONNECTIONS = 350;


    /* ---------- Helpers ---------- */

    function clearTourVisuals() {

        tourConnections.forEach(path => {

            path.classList.remove('touring');

            path.style.strokeDasharray = '';

            path.style.strokeDashoffset = '';

        });


        nodeLayer.querySelectorAll(
            '.network-node.arrived'
        ).forEach(node => {

            node.classList.remove('arrived');

        });


        travelParticle.style.display = 'none';

        activeTourPath = null;

        activeTourNode = null;

    }


    function updateLiveStatus(node, index) {

        if (liveInstitution) {

            liveInstitution.textContent =
                node.institution;

        }

        if (liveLocation) {

            liveLocation.textContent =
                node.location;

        }

        if (liveProgress) {

            liveProgress.textContent =
                `${String(index + 1).padStart(2, '0')} / ` +
                `${String(RESEARCH_NETWORK.length).padStart(2, '0')}`;

        }

    }


    /* ---------- Stop automatic animation ---------- */

    function pauseNetworkTour() {

        touring = false;

        /*
         * Invalidates any animation callback that
         * may already have been scheduled.
         */

        tourToken++;


        if (tourTimer !== null) {

            clearTimeout(tourTimer);

            tourTimer = null;

        }


        if (tourFrame !== null) {

            cancelAnimationFrame(tourFrame);

            tourFrame = null;

        }


        clearTourVisuals();

    }


    /* ---------- Animate one connection ---------- */

    function animateTourConnection() {

        if (
            !touring ||
            reducedMotion.matches ||
            networkContainer.classList.contains('panel-open')
        ) {

            pauseNetworkTour();
            return;

        }


        clearTourVisuals();


        const currentIndex =
            tourIndex % RESEARCH_NETWORK.length;


        const node =
            RESEARCH_NETWORK[currentIndex];


        const path =
            tourConnections.find(
                item => item.dataset.node === node.id
            );


        const marker =
            [...nodeLayer.querySelectorAll(
                '.network-node'
            )].find(
                item => item.dataset.networkId === node.id
            );


        tourIndex =
            (tourIndex + 1) % RESEARCH_NETWORK.length;


        if (!path || !marker) {

            tourTimer = setTimeout(
                animateTourConnection,
                250
            );

            return;

        }


        activeTourPath = path;

        activeTourNode = marker;


        updateLiveStatus(
            node,
            currentIndex
        );


        /*
         * Measure the actual curved SVG path.
         */

        const length =
            path.getTotalLength();


        path.style.strokeDasharray =
            `${length} ${length}`;

        path.style.strokeDashoffset =
            `${length}`;


        path.classList.add('touring');


        travelParticle.style.display = '';


        /*
         * The particle starts at the LiU hub.
         */

        const startPoint =
            path.getPointAtLength(0);


        travelParticle.setAttribute(
            'cx',
            startPoint.x
        );

        travelParticle.setAttribute(
            'cy',
            startPoint.y
        );


        const token = tourToken;

        let startTime = null;


        function animateFrame(timestamp) {

            if (
                !touring ||
                token !== tourToken
            ) {

                return;

            }


            if (startTime === null) {

                startTime = timestamp;

            }


            const elapsed =
                timestamp - startTime;


            const progress =
                Math.min(
                    elapsed / TRAVEL_DURATION,
                    1
                );


            /*
             * Smooth ease-in/ease-out.
             */

            const eased =
                progress < .5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(-2 * progress + 2, 2) / 2;


            /*
             * Gradually reveal the connection.
             */

            path.style.strokeDashoffset =
                `${length * (1 - eased)}`;


            /*
             * Move the illuminated particle along
             * the actual SVG curve.
             */

            const point =
                path.getPointAtLength(
                    length * eased
                );


            travelParticle.setAttribute(
                'cx',
                point.x
            );

            travelParticle.setAttribute(
                'cy',
                point.y
            );


            if (progress < 1) {

                tourFrame =
                    requestAnimationFrame(
                        animateFrame
                    );

            } else {

                tourFrame = null;

                travelParticle.style.display =
                    'none';


                /*
                 * Brief destination pulse.
                 */

                marker.classList.add(
                    'arrived'
                );


                tourTimer = setTimeout(
                    () => {

                        if (
                            token !== tourToken ||
                            !touring
                        ) {

                            return;

                        }


                        marker.classList.remove(
                            'arrived'
                        );


                        path.classList.remove(
                            'touring'
                        );


                        tourTimer = setTimeout(
                            animateTourConnection,
                            BETWEEN_CONNECTIONS
                        );

                    },
                    ARRIVAL_DURATION
                );

            }

        }


        tourFrame =
            requestAnimationFrame(
                animateFrame
            );

    }


    /* ---------- Start or resume ---------- */

    function resumeNetworkTour() {

        if (
            touring ||
            reducedMotion.matches ||
            document.hidden ||
            networkContainer.classList.contains('panel-open')
        ) {

            return;

        }


        touring = true;

        tourToken++;


        tourTimer = setTimeout(
            animateTourConnection,
            650
        );

    }


    /* =====================================================
       USER INTERACTION TAKES PRIORITY
       ===================================================== */

    /*
     * Hovering over the map pauses the automatic tour.
     * Existing node hover interactions remain unchanged.
     */

    networkMapWrap.addEventListener(
        'pointerenter',
        pauseNetworkTour
    );


    networkMapWrap.addEventListener(
        'pointerleave',
        resumeNetworkTour
    );


    /*
     * Keyboard navigation also pauses the tour.
     */

    nodeLayer.addEventListener(
        'focusin',
        pauseNetworkTour
    );


    nodeLayer.addEventListener(
        'focusout',
        () => {

            if (!networkContainer.classList.contains('panel-open')) {

                resumeNetworkTour();

            }

        }
    );


    /*
     * Selecting an institution stops automatic playback.
     */

    nodeLayer.addEventListener(
        'click',
        pauseNetworkTour,
        true
    );


    /*
     * Resume after closing the details panel,
     * provided the visitor is not hovering over the map.
     */

    panelClose?.addEventListener(
        'click',
        () => {

            if (
                !networkMapWrap.matches(':hover') ||
                window.matchMedia('(hover: none)').matches
            ) {

                resumeNetworkTour();

            }

        }
    );


    /*
     * Avoid running animations in background tabs.
     */

    document.addEventListener(
        'visibilitychange',
        () => {

            if (document.hidden) {

                pauseNetworkTour();

            } else if (
                !networkMapWrap.matches(':hover')
            ) {

                resumeNetworkTour();

            }

        }
    );


    /*
     * Respect operating-system motion preferences.
     */

    reducedMotion.addEventListener(
        'change',
        () => {

            if (reducedMotion.matches) {

                pauseNetworkTour();

            } else {

                resumeNetworkTour();

            }

        }
    );


    /* ---------- Initial playback ---------- */

    if (!reducedMotion.matches) {

        resumeNetworkTour();

    }

}