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

function initLoginPage() {
  wirePasswordToggles();
  const form = document.querySelector(".auth-form form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector("#email").value.trim();
    const password = form.querySelector("#password").value;
    const submit = form.querySelector("button[type='submit']");
    const message = form.querySelector(".form-message");

    if (email === "admin@admin" && password === "admin") {
      window.location.href = "admin/login_.html";
      return;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("bejiroo_users") || "[]");
    } catch {
      users = [];
    }
    const databaseUsers = [
      { id: "user-1", name: "Ana Silva", email: "ana@email.com", password: "ana123456" },
      { id: "user-2", name: "Carla Mendes", email: "carla@email.com", password: "carla123456" },
    ];
    databaseUsers.forEach((databaseUser) => {
      if (!users.some((item) => item.email === databaseUser.email)) users.push(databaseUser);
    });
    localStorage.setItem("bejiroo_users", JSON.stringify(users));
    const user = users.find((item) => item.email === email.toLowerCase() && item.password === password);

    if (user) {
      localStorage.setItem("bejiroo_current_user", JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
      window.location.href = "index.html";
      return;
    }

    if (message) message.textContent = "E-mail ou senha inválidos.";
    if (submit) submit.textContent = "Tentar novamente";
  });
}

initLoginPage();
