// Detecta o nível da página para ajustar os caminhos
const depth = window.location.pathname.split('/').filter(Boolean).length;
const base = depth <= 4 ? './' : '../';
const phasesBase = depth <= 4 ? './phases/' : './';

document.body.insertAdjacentHTML('afterbegin', `
  <aside id="sidebar">
    <nav id="nav-icons">
      <a href="${base}index.html" class="nav-item" data-label="Home">
        <i class="fa-solid fa-house"></i>
      </a>
      <a href="${base}scoreboard.html" class="nav-item" data-label="Scoreboard">
        <i class="fa-solid fa-ranking-star"></i>
      </a>
      <a href="#" class="nav-item nav-phases nav-expandable" data-label="PHAses">
        <i class="fa-solid fa-book-open"></i>
      </a>
      <div class="nav-submenu" id="phases-submenu">
        <a href="${phasesBase}portuguese.html" class="nav-subitem" data-label="Português">
          <i class="fa-solid fa-book"></i>
        </a>
        <a href="${phasesBase}essay.html" class="nav-subitem" data-label="Redação">
          <i class="fa-solid fa-pen-nib"></i>
        </a>
        <a href="${phasesBase}math.html" class="nav-subitem" data-label="Matemática">
          <i class="fa-solid fa-square-root-variable"></i>
        </a>
        <a href="${phasesBase}biology.html" class="nav-subitem" data-label="Biologia">
          <i class="fa-solid fa-leaf"></i>
        </a>
        <a href="${phasesBase}chemistry.html" class="nav-subitem" data-label="Química">
          <i class="fa-solid fa-flask"></i>
        </a>
        <a href="${phasesBase}physics.html" class="nav-subitem" data-label="Física">
          <i class="fa-solid fa-atom"></i>
        </a>
        <a href="${phasesBase}history.html" class="nav-subitem" data-label="História">
          <i class="fa-solid fa-landmark"></i>
        </a>
        <a href="${phasesBase}geography.html" class="nav-subitem" data-label="Geografia">
          <i class="fa-solid fa-earth-americas"></i>
        </a>
        <a href="${phasesBase}english.html" class="nav-subitem" data-label="Inglês">
          <i class="fa-solid fa-language"></i>
        </a>
        
      </div>
      <a href="${base}login.html" class="nav-item nav-profile" data-label="Perfil">
        <i class="fa-solid fa-user"></i>
      </a>
    </nav>
    <div class="sidebar-version">v1.0</div>
  </aside>

  <div class="top-bar">
    <a href="${base}index.html" class="logo">PH<span>A</span>se</a>
    <div class="top-bar-actions" id="top-actions"></div>
  </div>
`);

// Auth no top bar
const usuarioLogado = localStorage.getItem('usuarioLogado');
const topActions = document.getElementById('top-actions');
const profileItem = document.querySelector('.nav-profile');

if (usuarioLogado) {
  topActions.innerHTML = `
    <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Olá, ${usuarioLogado}</span>
    <button class="btn btn-logout" id="logout-btn">Sair</button>
  `;
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
    window.location.href = `${base}index.html`;
  });
  profileItem.style.display = 'flex';
} else {
  topActions.innerHTML = `
    <a href="${base}login.html" class="btn btn-login">Login</a>
    <a href="${base}register.html" class="btn btn-register">Cadastrar-se</a>
  `;
  profileItem.style.display = 'none';
}

const expandable = document.querySelector('.nav-expandable');
const submenu = document.getElementById('phases-submenu');
const sidebar = document.getElementById('sidebar');

expandable.addEventListener('click', e => {
  e.preventDefault();
  submenu.classList.toggle('open');
  sidebar.classList.toggle('expanded');
}); 