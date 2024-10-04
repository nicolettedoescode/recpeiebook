const recipeList = document.getElementById('recipes');
const savedRecipeList = document.getElementById('saved-recipe-list');
const saveRecipeButton = document.getElementById('save-recipe');
const reviewRecipesButton = document.getElementById('review-recipes');
const savedRecipesSection = document.getElementById('saved-recipes');
const closeSavedRecipesButton = document.getElementById('close-saved-recipes');

// Save new recipe
saveRecipeButton.addEventListener('click', () => {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const imageInput = document.getElementById('recipe-image');

    if (!name || !ingredients || !instructions) {
        alert('Please fill out all fields.');
        return;
    }

    const image = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : 'default-image.jpg';

    const recipe = { name, ingredients, instructions, image };
    let savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));

    alert(`Recipe "${name}" saved! 🎉`);
    document.getElementById('recipe-name').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('instructions').value = '';
    imageInput.value = '';
});

// Review saved recipes
reviewRecipesButton.addEventListener('click', () => {
    savedRecipeList.innerHTML = ''; // Clear the list before displaying saved recipes
    let savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    if (savedRecipes.length === 0) {
        alert('No recipes saved yet!');
        return;
    }

    savedRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        savedRecipeList.appendChild(recipeCard);
    });

    // Show the saved recipes section
    savedRecipesSection.style.display = 'block';
});

// Close saved recipes section
closeSavedRecipesButton.addEventListener('click', () => {
    savedRecipesSection.style.display = 'none'; // Hide the saved recipes section
});

// Optional: Fetch initial recipes (optional API call for default recipes)
fetchRecipes('pasta'); // Example query, adjust as needed

function fetchRecipes(query) {
    // Dummy fetch simulation (replace with real API fetch if required)
    const demoRecipes = [
        { name: 'Pasta', ingredients: 'Tomatoes, Pasta, Cheese', instructions: 'Boil pasta, add sauce', image: 'default-image.jpg' },
        { name: 'Salad', ingredients: 'Lettuce, Cucumber, Dressing', instructions: 'Mix ingredients', image: 'default-image.jpg' }
    ];
    displayRecipes(demoRecipes);
}

function displayRecipes(recipes) {
    recipeList.innerHTML = ''; // Clear existing recipes
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        recipeList.appendChild(recipeCard);
    });
}
