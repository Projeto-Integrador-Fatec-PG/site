function initMenuPage() {
  const filters = document.querySelectorAll("[data-category-filter]");
  const grid = document.querySelector("[data-public-products]");
  if (!grid) return;
  let selectedCategory = "todos";

  const renderProducts = () => {
    const products = getProducts().filter((product) => product.active && (selectedCategory === "todos" || product.category === selectedCategory));
    grid.innerHTML = products.map((product) => `
      <a class="product-card" href="produto_.html?id=${product.id}" data-category="${product.category}">
        <div class="product-image">${productImageFile(product) ? `<img src="../public/imgs/${productImageFile(product)}" alt="${product.name}">` : product.image}</div>
        <h3>${product.name}</h3>
        <strong>${formatPrice(product.price)}</strong>
        <p class="product-desc">${product.description}</p>
      </a>
    `).join("");
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.categoryFilter;
      filters.forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      renderProducts();
    });
  });

  renderProducts();
}

initMenuPage();
