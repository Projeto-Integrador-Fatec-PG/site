function initCategoriasPage() {
  document.querySelectorAll("[data-demo-action]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Salvo com sucesso";
    });
  });
}

initCategoriasPage();
