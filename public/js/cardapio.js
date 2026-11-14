function initMenuPage() {
  const filters = document.querySelectorAll("[data-category-filter]");
  const grid = document.querySelector("[data-public-products]");
  if (!grid) return;
  let selectedCategory = "todos";

  const renderProducts = () => {
    const products = getProducts().filter((product) => product.active && (selectedCategory === "todos" || product.category === selectedCategory));
    grid.innerHTML = products.map((product) => `
      <a class="product-card" href="produto_.html?id=${product.id}" data-category="${product.category}">
        <div class="product-image">${productImageFile(product) ? `<img src="${escapeHTML(productImageUrl(product))}" alt="${escapeHTML(product.name)}">` : escapeHTML(product.image)}</div>
        <h3>${escapeHTML(product.name)}</h3>
        <strong>${formatPrice(product.price)}</strong>
        <p class="product-desc">${escapeHTML(product.description)}</p>
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
