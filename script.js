let menuList = document.getElementById("main-menu");
let homeCards = document.getElementById("home-cards");


fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(res => res.json())
  .then(data => {
    let categories = data.categories;

    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];

      // ✅ Build category cards
      let card = document.createElement("div");
      card.classList.add("home-card");
      card.style.animationDelay = `${i * 0.2}s`;

      // 🔗 Clickable card → go to category
      card.addEventListener("click", () => {
        window.location.href = `category.html?name=${category.strCategory}`;
      });

      let title = document.createElement("span");
      title.classList.add("home-name");
      title.textContent = category.strCategory;

      let img = document.createElement("img");
      img.classList.add("home-img");
      img.src = category.strCategoryThumb;
      img.alt = category.strCategory;

      card.appendChild(title);
      card.appendChild(img);
      homeCards.appendChild(card);

      // ✅ Add to menu
      let listCategory = document.createElement("li");
      listCategory.classList.add("list-items");
      let menu_link = document.createElement("a");
      menu_link.classList.add("li-a-link");
      menu_link.href = `category.html?name=${category.strCategory}`;
      menu_link.textContent = category.strCategory;

      listCategory.appendChild(menu_link);
      menuList.appendChild(listCategory);
    }
  });


// 🔎 ✅ Search Feature
let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-icon");

searchBtn.addEventListener("click", () => {
  let query = searchInput.value.trim();
  if (query === "") return;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.meals && data.meals.length > 0) {
        let meal = data.meals[0];
        // Redirect to meal details with id + category
        window.location.href = `meal.html?id=${meal.idMeal}&category=${meal.strCategory}`;
      } else {
        alert("No meal found. Please try another name.");
      }
    });
});

// ✅ Optional: allow Enter key to trigger search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
