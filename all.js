// ----------------------------
// Detect current page
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Global menu (exists on all pages)
  let menuBox = document.querySelector(".menu");
  let hamBurger = document.getElementById("hamBurger");
  let wrong = document.getElementById("wrong");
  let menuList = document.getElementById("main-menu");

  if (hamBurger && wrong && menuBox) {
    hamBurger.addEventListener("click", () => {
      menuBox.style.display = "block";
    });

    wrong.addEventListener("click", () => {
      menuBox.style.display = "none";
    });
  }

  // ----------------------------
  // GLOBAL: Build Menu Function
  // ----------------------------
  function buildMenu() {
    if (!menuList) return;

    menuList.innerHTML = "";

    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => {
        let categories = data.categories;

        for (let category of categories) {
          let listCategory = document.createElement("li");
          listCategory.classList.add("list-items");

          let menu_link = document.createElement("a");
          menu_link.classList.add("li-a-link");
          menu_link.href = `category.html?name=${category.strCategory}`;
          menu_link.textContent = category.strCategory;

          listCategory.appendChild(menu_link);
          menuList.appendChild(listCategory);
        }
      })
      .catch(err => console.error("Menu fetch error:", err));
  }

  //  Always call this, so menu is built on all pages
  buildMenu();

  // ----------------------------
  // GLOBAL SEARCH FEATURE (works everywhere)
  // ----------------------------
  let searchInput = document.querySelector(".search-input");
  let searchBtn = document.querySelector(".search-icon");

  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", () => {
      let query = searchInput.value.trim();
      if (query === "") return;

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(res => res.json())
        .then(data => {
          if (data.meals && data.meals.length > 0) {
            let meal = data.meals[0];
            window.location.href = `meal.html?id=${meal.idMeal}&category=${meal.strCategory}`;
          } else {
            alert("No meal found. Please try another name.");
          }
        })
        .catch(err => console.error("Search fetch error:", err));
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
  }

  // ----------------------------
  // HOME PAGE (index.html)
  // ----------------------------
  if (document.getElementById("home-cards")) {
    let homeCards = document.getElementById("home-cards");

    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => {
        let categories = data.categories;

        for (let i = 0; i < categories.length; i++) {
          let category = categories[i];

          let card = document.createElement("div");
          card.classList.add("home-card");
          card.style.animationDelay = `${i * 0.2}s`;

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
        }
      })
      .catch(err => console.error("Home fetch error:", err));
  }

  // ----------------------------
  // CATEGORY PAGE (category.html)
  // ----------------------------
  if (document.getElementById("category-details")) {
    let params = new URLSearchParams(window.location.search);
    let categoryName = params.get("name");

    let categoryDetails = document.getElementById("category-details");
    let categoryMeals = document.getElementById("category-meals");

    // Fetch selected category details
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => {
        let categories = data.categories;

        for (let category of categories) {
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
      })
      .catch(err => console.error("Category details fetch error:", err));

    // Fetch meals for category
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then(res => res.json())
      .then(data => {
        let meals = data.meals;

        for (let meal of meals) {
          let mealCard = document.createElement("div");
          mealCard.classList.add("category-card");

          mealCard.innerHTML = `
            <a href="meal.html?id=${meal.idMeal}&category=${categoryName}">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="mealimg-in-category">
              <span class="meal-name-in-category">${meal.strMeal}</span>
            </a>
          `;

          categoryMeals.appendChild(mealCard);
        }
      })
      .catch(err => console.error("Meals fetch error:", err));
  }

  // ----------------------------
  // MEAL PAGE (meal.html)
  // ----------------------------
  if (document.getElementById("meal-details")) {
    let params = new URLSearchParams(window.location.search);
    let mealId = params.get("id");
    let categoryName = params.get("category");

    let mealDetails = document.getElementById("meal-details");

    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
      .then(res => res.json())
      .then(data => {
        let meal = data.meals[0];

        // ========================
        // INGREDIENTS
        // ========================
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
          let ingredient = meal["strIngredient" + i];
          let measure = meal["strMeasure" + i];

          if (ingredient && ingredient.trim() !== "")
             {
            ingredientsList += `<li> ${ingredient}</li>`;
          }
        }
      //======================= 
      //     Measurements
      //=======================
        
        let MeasurementsList="";
        for(let i=1;i<=20;i++)
          {
          let ingredients=meal["strIngredient"+i];
          let measurements=meal["strMeasure"+i];
            if (ingredients && ingredients.trim() !== "")
          {
            MeasurementsList += `<li>${measurements}${ingredients}</li>`;
          }
        }

        // ========================
        // INSTRUCTIONS
        // ========================
        let instructionSteps = meal.strInstructions.split(/\r?\n/);
        let instructionsList = "";
        instructionSteps.forEach(step => {
          if (step.trim() !== "") {
            instructionsList += `<li>${step.trim()}</li>`;
          }
        });

        // ========================
        // PUT EVERYTHING INTO HTML
        // ========================
        mealDetails.innerHTML = `
          <div class="meal-section">
          <div class="path-parent"
            <div class="path">
              <a href="index.html">HOME</a>
              <h1>>></h1>
              <p>
                <a href="category.html?name=${categoryName}" class="back-link">Back to ${categoryName}</a>
              </p>  
            </div>

            <div class="meal-hero-section">
              <div class="meal-image-sec">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              </div>
              <div class="meal-header">
                <h1>${meal.strMeal}</h1>
                <p class="meal-category-p"><b>Category:</b> ${meal.strCategory}</p>
                <p class="tags">tags:<span> ${meal.strTags || ""}</span></p>
                ${
                  meal.strYoutube
                    ? `<p class="scource-link">Source: <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a></p>`
                    : ""
                }

                <div class="Ingredients">
                  <h2>Ingredients</h2>
                  <ul>${ingredientsList}</ul>
                </div>
              </div>
            </div>
            <div class="measurements">
            <h2>MEASUREMENTS</h2>
            <ul class="measurement-list">${MeasurementsList}</ul>
            </div>

            <div class="instructions">
              <h2>Instructions</h2>
              <ul class="instruction-list">${instructionsList}</ul>
            </div>
          </div>
        `;
      })
      .catch(err => console.error("Meal fetch error:", err));
  }
});
