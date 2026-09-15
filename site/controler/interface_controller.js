const InterfaceController = {
  bindFormFeedback() {
    document.querySelectorAll("form").forEach((form) =>
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const submit = form.querySelector('button[type="submit"]');
        if (submit) submit.textContent = "Entrar";
      }),
    );
  },
  init() {
    this.bindFormFeedback();
  },
};

if (typeof document !== "undefined") InterfaceController.init();
