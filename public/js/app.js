const WHATSAPP_NUMBER = "5513991073671";
const WHATSAPP_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.86.5 3.6 1.38 5.1L2 22l5.05-1.36A9.94 9.94 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm0 18.1c-1.6 0-3.1-.44-4.38-1.2l-.31-.18-3 .8.8-2.93-.2-.32a8.06 8.06 0 0 1-1.23-4.27c0-4.47 3.65-8.1 8.14-8.1 4.48 0 8.13 3.63 8.13 8.1 0 4.48-3.65 8.1-8.13 8.1Zm4.47-6.08c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.4-1.33-1.64-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z"/></svg>';
const A11Y_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="5" r="1.8" fill="currentColor" stroke="none"/><path d="M4 8.5c2.5 1 5.3 1.5 8 1.5s5.5-.5 8-1.5"/><path d="M12 10v4l-3 7"/><path d="M12 14l3 7"/><path d="M9 12l-2.5 2"/><path d="M15 12l2.5 2"/></svg>';

function siteHeader() {
  const slot = document.querySelector("[data-site-header]");
  if (!slot) return;

  const path = window.location.pathname.split("/").pop() || "index.html";
  const navLink = (href, label) =>
    `<a href="${href}"${path === href ? ' class="active"' : ""}>${label}</a>`;

  const navLinksHtml =
    navLink("index.html", "Home") +
    navLink("cardapio_.html", "Cardápio") +
    navLink("sobre_nos_.html", "Sobre nós") +
    navLink("carrinho_.html", "Carrinho");

  const isAdminLogged = sessionStorage.getItem("bejiroo-admin-auth") === "true";
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("bejiroo_current_user") || "null");
  } catch {
    currentUser = null;
  }
  const accountLink = isAdminLogged
    ? '<div class="public-account"><button class="button button-dark" type="button" data-public-account>Administrador⌄</button><div class="public-account-menu" data-public-account-menu hidden><a href="admin/dashboard_.html">Painel administrativo</a><button type="button" data-public-logout>Sair</button></div></div>'
    : currentUser
      ? `<div class="public-account"><button class="button button-dark" type="button" data-public-account>${currentUser.name}⌄</button><div class="public-account-menu" data-public-account-menu hidden><span class="public-account-email">${currentUser.email}</span><button type="button" data-public-user-logout>Sair</button></div></div>`
      : '<a class="button button-dark" href="login_.html">Login</a>';

  slot.innerHTML = `
    <header class="site-header">
      <div class="container">
        <a class="brand" href="index.html">
          <span class="brand-mark"><img src="../public/imgs/logo.svg" alt="Logo Bejiróó"></span>
          <span class="brand-name">BEJIRÓÓ</span>
        </a>
        <nav class="site-nav">${navLinksHtml}</nav>
        <div class="spacer"></div>
        <a class="whatsapp-pill" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">${WHATSAPP_ICON}<span>Entre em Contato</span></a>
        ${accountLink}
        <button class="mobile-menu" type="button" aria-label="Abrir menu" aria-expanded="false" data-mobile-menu-toggle>☰</button>
      </div>
      <nav class="mobile-nav-drawer" data-mobile-drawer>
        ${navLinksHtml}
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">Entre em Contato</a>
        <a href="login_.html">Login</a>
      </nav>
    </header>
    <div class="accessibility-widget" data-accessibility-widget>
      <button class="a11y-toggle" type="button" aria-label="Abrir painel de acessibilidade" aria-expanded="false" data-a11y-toggle>${A11Y_ICON}</button>
      <section class="accessibility-panel" data-a11y-panel hidden aria-label="Opções de acessibilidade">
        <div class="accessibility-header"><h2>Acessibilidade</h2><button type="button" data-a11y-close aria-label="Fechar painel">&times;</button></div>
        <div class="accessibility-option"><span>Tamanho do texto</span><div class="accessibility-actions"><button type="button" data-font-action="decrease" aria-label="Diminuir texto">A-</button><button type="button" data-font-action="reset" aria-label="Texto normal">A</button><button type="button" data-font-action="increase" aria-label="Aumentar texto">A+</button></div></div>
        <div class="accessibility-option"><span>Tema</span><select data-theme-selector aria-label="Selecionar tema"><option value="light">Claro</option><option value="dark">Escuro</option><option value="high-contrast">Alto contraste</option></select></div>
        <div class="accessibility-option"><span>Leitor de tela</span><div class="accessibility-actions"><button type="button" data-reader-start>▶ Ler página</button><button type="button" data-reader-stop hidden>■ Parar</button></div></div>
        <div class="accessibility-option"><span>Libras</span><button class="accessibility-wide-action" type="button" data-libras-toggle>Ativar tradução</button></div>
      </section>
      <section class="libras-panel" data-libras-panel hidden><div class="accessibility-header"><h2>Tradutor de Libras</h2><button type="button" data-libras-close aria-label="Fechar tradutor">&times;</button></div><p>Selecione um texto da página para exibi-lo aqui.</p><div data-libras-output>O texto selecionado aparecerá nesta área.</div></section>
    </div>
  `;
}

