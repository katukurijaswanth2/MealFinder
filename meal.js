// Get meal ID + category from URL
let params = new URLSearchParams(window.location.search);
let mealId = params.get("id");
let categoryName = params.get("category"); // to go back later

// Where to put meal details
let mealDetails = document.getElementById("meal-details");

// Fetch meal details
fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
  .then(res => res.json())
  .then(data => {
    let meal = data.meals[0];

    // Collect ingredients
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal["strIngredient" + i];
      let measure = meal["strMeasure" + i];
      if (ingredient && ingredient.trim() !== "") {
        ingredientsList += `<li>${ingredient} - ${measure}</li>`;
      }
    }

    // Convert instructions into <li>
    let instructionSteps = meal.strInstructions.split(/\r?\n/);
    let instructionsList = "";
    instructionSteps.forEach(step => {
      if (step.trim() !== "") {
        instructionsList += `<li>${step.trim()}</li>`;
      }
    });

    // Build everything
    mealDetails.innerHTML = `
      <div class="meal-section">
        <div class="path">
      <a href="index.html">HOME</a>
         <h1>>></h1>
        <p>
          <a href="category.html?name=${categoryName}" class="back-link">Back to ${categoryName}</a>
        </p>  
        </div>

        <!-- Hero Section -->
        <div class="meal-hero-section">
          <div class="meal-image-sec">
            <img 
              src="${meal.strMealThumb}" 
              alt="${meal.strMeal}" 
              style="width:100%; max-width:400px; border-radius:10px; margin-bottom:15px;">
          </div>
          <div class="meal-header">
            <h1>${meal.strMeal}</h1>
            <p class="meal-category-p"><b>Category:</b> ${meal.strCategory}</p>
            ${meal.strYoutube
        ? `<p class="scource-link">Source: <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a></p>`
        : ""
      }
            <div class="Ingredients">
              <h2>Ingredients</h2>
              <ol>${ingredientsList}</ol>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="instructions">
          <h2>Instructions</h2>
          <ul class="instruction-list">${instructionsList}</ul>
        </div>
      </div>
    `;
  });
