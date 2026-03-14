document.body.insertAdjacentHTML('afterbegin', `
  <aside id="sidebar">
    <nav id="nav-icons">
      <a href="./index.html" class="nav-item" data-label="Home">
        <i class="fa-solid fa-house"></i>
      </a>
      <a href="./phase1.html" class="nav-item nav-phases" data-label="PHAses">
        <i class="fa-solid fa-book-open"></i>
      </a>
      <a href="./scoreboard.html" class="nav-item" data-label="Scoreboard">
        <i class="fa-solid fa-ranking-star"></i>
      </a>
      <a href="./login.html" class="nav-item nav-profile" data-label="Perfil">
        <i class="fa-solid fa-user"></i>
      </a>
      <a href="#" class="nav-item" data-label="Mais">
        <i class="fa-solid fa-ellipsis"></i>
      </a>
    </nav>
  </aside>
`);

// Controle de estado de login
const usuarioLogado = localStorage.getItem('usuarioLogado');

const profileItem = document.querySelector('.nav-profile');
const phasesItem  = document.querySelector('.nav-phases');

if (usuarioLogado) {
  profileItem.style.display = 'flex';
  phasesItem.classList.remove('nav-disabled');
} else {
  profileItem.style.display = 'none';
  phasesItem.classList.add('nav-disabled');
}