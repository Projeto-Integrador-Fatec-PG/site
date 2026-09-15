const ADMIN_EMAIL = "admin@bejiroo.com";
const ADMIN_PASSWORD = "admin123";

function initAdminLogin() {
  const form = document.querySelector("[data-admin-login]");
  const error = document.querySelector(".login-error");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector("#admin-email").value.trim();
    const password = form.querySelector("#admin-password").value;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      error.textContent = "E-mail ou senha inválidos.";
      return;
    }

    sessionStorage.setItem("bejiroo-admin-auth", "true");
    window.location.href = "dashboard_.html";
  });
}

initAdminLogin();
