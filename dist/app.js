document.documentElement.classList.add('js-ready');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); mobileNav.hidden = true; }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);

const projects = [
  {name:'Oliva', text:'Una identidad para una marca de objetos que cree en habitar con intención. Construimos un universo sereno: formas orgánicas, tonos oliva y una tipografía que invita a bajar un cambio. El sistema se extiende de la identidad al packaging, con una misma idea: menos cosas, más sentido.', tags:'ESTRATEGIA DE MARCA / IDENTIDAD VISUAL / PACKAGING · 2026'},
  {name:'Entre', text:'Una revista cultural que encuentra historias en los espacios intermedios. Diseñamos un sistema editorial que combina una grilla precisa con gestos expresivos. Ritmos, pausas y contrastes para descubrir otra forma de mirar.', tags:'DISEÑO EDITORIAL / DIRECCIÓN DE ARTE · 2025'},
  {name:'Savia', text:'Volver a lo simple, una taza a la vez. Para esta marca conceptual de té botánico, creamos una identidad cálida y un sistema de envases que celebra el origen de cada ingrediente. Una invitación a hacer una pausa.', tags:'ESTRATEGIA / IDENTIDAD VISUAL / PACKAGING · 2025'},
  {name:'Forma', text:'Un encuentro posible entre el arte, el diseño y las ideas. Creamos una identidad cultural que convierte la tipografía en imagen y las formas en preguntas. Un sistema abierto, con carácter y espacio para lo inesperado.', tags:'IDENTIDAD CULTURAL / DIRECCIÓN DE ARTE · 2024'}
];
const projectDialog = document.querySelector('#project-dialog');
const contactDialog = document.querySelector('#contact-dialog');
projectDialog.setAttribute('aria-labelledby', 'project-dialog-title');
projectDialog.querySelector('h2').id = 'project-dialog-title';
contactDialog.setAttribute('aria-labelledby', 'contact-dialog-title');
contactDialog.querySelector('h2').id = 'contact-dialog-title';
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[Number(button.dataset.project)];
  const art = button.querySelector('.project-image').cloneNode(true);
  art.querySelector('.view-project')?.remove();
  art.setAttribute('aria-hidden', 'true');
  projectDialog.querySelector('.dialog-art').replaceChildren(art);
  projectDialog.querySelector('h2').textContent = project.name;
  projectDialog.querySelector('.dialog-copy > p').textContent = project.text;
  projectDialog.querySelector('.dialog-tags').textContent = project.tags;
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}));
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  projectDialog.close();
  contactDialog.showModal();
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
});
document.querySelector('#contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const idea = form.elements.idea.value.trim();
  if (!name || !email || !idea) { form.querySelector('.form-status').textContent = 'Completá tu nombre, tu email y contanos tu idea.'; return; }
  const blob = new Blob([`CONSULTA PARA MARGEN\n\nNombre: ${name}\nEmail: ${email}\n\nProyecto:\n${idea}\n`], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'mi-proyecto-margen.txt'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  form.querySelector('.form-status').textContent = 'Tu consulta está lista para descargar. No se envió ningún mensaje.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
