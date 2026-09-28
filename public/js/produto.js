function initProductPage() {
  const productId = Number(new URLSearchParams(window.location.search).get("id"));
  const product = getProducts().find((item) => item.id === productId) || getProducts().find((item) => item.id === 3);
  const imageFile = productImageFile(product);
  const productImage = document.querySelector("[data-gallery-main-image]");
  const productTitle = document.querySelector(".detail-copy h1");
  const breadcrumbCurrent = document.querySelector(".breadcrumb .current");
  const tagline = document.querySelector(".product-tagline");
  const description = document.querySelector(".detail-copy .product-desc");
  const price = document.querySelector(".produto-page .price");

  if (product) {
    document.title = `${product.name} | Bejiróó`;
    if (productTitle) productTitle.textContent = product.name;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;
    if (tagline) tagline.textContent = product.description;
    if (description) description.textContent = product.description;
    if (price) price.textContent = formatPrice(product.price);
    if (productImage && imageFile) {
      productImage.src = `../public/imgs/${imageFile}`;
      productImage.alt = product.name;
    }
  }

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
