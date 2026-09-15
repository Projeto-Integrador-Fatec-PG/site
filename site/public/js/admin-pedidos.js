function initPedidosPage() {
  document
    .querySelectorAll(".status")
    .forEach((status) =>
      status.setAttribute("aria-label", status.textContent.trim()),
    );
}

initPedidosPage();
