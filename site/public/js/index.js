function initHomePage() {
  document.querySelectorAll(".product-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 80}ms`;
    card.classList.add("reveal");
  });
}

initHomePage();
