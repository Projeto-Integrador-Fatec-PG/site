function initAdminMenu() {
  const toggle = document.querySelector("[data-admin-menu-toggle]");
  const menu = document.querySelector("[data-admin-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".admin-profile")) menu.hidden = true;
  });

  menu.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
    sessionStorage.removeItem("bejiroo-admin-auth");
    window.location.href = "login_.html";
  });
}

initAdminMenu();
