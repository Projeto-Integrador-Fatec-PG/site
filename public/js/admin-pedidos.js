function initPedidosPage() {
  const rows = document.querySelector("[data-order-rows]");
  const modal = document.querySelector("[data-order-modal]");
  const form = document.querySelector("[data-order-form]");
  if (!rows || !modal || !form) return;
  let orders = getOrders();

  const closeModal = () => { modal.hidden = true; };
  const openModal = (order) => {
    form.reset();
    form.elements.id.value = order.id;
    form.elements.customer.value = order.customer;
    form.elements.date.value = order.date;
    form.elements.status.value = order.status;
    form.elements.total.value = order.total;
    form.elements.items.value = order.items;
    modal.hidden = false;
    form.elements.customer.focus();
  };

  const render = () => {
    document.querySelector('[data-order-metric="total"]').textContent = orders.length;
    document.querySelector('[data-order-metric="pending"]').textContent = orders.filter((order) => order.status === "pending").length;
    document.querySelector('[data-order-metric="done"]').textContent = orders.filter((order) => order.status === "done").length;
    rows.innerHTML = orders.map((order) => `
      <tr>
        <td>#${order.id}</td><td>${order.customer}</td><td>${order.date}</td>
        <td><span class="status ${order.status}">${orderStatusLabel(order.status)}</span></td>
        <td>${formatOrderPrice(order.total)}</td>
        <td class="actions"><button class="action-btn" type="button" data-view-order="${order.id}" title="Ver e editar detalhes">◉</button><button class="action-btn deliver" type="button" data-deliver-order="${order.id}" title="Confirmar entrega">✓</button></td>
      </tr>
    `).join("");
    rows.querySelectorAll("[data-view-order]").forEach((button) => button.addEventListener("click", () => openModal(orders.find((order) => order.id === Number(button.dataset.viewOrder)))));
    rows.querySelectorAll("[data-deliver-order]").forEach((button) => button.addEventListener("click", () => {
      const order = orders.find((item) => item.id === Number(button.dataset.deliverOrder));
      if (!order || order.status === "done" || !window.confirm(`Confirmar entrega do pedido #${order.id}?`)) return;
      order.status = "done";
      saveOrders(orders);
      render();
    }));
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const order = orders.find((item) => item.id === Number(data.get("id")));
    if (!order) return;
    order.customer = data.get("customer").trim();
    order.date = data.get("date").trim();
    order.status = data.get("status");
    order.total = Number(data.get("total"));
    order.items = data.get("items").trim();
    saveOrders(orders);
    closeModal();
    render();
  });

  document.querySelectorAll("[data-close-order]").forEach((button) => button.addEventListener("click", closeModal));
  render();
}

initPedidosPage();
