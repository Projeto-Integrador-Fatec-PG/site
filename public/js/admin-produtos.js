function initProdutosPage() {
  const search = document.querySelector(".toolbar input");
  const categoryFilter = document.querySelector("[data-category-filter]");
  const sortFilter = document.querySelector("[data-sort-filter]");
  const tableBody = document.querySelector("[data-product-rows]");
  const modal = document.querySelector("[data-product-modal]");
  const form = document.querySelector("[data-product-form]");
  const imageFileInput = document.querySelector('[name="imageFile"]');
  const imagePreview = document.querySelector("[data-product-image-preview]");
  const imagePreviewImage = imagePreview?.querySelector("img");
  const message = document.querySelector("[data-product-message]");
  if (!search || !categoryFilter || !sortFilter || !tableBody || !modal || !form || !imageFileInput || !imagePreview || !imagePreviewImage || !message) return;

  let products = getProducts();
  let selectedImageData = "";

  const showImagePreview = (source) => {
    imagePreview.hidden = !source;
    imagePreviewImage.src = source || "";
  };

  const openForm = (product) => {
    form.reset();
    selectedImageData = "";
    form.elements.id.value = product?.id || "";
    form.elements.name.value = product?.name || "";
    form.elements.category.value = product?.category || "bolos";
    form.elements.price.value = product?.price || "";
    form.elements.stock.value = product?.stock ?? "";
    form.elements.description.value = product?.description || "";
    form.elements.imageSource.value = product ? productImageFile(product) || "" : "";
    message.textContent = "";
    showImagePreview(product ? productImageUrl(product, "../../public/imgs/") : "");
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
        <td><div class="admin-product-image">${productImageFile(product) ? `<img src="${escapeHTML(productImageUrl(product, "../../public/imgs/"))}" alt="${escapeHTML(product.name)}">` : escapeHTML(product.image)}</div></td>
        <td>${escapeHTML(product.name)}</td>
        <td>${formatPrice(product.price)}</td>
        <td>${product.stock} un.</td>
        <td><span class="status ${product.active ? "active" : "pending"}">${product.active ? "Ativo" : "Inativo"}</span></td>
        <td class="actions"><button class="action-btn" type="button" data-edit-product="${product.id}" aria-label="Editar ${escapeHTML(product.name)}" title="Editar"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m14 5 5 5M4 20l4.5-1 10.1-10.1a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z"/></svg></button><button class="action-btn delete" type="button" data-delete-product="${product.id}" aria-label="Excluir ${escapeHTML(product.name)}" title="Excluir"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button></td>
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

  imageFileInput.addEventListener("change", async () => {
    const file = imageFileInput.files?.[0];
    selectedImageData = "";
    message.textContent = "";
    if (!file) {
      showImagePreview(productImageUrl({ image: form.elements.imageSource.value }, "../../public/imgs/"));
      return;
    }

    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) {
      message.textContent = "Escolha uma imagem PNG, JPG, WebP ou GIF.";
      imageFileInput.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      message.textContent = "A imagem deve ter no máximo 10 MB.";
      imageFileInput.value = "";
      return;
    }

    try {
      selectedImageData = await compressProductImage(file);
      showImagePreview(selectedImageData);
    } catch (error) {
      message.textContent = error.message || "Não foi possível carregar esta imagem.";
      imageFileInput.value = "";
    }
  });

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
      image: selectedImageData || data.get("imageSource") || "doce",
      active: true,
    };
    const existingIndex = products.findIndex((item) => item.id === product.id);
    const previousProduct = existingIndex >= 0 ? products[existingIndex] : null;
    if (existingIndex >= 0) products[existingIndex] = product;
    else products.push(product);
    try {
      saveProducts(products);
    } catch {
      message.textContent = "Não foi possível salvar. Tente uma imagem menor ou remova imagens antigas.";
      if (existingIndex >= 0) products[existingIndex] = previousProduct;
      else products.pop();
      return;
    }
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

function compressProductImage(file) {
  return createImageBitmap(file).then((bitmap) => {
    const maxDimension = 1000;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Não foi possível processar esta imagem."));
          return;
        }
        if (blob.size > 700 * 1024) {
          reject(new Error("A imagem ficou muito grande. Escolha uma foto menor."));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Não foi possível ler esta imagem."));
        reader.readAsDataURL(blob);
      }, "image/webp", 0.8);
    });
  });
}

initProdutosPage();
