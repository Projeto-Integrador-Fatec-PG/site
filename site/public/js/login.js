function initLoginPage() {
  const form = document.querySelector(".auth-form form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector("#email").value.trim();
    const password = form.querySelector("#password").value;
    const submit = form.querySelector("button[type='submit']");

    if (email === "admin@admin" && password === "admin") {
      window.location.href = "admin/login_.html";
      return;
    }

    if (submit) submit.textContent = "Entrar";
  });
}

initLoginPage();
