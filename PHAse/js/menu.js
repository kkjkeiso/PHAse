const toggle=document.getElementById('menu-toggle');
const nav=document.getElementById('nav');
const overlay=document.querySelector('.overlay');
let menuOpen=false;

toggle.addEventListener('click', e=>{
  e.stopPropagation();
  menuOpen=!menuOpen;
  nav.classList.toggle('nav-visible',menuOpen);
  toggle.classList.toggle('active',menuOpen);
  overlay.classList.toggle('active',menuOpen);
});

document.addEventListener('click', e=>{
  if(menuOpen && !nav.contains(e.target) && !toggle.contains(e.target)){
    menuOpen=false;
    nav.classList.remove('nav-visible');
    toggle.classList.remove('active');
    overlay.classList.remove('active');
  }
});

overlay.addEventListener('click',()=>{
  menuOpen=false;
  nav.classList.remove('nav-visible');
  toggle.classList.remove('active');
  overlay.classList.remove('active');
});
