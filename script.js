// home.js
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
      listCategory.classList.add("list-items")
      let menu_link = document.createElement("a");
      menu_link.classList.add("li-a-link");
      menu_link.href = `category.html?name=${category.strCategory}`;
      menu_link.textContent = category.strCategory;

      listCategory.appendChild(menu_link);
      menuList.appendChild(listCategory);
    }
  });
