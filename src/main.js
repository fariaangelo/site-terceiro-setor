// Gerenciamento do Roteador SPA e Estado do Tema
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRouter();
});

// Alternador de Alto Contraste com Persistência
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const announcer = document.getElementById('aria-announcer');

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark-theme');
    toggleBtn.setAttribute('aria-pressed', 'true');
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark-theme');
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (announcer) {
      announcer.textContent = isDark ? 'Modo de alto contraste ativado.' : 'Modo padrão ativado.';
    }
  });
}

// Roteamento SPA e Gerenciamento de Foco para Leitores de Tela
function initRouter() {
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}

function renderRoute() {
  const appContainer = document.getElementById('app');
  const mainContent = document.getElementById('main-content');
  const hash = window.location.hash || '#/inicio';

  if (hash === '#/inicio') {
    appContainer.innerHTML = getInicioTemplate();
  } else if (hash === '#/projetos') {
    appContainer.innerHTML = getProjetosTemplate();
  } else if (hash === '#/cadastro') {
    appContainer.innerHTML = getCadastroTemplate();
    bindFormEvents();
  } else {
    appContainer.innerHTML = '<h2>Página não encontrada</h2>';
  }

  // Direciona o foco do leitor de tela para o contêiner principal ao mudar de rota
  if (mainContent) {
    mainContent.focus();
  }
}

// Templates HTML Semânticos
function getInicioTemplate() {
  return `
    <section class="hero-section">
      <h2 class="hero-title">Apoie Causas Transformativas do Terceiro Setor</h2>
      <p>Conectamos doadores, voluntários e organizações sem fins lucrativos com transparência e acessibilidade.</p>
    </section>
  `;
}

function getProjetosTemplate() {
  return `
    <section>
      <h2>Projetos Sociais Ativos</h2>
      <div class="grid-cards">
        <article class="card">
          <picture>
            <source srcset="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&format=webp" type="image/webp" />
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600" alt="Crianças sorrindo em uma sala de aula comunitária" width="600" height="400" loading="lazy" />
          </picture>
          <h3>Educação para Todos</h3>
          <p>Fornecimento de reforço escolar e inclusão digital para jovens em situação de vulnerabilidade.</p>
        </article>
      </div>
    </section>
  `;
}

function getCadastroTemplate() {
  return `
    <section>
      <h2>Cadastrar Nova Organização</h2>
      <form id="form-ong" aria-label="Formulário de Cadastro de ONG" novalidate>
        <div class="form-group">
          <label for="nome-ong">Nome da Organização (obrigatório):</label>
          <input type="text" id="nome-ong" name="nome" required aria-required="true" />
        </div>
        <div class="form-group">
          <label for="email-ong">E-mail de Contacto (obrigatório):</label>
          <input type="email" id="email-ong" name="email" required aria-required="true" />
        </div>
        <button type="submit" class="btn-submit">Submeter Cadastro</button>
      </form>
    </section>
  `;
}

function bindFormEvents() {
  const form = document.getElementById('form-ong');
  const announcer = document.getElementById('aria-announcer');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      announcer.textContent = 'Formulário submetido com sucesso! A sua organização foi registrada.';
      alert('Cadastro realizado com sucesso!');
      form.reset();
    } else {
      announcer.textContent = 'O formulário contém erros. Por favor, verifique os campos obrigatórios.';
    }
  });
}