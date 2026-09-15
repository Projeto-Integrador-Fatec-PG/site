function initProdutosPage() {
  const search = document.querySelector(".toolbar input");
  if (!search) return;
  search.addEventListener("input", () => {
    const query = search.value.toLowerCase();
    document.querySelectorAll(".data-table tbody tr").forEach((row) => {
      row.hidden = !row.textContent.toLowerCase().includes(query);
    });
  });
}

initProdutosPage();
