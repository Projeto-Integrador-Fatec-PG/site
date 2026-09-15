function initProductPage() {
  const quantityValue = document.querySelector("[data-quantity-value]");

  document.querySelectorAll("[data-quantity-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentQuantity = Number(quantityValue.textContent);
      const change = button.dataset.quantityAction === "increase" ? 1 : -1;
      quantityValue.textContent = Math.max(1, currentQuantity + change);
    });
  });

  document.querySelectorAll(".choice button").forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement
        .querySelectorAll("button")
        .forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
  document.querySelectorAll("[data-demo-action]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Salvo com sucesso";
      button.classList.add("button-success");
    });
  });
}

initProductPage();
