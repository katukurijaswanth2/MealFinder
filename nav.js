// nav.js - handles hamburger menu toggle
let menuBox = document.querySelector(".menu");
let hamBurger = document.getElementById("hamBurger");
let wrong = document.getElementById("wrong");

if (hamBurger && wrong && menuBox) {
  hamBurger.addEventListener("click", () => {
    menuBox.style.display = "block";
  });

  wrong.addEventListener("click", () => {
    menuBox.style.display = "none";
  });
}
