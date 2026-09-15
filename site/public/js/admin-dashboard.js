function requireAdminSession() {
  if (sessionStorage.getItem("bejiroo-admin-auth") !== "true") {
    window.location.href = "login_.html";
  }
}

function initDashboardPage() {
  requireAdminSession();
  document.querySelectorAll(".stat").forEach((stat, index) => {
    stat.style.animationDelay = `${index * 80}ms`;
    stat.classList.add("reveal");
  });
}

initDashboardPage();
