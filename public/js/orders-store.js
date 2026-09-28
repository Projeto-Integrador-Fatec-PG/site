const ORDER_STORAGE_KEY = "bejiroo_orders";

const DEFAULT_ORDERS = [
  { id: 12345, customer: "Ana Silva", date: "25/10/23 14:30", status: "done", total: 72, items: "1 Bolo de Cenoura Especial, 2 Brigadeiros" },
  { id: 12346, customer: "Ana Silva", date: "25/10/23 14:30", status: "preparing", total: 72, items: "1 Torta de Chocolate, 2 Trufas" },
  { id: 12347, customer: "Ana Silva", date: "25/10/23 14:30", status: "pending", total: 72, items: "1 Cheesecake de Frutas Vermelhas, 2 Brownies" },
  { id: 12348, customer: "Carla Mendes", date: "25/10/23 15:05", status: "pending", total: 38, items: "1 Bolo de Laranja Caseiro" },
  { id: 12349, customer: "João Pereira", date: "25/10/23 16:20", status: "done", total: 54, items: "2 Mousses de Maracujá, 2 Beijinhos" },
  { id: 12350, customer: "Beatriz Souza", date: "25/10/23 17:10", status: "done", total: 96, items: "2 Tortas de Chocolate, 4 Brigadeiros" },
];

function getOrders() {
  const saved = localStorage.getItem(ORDER_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
    return [...DEFAULT_ORDERS];
  }
  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
    return [...DEFAULT_ORDERS];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
}

function formatOrderPrice(value) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function orderStatusLabel(status) {
  return { pending: "Pendente", preparing: "Em Preparo", done: "Entregue" }[status] || "Pendente";
}