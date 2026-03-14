// Injeta sidebar
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

  <div class="top-bar">
    <a href="./index.html" class="logo">PH<span>A</span>se</a>
    <div class="top-bar-actions" id="top-actions"></div>
  </div>
`);

// Auth no top bar
const usuarioLogado = localStorage.getItem('usuarioLogado');
const topActions = document.getElementById('top-actions');
const phasesItem = document.querySelector('.nav-phases');
const profileItem = document.querySelector('.nav-profile');

if (usuarioLogado) {
  topActions.innerHTML = `
    <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Olá, ${usuarioLogado}</span>
    <button class="btn btn-logout" id="logout-btn">Sair</button>
  `;
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
    window.location.href = './index.html';
  });
  phasesItem.classList.remove('nav-disabled');
  profileItem.style.display = 'flex';
} else {
  topActions.innerHTML = `
    <a href="./login.html" class="btn btn-login">Login</a>
    <a href="./register.html" class="btn btn-register">Cadastrar-se</a>
  `;
  phasesItem.classList.add('nav-disabled');
  profileItem.style.display = 'none';
}