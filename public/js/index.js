function initHomePage() {
  const featuredGrid = document.querySelector("[data-featured-products]");
  if (featuredGrid) {
    const products = getProducts().filter((product) => product.active);
    const featuredIds = [3, 1, 2];
    const featuredProducts = featuredIds
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean);

    products.forEach((product) => {
      if (featuredProducts.length < 3 && !featuredProducts.some((featured) => featured.id === product.id)) {
        featuredProducts.push(product);
      }
    });

    featuredGrid.innerHTML = featuredProducts.slice(0, 3).map((product, index) => `
      <a class="product-card${index === 0 ? " featured" : ""}" href="produto_.html?id=${product.id}">
        <div class="product-image">${productImageFile(product) ? `<img src="${escapeHTML(productImageUrl(product))}" alt="${escapeHTML(product.name)}">` : escapeHTML(product.image)}</div>
        <h3>${escapeHTML(product.name)}</h3>
        <strong>${formatPrice(product.price)}</strong>
      </a>
    `).join("");
  }

  document.querySelectorAll(".product-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 80}ms`;
    card.classList.add("reveal");
  });
}

initHomePage();
