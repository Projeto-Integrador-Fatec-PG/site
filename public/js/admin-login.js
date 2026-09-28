let savedAdmin = null;
try {
  savedAdmin = JSON.parse(localStorage.getItem("bejiroo_admin_user") || "null");
} catch {
  savedAdmin = null;
}

const ADMIN_CREDENTIALS = [
  { email: "admin@admin", password: "admin" },
  { email: "admin@bejiroo.com", password: "admin123" },
  ...(savedAdmin ? [savedAdmin] : []),
];

function wireAdminPasswordToggle() {
  document.querySelectorAll("[data-toggle-password]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = document.getElementById(toggle.dataset.togglePassword);
      if (!input) return;
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      toggle.textContent = showing ? "👁" : "🙈";
      toggle.setAttribute("aria-label", showing ? "Mostrar senha" : "Ocultar senha");
    });
  });
}

function initAdminLogin() {
  wireAdminPasswordToggle();
  const form = document.querySelector("[data-admin-login]");
  const error = document.querySelector(".login-error");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector("#admin-email").value.trim();
    const password = form.querySelector("#admin-password").value;

    const isValidAdmin = ADMIN_CREDENTIALS.some(
      (credential) => credential.email === email && credential.password === password,
    );

    if (!isValidAdmin) {
      error.textContent = "E-mail ou senha inválidos.";
      return;
    }

    sessionStorage.setItem("bejiroo-admin-auth", "true");
    window.location.href = "dashboard_.html";
  });
}

initAdminLogin();
