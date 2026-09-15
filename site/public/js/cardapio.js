function initMenuPage() {
  document.querySelectorAll(".choice button").forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement
        .querySelectorAll("button")
        .forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
}

initMenuPage();
