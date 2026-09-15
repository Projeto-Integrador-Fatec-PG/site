function siteHeader() {
  const slot = document.querySelector("[data-site-header]");
  if (!slot) return;
  slot.innerHTML =
    '<header class="site-header"><div class="container"><a class="brand" href="index.html"><span class="brand-mark"><img src="../public/imgs/logo.png" alt="Logo Bejiróó"></span><span>BEJIRÓÓ</span></a><nav class="site-nav"><a href="index.html">Home</a><a href="cardapio_.html">Cardápio</a><a href="sobre_nos_.html">Sobre nós</a><a href="carrinho_.html">Carrinho</a></nav><div class="spacer"></div><a class="button button-dark" href="login_.html">Login</a><button class="mobile-menu" type="button" aria-label="Abrir menu">☰</button></div></header>';
}
function wireInteractions() {
  document.querySelectorAll(".choice button").forEach((button) =>
    button.addEventListener("click", () => {
      button.parentElement
        .querySelectorAll("button")
        .forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    }),
  );
  document.querySelectorAll("[data-demo-action]").forEach((button) =>
    button.addEventListener("click", () => {
      button.textContent = "Salvo com sucesso";
      button.classList.add("button-success");
    }),
  );
}
siteHeader();
wireInteractions();
