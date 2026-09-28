const SETTINGS_STORAGE_KEY = "bejiroo_settings";
const DEFAULT_SETTINGS = {
  storeName: "Bejiróó",
  email: "contato@bejiroo.com",
  phone: "(13) 99107-3671",
  address: "Rua dos Doces, 100 - Santos/SP",
  notifications: true,
};

const ADMIN_USER_STORAGE_KEY = "bejiroo_admin_user";
const DEFAULT_ADMIN_USER = { id: "admin", name: "Administrador", email: "admin@admin", password: "admin", type: "Administrador" };
const DEFAULT_REGULAR_USERS = [
  { id: "user-1", name: "Ana Silva", email: "ana@email.com", password: "ana123456" },
  { id: "user-2", name: "Carla Mendes", email: "carla@email.com", password: "carla123456" },
];

function initSettingsPage() {
  const form = document.querySelector("[data-settings-form]");
  if (!form) return;

  let settings;
  try {
    settings = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY)) || DEFAULT_SETTINGS;
  } catch {
    settings = DEFAULT_SETTINGS;
  }

  Object.entries(settings).forEach(([key, value]) => {
    const field = form.elements[key];
    if (!field) return;
    if (field.type === "checkbox") field.checked = value;
    else field.value = value;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const updatedSettings = {
      storeName: data.get("storeName").trim(),
      email: data.get("email").trim(),
      phone: data.get("phone").trim(),
      address: data.get("address").trim(),
      notifications: form.elements.notifications.checked,
    };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
    document.querySelector("[data-settings-message]").textContent = "Configurações salvas com sucesso.";
  });

  initUsersAndOrders();
}

function initUsersAndOrders() {
  const userRows = document.querySelector("[data-users-list]");
  const userModal = document.querySelector("[data-user-modal]");
  const userForm = document.querySelector("[data-user-form]");
  if (!userRows || !userModal || !userForm) return;

  const getUsers = () => {
    let users = [];
    try { users = JSON.parse(localStorage.getItem("bejiroo_users") || "[]"); } catch { users = []; }
    if (!users.length) {
      users = [...DEFAULT_REGULAR_USERS];
      localStorage.setItem("bejiroo_users", JSON.stringify(users));
    }
    let admin = DEFAULT_ADMIN_USER;
    try { admin = { ...DEFAULT_ADMIN_USER, ...JSON.parse(localStorage.getItem(ADMIN_USER_STORAGE_KEY) || "{}") }; } catch { /* usa admin padrão */ }
    return [admin, ...users.map((user, index) => ({ ...user, id: user.id || `user-${index}`, type: "Usuário" }))];
  };
  const saveUsers = (users) => {
    const admin = users.find((user) => user.type === "Administrador");
    const regularUsers = users.filter((user) => user.type === "Usuário").map(({ id, name, email, password }) => ({ id, name, email, password }));
    localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(admin));
    localStorage.setItem("bejiroo_users", JSON.stringify(regularUsers));
  };
  const closeUserModal = () => { userModal.hidden = true; };
  const render = () => {
    const users = getUsers();
    document.querySelector("[data-users-count]").textContent = `${users.length} usuários`;
    userRows.innerHTML = users.map((user) => `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.type}</td><td><button class="action-btn edit-user-button" type="button" data-edit-user="${user.id}" title="Editar usuário">Editar</button></td></tr>`).join("");
    userRows.querySelectorAll("[data-edit-user]").forEach((button) => button.addEventListener("click", () => {
      const user = users.find((item) => item.id === button.dataset.editUser);
      if (!user) return;
      userForm.elements.id.value = user.id;
      userForm.elements.name.value = user.name;
      userForm.elements.email.value = user.email;
      userForm.elements.password.value = user.password;
      userModal.hidden = false;
    }));
  };
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(userForm);
    const users = getUsers();
    const user = users.find((item) => item.id === data.get("id"));
    if (!user) return;
    user.name = data.get("name").trim();
    user.email = data.get("email").trim().toLowerCase();
    user.password = data.get("password");
    saveUsers(users);
    closeUserModal();
    render();
  });
  document.querySelectorAll("[data-close-user]").forEach((button) => button.addEventListener("click", closeUserModal));
  render();
}

initSettingsPage();
