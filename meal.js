// Get meal ID from the URL (example: meal.html?id=52772)
let params = new URLSearchParams(window.location.search);
let mealId = params.get("id");

// Where to put meal details
let mealDetails = document.getElementById("meal-details");

// Fetch meal details
fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let meal = data.meals[0];

        // Collect ingredients into <li>
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal["strIngredient" + i];
            let measure = meal["strMeasure" + i];
            if (ingredient && ingredient.trim() !== "") {
                ingredientsList += "<li>" + measure + " " + ingredient + "</li>";
            }
        }

        // ✅ Convert instructions into <li>
        let instructionSteps = meal.strInstructions.split(/\r?\n/); // split by new lines
        let instructionsList = "";
        instructionSteps.forEach(function (step) {
            if (step.trim() !== "") {
                instructionsList += "<li>" + step.trim() + "</li>";
            }
        });

        // Build everything with innerHTML
        mealDetails.innerHTML = `
        <div class="meal-section">

  <!-- Hero Section -->
  <div class="meal-hero-section">

    <!-- Meal Image -->
    <div class="meal-image-sec">
      <img 
        src="${meal.strMealThumb}" 
        alt="${meal.strMeal}" 
        style="width:100%; max-width:400px; border-radius:10px; margin-bottom:15px;">
    </div>

    <!-- Meal Header -->
    <div class="meal-header">
      <h1>${meal.strMeal}</h1>
      <p class="meal-category-p"><b>Category:</b> ${meal.strCategory}</p>
    
      
     <p> ${meal.strYoutube ? `<p class="scource-link"> Scource:<a href="${meal.strYoutube}" target="_blank"> Watch on YouTube</a></p>` : ""}</p>
<div class="Ingredients">
      <!-- Ingredients -->
      <h2>Ingredients</h2>
      <ul>
        ${ingredientsList}
      </ul>
      </div>
    </div>

  </div>

  <!-- Instructions -->
  <div class="instructions">
    <h2>Instructions</h2>
    <ul class="instruction-list">
      ${instructionsList}
    </ul>
  </div>

</div>

    `;
    });
