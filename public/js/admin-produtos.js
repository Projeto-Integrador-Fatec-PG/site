function initProdutosPage() {
  const search = document.querySelector(".toolbar input");
  const categoryFilter = document.querySelector("[data-category-filter]");
  const sortFilter = document.querySelector("[data-sort-filter]");
  const tableBody = document.querySelector("[data-product-rows]");
  const modal = document.querySelector("[data-product-modal]");
  const form = document.querySelector("[data-product-form]");
  if (!search || !categoryFilter || !sortFilter || !tableBody || !modal || !form) return;

  let products = getProducts();

  const openForm = (product) => {
    form.reset();
    form.elements.id.value = product?.id || "";
    form.elements.name.value = product?.name || "";
    form.elements.category.value = product?.category || "bolos";
    form.elements.price.value = product?.price || "";
    form.elements.stock.value = product?.stock ?? "";
    form.elements.description.value = product?.description || "";
    form.elements.image.value = product?.image || "";
    document.querySelector("#product-form-title").textContent = product ? "Editar produto" : "Adicionar produto";
    modal.hidden = false;
    form.elements.name.focus();
  };

  const closeForm = () => { modal.hidden = true; };

  const render = () => {
    const query = search.value.trim().toLocaleLowerCase("pt-BR");
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    const visibleProducts = products
      .filter((product) => product.name.toLocaleLowerCase("pt-BR").includes(query))
      .filter((product) => category === "todos" || product.category === category)
      .sort((first, second) => {
        if (sort === "name-asc") return first.name.localeCompare(second.name, "pt-BR");
        if (sort === "price-asc") return first.price - second.price;
        if (sort === "price-desc") return second.price - first.price;
        return first.id - second.id;
      });

    tableBody.innerHTML = visibleProducts.map((product) => `
      <tr>
        <td><div class="admin-product-image">${productImageFile(product) ? `<img src="../../public/imgs/${productImageFile(product)}" alt="${product.name}">` : product.image}</div></td>
        <td>${product.name}</td>
        <td>${formatPrice(product.price)}</td>
        <td>${product.stock} un.</td>
        <td class="status ${product.active ? "active" : "pending"}">${product.active ? "ativo" : "inativo"}</td>
        <td class="actions"><button class="action-btn" type="button" data-edit-product="${product.id}" title="Editar">✎</button><button class="action-btn delete" type="button" data-delete-product="${product.id}" title="Excluir">▮</button></td>
      </tr>
    `).join("");

    tableBody.querySelectorAll("[data-edit-product]").forEach((button) => {
      button.addEventListener("click", () => openForm(products.find((product) => product.id === Number(button.dataset.editProduct))));
    });
    tableBody.querySelectorAll("[data-delete-product]").forEach((button) => {
      button.addEventListener("click", () => {
        const product = products.find((item) => item.id === Number(button.dataset.deleteProduct));
        if (!product || !window.confirm(`Excluir ${product.name}?`)) return;
        products = products.filter((item) => item.id !== product.id);
        saveProducts(products);
        render();
      });
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const product = {
      id: Number(data.get("id")) || nextProductId(products),
      name: data.get("name").trim(),
      category: data.get("category"),
      price: Number(data.get("price")),
      stock: Number(data.get("stock")),
      description: data.get("description").trim(),
      image: data.get("image").trim() || "doce",
      active: true,
    };
    const existingIndex = products.findIndex((item) => item.id === product.id);
    if (existingIndex >= 0) products[existingIndex] = product;
    else products.push(product);
    saveProducts(products);
    closeForm();
    render();
  });

  document.querySelector("[data-open-product-form]").addEventListener("click", () => openForm());
  document.querySelectorAll("[data-close-product-form]").forEach((button) => button.addEventListener("click", closeForm));
  search.addEventListener("input", render);
  categoryFilter.addEventListener("change", render);
  sortFilter.addEventListener("change", render);
  render();
}

initProdutosPage();
