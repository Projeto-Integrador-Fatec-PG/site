function requireAdminSession() {
  if (sessionStorage.getItem("bejiroo-admin-auth") !== "true") {
    window.location.href = "login_.html";
  }
}

function initDashboardPage() {
  requireAdminSession();
  const products = getProducts();
  const activeProducts = products.filter((product) => product.active);
  const categories = ["bolos", "tortas", "doces", "sobremesas"];
  const categoryNames = { bolos: "Bolos", tortas: "Tortas", doces: "Doces", sobremesas: "Sobremesas" };
  const revenue = activeProducts.reduce((total, product) => total + product.price * product.stock, 0);
  const stock = activeProducts.reduce((total, product) => total + product.stock, 0);
  document.querySelector('[data-metric="products"]').textContent = activeProducts.length;
  document.querySelector('[data-metric="revenue"]').textContent = formatPrice(revenue);
  document.querySelector('[data-metric="stock"]').textContent = stock;

  document.querySelector("[data-recent-products]").innerHTML = activeProducts.slice(-5).reverse().map((product) => `
    <tr><td>${product.name}</td><td>${categoryNames[product.category]}</td><td>${formatPrice(product.price)}</td><td class="status active">ativo</td></tr>
  `).join("");

  const categoryTotals = categories.map((category) => ({
    label: categoryNames[category],
    value: activeProducts.filter((product) => product.category === category).reduce((total, product) => total + product.price * product.stock, 0),
  }));
  const maxCategory = Math.max(...categoryTotals.map((item) => item.value), 1);
  document.querySelector("[data-category-chart]").innerHTML = categoryTotals.map((item) => `
    <div class="chart-row"><span>${item.label}</span><div class="chart-track"><i style="width: ${(item.value / maxCategory) * 100}%"></i></div><strong>${formatPrice(item.value)}</strong></div>
  `).join("");

  const stockTotals = categories.map((category) => ({
    label: categoryNames[category],
    value: activeProducts.filter((product) => product.category === category).reduce((total, product) => total + product.stock, 0),
  }));
  const maxStock = Math.max(...stockTotals.map((item) => item.value), 1);
  document.querySelector("[data-stock-chart]").innerHTML = stockTotals.map((item) => `
    <div class="chart-row"><span>${item.label}</span><div class="chart-track"><i class="stock-bar" style="width: ${(item.value / maxStock) * 100}%"></i></div><strong>${item.value} un.</strong></div>
  `).join("");

  document.querySelectorAll(".stat").forEach((stat, index) => {
    stat.style.animationDelay = `${index * 80}ms`;
    stat.classList.add("reveal");
  });
}

initDashboardPage();
