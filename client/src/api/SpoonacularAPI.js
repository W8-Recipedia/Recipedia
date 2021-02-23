import Axios from "axios";
require("dotenv").config();

export const getRecipesComplex = async (
  ingredients,
  intolerances,
  diet,
  offset = 0,
  query,
  maxReadyTime
) => {
  let url = "https://api.spoonacular.com/recipes/complexSearch";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      instructionsRequired: true,
      addRecipeInformation: true,
      fillIngredients: true,
      number: process.env.REACT_APP_MAX_AUTOCOMPLETE_NUMBER,
      includeIngredients: ingredients,
      diet: diet || undefined,
      intolerances: intolerances || undefined,
      offset,
      query,
      maxReadyTime,
    },
  });
};

export const getRecipesByIngredients = async (ingredients) => {
  let url = "https://api.spoonacular.com/recipes/findByIngredients";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      ingredients,
      number: process.env.REACT_APP_MAX_AUTOCOMPLETE_NUMBER,
      ranking: 1,
      ignorePantry: true,
    },
  });
};

export const getIngredients = async (query) => {
  let url = "https://api.spoonacular.com/food/ingredients/autocomplete";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      query,
      number: process.env.REACT_APP_MAX_AUTOCOMPLETE_NUMBER,
    },
  });
};

export const getRecipeInfoById = async (id) => {
  let url = `https://api.spoonacular.com/recipes/${id}/information`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
    },
  });
};

export const getInstructions = async (id) => {
  let url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
    },
  });
};