function wireHeaderInteractions() {
  const menuButton = document.querySelector("[data-mobile-menu-toggle]");
  const drawer = document.querySelector("[data-mobile-drawer]");
  if (menuButton && drawer) {
    menuButton.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  initAccessibility();

  const accountButton = document.querySelector("[data-public-account]");
  const accountMenu = document.querySelector("[data-public-account-menu]");
  accountButton?.addEventListener("click", () => {
    accountMenu.hidden = !accountMenu.hidden;
  });
  document.querySelector("[data-public-logout]")?.addEventListener("click", () => {
    sessionStorage.removeItem("bejiroo-admin-auth");
    window.location.reload();
  });
  document.querySelector("[data-public-user-logout]")?.addEventListener("click", () => {
    localStorage.removeItem("bejiroo_current_user");
    window.location.reload();
  });
}

function initAccessibility() {
  const widget = document.querySelector("[data-accessibility-widget]");
  if (!widget) return;
  const panel = widget.querySelector("[data-a11y-panel]");
  const toggle = widget.querySelector("[data-a11y-toggle]");
  const themeSelector = widget.querySelector("[data-theme-selector]");
  let reading = false;
  let utterance = null;

  const savedFont = localStorage.getItem("bejiroo_font_size") || "normal";
  const savedTheme = localStorage.getItem("bejiroo_theme") || "light";
  document.body.classList.add(`font-${savedFont}`);
  document.body.classList.add(`theme-${savedTheme}`);
  themeSelector.value = savedTheme;

  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
  });
  widget.querySelector("[data-a11y-close]").addEventListener("click", () => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  });

  widget.querySelectorAll("[data-font-action]").forEach((button) => button.addEventListener("click", () => {
    const sizes = ["small", "normal", "large", "xlarge"];
    const current = sizes.findIndex((size) => document.body.classList.contains(`font-${size}`));
    const action = button.dataset.fontAction;
    const next = action === "reset" ? 1 : Math.max(0, Math.min(3, current + (action === "increase" ? 1 : -1)));
    sizes.forEach((size) => document.body.classList.remove(`font-${size}`));
    document.body.classList.add(`font-${sizes[next]}`);
    localStorage.setItem("bejiroo_font_size", sizes[next]);
  }));

  themeSelector.addEventListener("change", () => {
    document.body.classList.remove("theme-light", "theme-dark", "theme-high-contrast");
    document.body.classList.add(`theme-${themeSelector.value}`);
    localStorage.setItem("bejiroo_theme", themeSelector.value);
  });

  const startReader = () => {
    if (!("speechSynthesis" in window) || reading) return;
    const text = document.querySelector("main")?.innerText.trim();
    if (!text) return;
    utterance = new SpeechSynthesisUtterance(text.slice(0, 2500));
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.onend = stopReader;
    window.speechSynthesis.speak(utterance);
    reading = true;
    widget.querySelector("[data-reader-start]").hidden = true;
    widget.querySelector("[data-reader-stop]").hidden = false;
    toggle.classList.add("reading-active");
  };
  const stopReader = () => {
    window.speechSynthesis?.cancel();
    reading = false;
    widget.querySelector("[data-reader-start]").hidden = false;
    widget.querySelector("[data-reader-stop]").hidden = true;
    toggle.classList.remove("reading-active");
  };
  widget.querySelector("[data-reader-start]").addEventListener("click", startReader);
  widget.querySelector("[data-reader-stop]").addEventListener("click", stopReader);

  const librasPanel = widget.querySelector("[data-libras-panel]");
  widget.querySelector("[data-libras-toggle]").addEventListener("click", () => { librasPanel.hidden = !librasPanel.hidden; });
  widget.querySelector("[data-libras-close]").addEventListener("click", () => { librasPanel.hidden = true; });
  document.addEventListener("mouseup", () => {
    const selected = window.getSelection().toString().trim();
    if (selected && !librasPanel.hidden) widget.querySelector("[data-libras-output]").textContent = selected;
  });
}

function wireInteractions() {
  document.querySelectorAll(".choice button").forEach((button) =>
    button.addEventListener("click", () => {
      button.parentElement
        .querySelectorAll("button")
        .forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    }),
  );
  document.querySelectorAll("[data-demo-action]").forEach((button) =>
    button.addEventListener("click", () => {
      button.textContent = "Salvo com sucesso";
      button.classList.add("button-success");
    }),
  );
}

siteHeader();
wireHeaderInteractions();
wireInteractions();
