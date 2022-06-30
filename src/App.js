import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from './components/RecipeEdit';
import RecipeList from './components/RecipeList';
import './css/app.css';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'CookingWithReact.recipes';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(recipesJSON != null) {
      setRecipes(JSON.parse(recipesJSON))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes])

  const recipeContextValue = {
    handleAddRecipe,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleAddRecipe() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: ''},
      ],
    }
    
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange(id, newRecipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = newRecipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id) {
    if(setSelectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }
  
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList 
        recipes={recipes} 
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Pain Dosa',
    servings: 3,
    cookTime: '1:45',
    instructions: "1.Prepare the Bater\n2.Make Dosa\n3.Eat the tasty dosa",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds',
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs',
      },
    ]
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    servings: 1,
    cookTime: '0:45',
    instructions: "1.Prepare the Chicken\n2.Make The Biryani\n3.Eat the tasty Briyani",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '2 Pounds',
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs',
      },
    ]
  }
]

export default App;