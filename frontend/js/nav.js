// ============================================================
// nav.js — Navegação global do PHAse
// Gerado a partir de: ts/nav.ts
//
// Responsável por:
//   - Injetar sidebar e top bar em todas as páginas
//   - Detectar estado de autenticação (localStorage)
//   - Renderizar botões de login/logout
//   - Gerenciar submenu de matérias
//   - Marcar página ativa
//   - Páginas de auth recebem top bar mínima (sem sidebar)
// ============================================================

(function () {
  // ── Calcula profundidade relativa para montar paths ────────
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const depth     = pathParts.length;

  // Lógica de base:
  // Páginas em html/ (depth ≈ 2+) precisam de '../' para css/js
  // Páginas em html/phases/ (depth ≈ 3+) precisam de '../../' etc.
  // Como os arquivos HTML ficam em /frontend/html/ ou /frontend/html/phases/
  // e os assets ficam em /frontend/, usamos caminhos relativos.
  const isInPhases = window.location.pathname.includes('/phases/');
  const base       = isInPhases ? '../../html/' : '../html/';
  const assetBase  = isInPhases ? '../../'      : '../';

  // Função helper para construir URLs de navegação
  function url(page) {
    return base + page;
  }

  // URL para páginas dentro de phases/
  function phaseUrl(file, param) {
    if (isInPhases) {
      return file + (param ? '?s=' + param : '');
    }
    return 'phases/' + file + (param ? '?s=' + param : '');
  }

  // ── Detecta páginas de auth (sem sidebar completa) ─────────
  const authPages   = ['login.html', 'register.html'];
  const currentFile = window.location.pathname.split('/').pop() || '';
  const isAuthPage  = authPages.some(p => currentFile === p);
  const usuario     = localStorage.getItem('usuarioLogado');

  // ── AUTH PAGES: só top bar mínima ─────────────────────────
  if (isAuthPage && !usuario) {
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="top-bar top-bar--auth">
        <a href="${url('welcome.html')}" class="logo">
          <span class="logo-text">PH<span>A</span>se</span>
        </a>
        <a href="${url('welcome.html')}" class="btn btn-login">
          <i class="fa-solid fa-arrow-left"></i> Voltar
        </a>
      </div>
    `);
    document.body.classList.add('no-sidebar');
    return; // Para aqui — não injeta sidebar
  }

  // ── TODAS AS OUTRAS PÁGINAS: sidebar + top bar completa ────
  document.body.insertAdjacentHTML('afterbegin', `
    <aside id="sidebar">
      <nav id="nav-icons">

        <a href="${url('index.html')}" class="nav-item" data-label="Home">
          <i class="fa-solid fa-house"></i>
        </a>

        <a href="${url('scoreboard.html')}" class="nav-item" data-label="Scoreboard">
          <i class="fa-solid fa-ranking-star"></i>
        </a>

        <a href="${url('phases.html')}" class="nav-item" data-label="PHAses">
          <i class="fa-solid fa-layer-group"></i>
        </a>

        <!-- Submenu de matérias rápidas -->
        <a href="#" class="nav-item nav-phases nav-expandable" data-label="Matérias">
          <i class="fa-solid fa-book-open"></i>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>
        <div class="nav-submenu" id="phases-submenu">
          <a href="${phaseUrl('phase1.html','portugues')}"  class="nav-subitem" data-label="Português"><i class="fa-solid fa-book"></i></a>
          <a href="${phaseUrl('phase1.html','redacao')}"    class="nav-subitem" data-label="Redação"><i class="fa-solid fa-pen-nib"></i></a>
          <a href="${phaseUrl('phase1.html','matematica')}" class="nav-subitem" data-label="Matemática"><i class="fa-solid fa-square-root-variable"></i></a>
          <a href="${phaseUrl('phase1.html','biologia')}"   class="nav-subitem" data-label="Biologia"><i class="fa-solid fa-leaf"></i></a>
          <a href="${phaseUrl('phase1.html','quimica')}"    class="nav-subitem" data-label="Química"><i class="fa-solid fa-flask"></i></a>
          <a href="${phaseUrl('phase1.html','fisica')}"     class="nav-subitem" data-label="Física"><i class="fa-solid fa-atom"></i></a>
          <a href="${phaseUrl('phase1.html','historia')}"   class="nav-subitem" data-label="História"><i class="fa-solid fa-landmark"></i></a>
          <a href="${phaseUrl('phase1.html','geografia')}"  class="nav-subitem" data-label="Geografia"><i class="fa-solid fa-earth-americas"></i></a>
          <a href="${phaseUrl('phase1.html','ingles')}"     class="nav-subitem" data-label="Inglês"><i class="fa-solid fa-language"></i></a>
        </div>

        <!-- Perfil (só visível se logado) -->
        <a href="${url('account.html')}" class="nav-item nav-profile" data-label="Perfil" style="display:none;">
          <i class="fa-solid fa-user"></i>
        </a>

      </nav>
      <div class="sidebar-version">v1.0</div>
    </aside>

    <div class="top-bar">
      <a href="${url('index.html')}" class="logo">
        <span class="logo-text">PH<span>A</span>se</span>
      </a>
      <div class="top-bar-actions" id="top-actions"></div>
    </div>
  `);

  // ── Renderiza estado logado/deslogado na top bar ───────────
  function renderLoggedIn(username) {
    const topActions  = document.getElementById('top-actions');
    const profileItem = document.querySelector('.nav-profile');
    if (!topActions) return;

    topActions.innerHTML = `
      <span class="topbar-greeting">Olá, <strong>${username}</strong></span>
      <button class="btn-logout" id="logout-btn">Sair</button>
    `;

    document.getElementById('logout-btn').addEventListener('click', function () {
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('token');
      window.location.href = url('welcome.html');
    });

    if (profileItem) profileItem.style.display = 'flex';
  }

  function renderLoggedOut() {
    const topActions  = document.getElementById('top-actions');
    const profileItem = document.querySelector('.nav-profile');
    if (!topActions) return;

    topActions.innerHTML = `
      <a href="${url('login.html')}"    class="btn btn-login">Login</a>
      <a href="${url('register.html')}" class="btn btn-register">Cadastrar-se</a>
    `;

    if (profileItem) profileItem.style.display = 'none';
  }

  if (usuario) renderLoggedIn(usuario);
  else         renderLoggedOut();

  // ── Submenu de matérias ────────────────────────────────────
  const expandable = document.querySelector('.nav-expandable');
  const submenu    = document.getElementById('phases-submenu');
  const sidebar    = document.getElementById('sidebar');

  if (expandable && submenu) {
    expandable.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = submenu.classList.contains('open');
      submenu.classList.toggle('open', !isOpen);
      expandable.classList.toggle('open', !isOpen);
      sidebar && sidebar.classList.toggle('expanded', !isOpen);
    });
  }

  // ── Marca item ativo ───────────────────────────────────────
  document.querySelectorAll('.nav-item').forEach(function (item) {
    const href = item.getAttribute('href') || '';
    if (href !== '#' && currentFile !== '' && href.includes(currentFile)) {
      item.classList.add('active');
    }
  });

})();
