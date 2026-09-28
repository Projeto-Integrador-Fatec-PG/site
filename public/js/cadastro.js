function wirePasswordToggles() {
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

function initSignupPage() {
  wirePasswordToggles();
  const form = document.querySelector("[data-signup-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim().toLowerCase();
    const password = form.querySelector("#password").value;
    const confirmation = form.querySelector("#password-confirmation").value;
    const message = form.querySelector(".form-message");

    if (password !== confirmation) {
      message.textContent = "As senhas não coincidem.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("bejiroo_users") || "[]");
    if (users.some((user) => user.email === email)) {
      message.textContent = "Este e-mail já está cadastrado.";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("bejiroo_users", JSON.stringify(users));
    localStorage.setItem("bejiroo_current_user", JSON.stringify({ name, email }));
    message.textContent = "Conta criada com sucesso! Redirecionando...";
    window.setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  });
}

initSignupPage();