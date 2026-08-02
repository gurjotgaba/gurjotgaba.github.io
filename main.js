
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  toggle.addEventListener('click', () => {
    const open = dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => {
      d.classList.remove('open');
      d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
  }
});

document.querySelectorAll('.filter-bar').forEach(bar => {
  const parentSection = bar.closest('section') || document;
  const targets = parentSection.querySelectorAll('.filter-targets [data-category]');
  bar.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      bar.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      targets.forEach(item => {
        const categories = (item.dataset.category || '').split(' ');
        item.hidden = filter !== 'all' && !categories.includes(filter);
      });
    });
  });
});

const search = document.querySelector('#publication-search');
const type = document.querySelector('#publication-type');
const publicationItems = [...document.querySelectorAll('#publication-cards article')];
function filterPublications() {
  if (!publicationItems.length) return;
  const q = (search?.value || '').toLowerCase();
  const selectedType = type?.value || 'all';
  publicationItems.forEach(item => {
    const textMatch = item.textContent.toLowerCase().includes(q);
    const typeMatch = selectedType === 'all' || item.dataset.type === selectedType;
    item.hidden = !(textMatch && typeMatch);
  });
}
search?.addEventListener('input', filterPublications);
type?.addEventListener('change', filterPublications);

document.querySelectorAll('.map-grid button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.map-grid button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const detail = document.querySelector('#map-detail');
    if (detail) detail.textContent = `${button.dataset.location}: ${button.querySelector('small').textContent}`;
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 500);
});
backToTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.primary-nav a, .dropdown-menu a').forEach(link => {
  if (link.getAttribute('href') === current) link.classList.add('active-page');
});
