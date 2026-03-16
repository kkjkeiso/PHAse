// ============================================================
// nav.js — Navegação global do PHAse
// Injeta a sidebar e a top bar em todas as páginas.
//
// Detecção de profundidade:
//   html/          → depth <= 4 → base = './'
//   html/phases/   → depth >= 5 → base = '../'
//
// Autenticação:
//   Lê 'usuarioLogado' do localStorage.
//   Quando o back-end estiver pronto, substituir por validação de token JWT.
// ============================================================

// ── Detecção de profundidade para caminhos relativos ─────────
const depth      = window.location.pathname.split('/').filter(Boolean).length;
const base       = depth <= 5 ? './' : '../';
const phasesBase = depth <= 5 ? './phases/' : './';

// ── Injeção da sidebar e top bar ─────────────────────────────
document.body.insertAdjacentHTML('afterbegin', `

  <aside id="sidebar">
    <nav id="nav-icons">

      <!-- Navegação principal -->
      <a href="${base}index.html"      class="nav-item" data-label="Home">
        <i class="fa-solid fa-house"></i>
      </a>
      <a href="${base}scoreboard.html" class="nav-item" data-label="Scoreboard">
        <i class="fa-solid fa-ranking-star"></i>
      </a>
      <a href="${base}phases.html"     class="nav-item" data-label="PHAses">
        <i class="fa-solid fa-layer-group"></i>
      </a>

      <!-- Submenu de matérias — expandido ao clicar -->
      <a href="#" class="nav-item nav-phases nav-expandable" data-label="Matérias">
        <i class="fa-solid fa-book-open"></i>
      </a>
      <div class="nav-submenu" id="phases-submenu">
        <a href="${phasesBase}phase1.html?s=portugues"  class="nav-subitem" data-label="Português">
          <i class="fa-solid fa-book"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=redacao"    class="nav-subitem" data-label="Redação">
          <i class="fa-solid fa-pen-nib"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=matematica" class="nav-subitem" data-label="Matemática">
          <i class="fa-solid fa-square-root-variable"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=biologia"   class="nav-subitem" data-label="Biologia">
          <i class="fa-solid fa-leaf"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=quimica"    class="nav-subitem" data-label="Química">
          <i class="fa-solid fa-flask"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=fisica"     class="nav-subitem" data-label="Física">
          <i class="fa-solid fa-atom"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=historia"   class="nav-subitem" data-label="História">
          <i class="fa-solid fa-landmark"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=geografia"  class="nav-subitem" data-label="Geografia">
          <i class="fa-solid fa-earth-americas"></i>
        </a>
        <a href="${phasesBase}phase1.html?s=ingles"     class="nav-subitem" data-label="Inglês">
          <i class="fa-solid fa-language"></i>
        </a>
      </div>

      <!-- Perfil — visível apenas quando logado -->
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

// ── Autenticação na top bar ───────────────────────────────────
const usuarioLogado = localStorage.getItem('usuarioLogado');
const topActions    = document.getElementById('top-actions');
const profileItem   = document.querySelector('.nav-profile');

if (usuarioLogado) {
  // Usuário logado: exibe saudação e botão de logout
  topActions.innerHTML = `
    <span class="topbar-greeting">Olá, ${usuarioLogado}</span>
    <button class="btn btn-logout" id="logout-btn">Sair</button>
  `;
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
    window.location.href = `${base}index.html`;
  });
  profileItem.style.display = 'flex';
} else {
  // Usuário não logado: exibe botões de login e cadastro
  topActions.innerHTML = `
    <a href="${base}login.html"    class="btn btn-login">Login</a>
    <a href="${base}register.html" class="btn btn-register">Cadastrar-se</a>
  `;
  profileItem.style.display = 'none';
}

// ── Submenu de matérias ───────────────────────────────────────
const expandable = document.querySelector('.nav-expandable');
const submenu    = document.getElementById('phases-submenu');
const sidebar    = document.getElementById('sidebar');

expandable.addEventListener('click', e => {
  e.preventDefault();
  submenu.classList.toggle('open');
  sidebar.classList.toggle('expanded');
});