// category.js
let params = new URLSearchParams(window.location.search);
let categoryName = params.get("name");

let menuList = document.getElementById("main-menu");
let categoryDetails = document.getElementById("category-details");
let categoryMeals = document.getElementById("category-meals");

// Fetch categories for description + menu
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(res => res.json())
  .then(data => {
    let categories = data.categories;

    for (let category of categories) {
      // Menu build
      let listCategory = document.createElement("li");
      listCategory.classList.add("list-items");

      let menu_link = document.createElement("a");
      menu_link.classList.add("li-a-link");
      menu_link.href = `category.html?name=${category.strCategory}`;
      menu_link.textContent = category.strCategory;

      listCategory.appendChild(menu_link);
      menuList.appendChild(listCategory);

      // Selected category details
      if (category.strCategory === categoryName) {
        categoryDetails.innerHTML = `
          <div class="category-info">
            <h2>${category.strCategory}</h2>
            <p>${category.strCategoryDescription}</p>
          </div>
          <h1 class="meals-title">MEALS</h1>
        `;
      }
    }
  });

// Fetch meals for category
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
  .then(res => res.json())
  .then(data => {
    let meals = data.meals;

    for (let meal of meals) {
      let mealCard = document.createElement("div");
      mealCard.classList.add("category-card");

      // ✅ Include both id + category in the link
      mealCard.innerHTML = `
        <a href="meal.html?id=${meal.idMeal}&category=${categoryName}">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="mealimg-in-category">
          <span class="meal-name-in-category">${meal.strMeal}</span>
        </a>
      `;

      categoryMeals.appendChild(mealCard);
    }
  });
