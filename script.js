let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;

  // Check if the input is empty
  if (userInp.length === 0) {
    result.innerHTML = `<h3>Please enter a meal name</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        // Check if the meal data is available
        if (data.meals && data.meals.length > 0) {
          let myMeal = data.meals[0];

          // Log the meal data to the console
          console.log(myMeal);
          console.log(myMeal.strMealThumb);
          console.log(myMeal.strMeal);
          console.log(myMeal.strArea);
          console.log(myMeal.strInstructions);

          // Ingredients list
          let count = 1;
          let ingredients = [];
          for (let i in myMeal) {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && myMeal[i]) {
              ingredient = myMeal[i];
              measure = myMeal["strMeasure" + count];
              count += 1;
              ingredients.push(`${measure} ${ingredient}`);
            }
          }

          console.log(ingredients);

          // Display the meal details
          result.innerHTML = `
            <img src="${myMeal.strMealThumb}" alt="${myMeal.strMeal}">
            <div class="details">
              <h2>${myMeal.strMeal}</h2>
              <h4>${myMeal.strArea}</h4>
            </div>
            <div id="ingredient-con"></div>
            <div id="recipe">
              <button id="hide-recipe">X</button>
              <pre id="instructions">${myMeal.strInstructions}</pre>
            </div>
            <button id="show-recipe">View Recipe</button>
          `;

          // Populate ingredients
          let ingredientCon = document.getElementById("ingredient-con");
          let parent = document.createElement("ul");

          ingredients.forEach((i) => {
            let child = document.createElement("li");
            child.innerText = i;
            parent.appendChild(child);
          });

          ingredientCon.appendChild(parent);

          // Handle showing and hiding the recipe instructions
          let hideRecipe = document.getElementById("hide-recipe");
          let showRecipe = document.getElementById("show-recipe");

          hideRecipe.addEventListener("click", () => {
            document.getElementById("recipe").style.display = "none";
          });

          showRecipe.addEventListener("click", () => {
            document.getElementById("recipe").style.display = "block";
          });
        } else {
          result.innerHTML = `<h3>No meals found</h3>`;
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        result.innerHTML = `<h3>Error fetching data from API</h3>`;
      });
  }
});
