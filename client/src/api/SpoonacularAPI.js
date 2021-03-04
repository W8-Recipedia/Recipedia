import Axios from "axios";

export const getRecipesComplex = async (
  ingredients,
  intolerances,
  diet,
  offset = 0,
  query,
  maxReadyTime
) => {
  let url = "/recipes/complexSearch";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      instructionsRequired: true,
      addRecipeInformation: true,
      fillIngredients: true,
      number: process.env.REACT_APP_MAX_RECIPE_NUMBER,
      includeIngredients: ingredients,
      diet: diet || undefined,
      intolerances: intolerances || undefined,
      offset,
      query,
      maxReadyTime,
    },
  });
};

export const getRandomRecipes = async () => {
  let url = "/recipes/random";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      number: process.env.REACT_APP_MAX_RECIPE_NUMBER,
    },
  });
};

export const getRecipesByIngredients = async (ingredients) => {
  let url = "/recipes/findByIngredients";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      ingredients,
      number: process.env.REACT_APP_MAX_RECIPE_NUMBER,
      ranking: 1,
      ignorePantry: true,
    },
  });
};

export const getIngredients = async (query) => {
  let url = "/food/ingredients/autocomplete";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      query,
      number: process.env.REACT_APP_MAX_AUTOCOMPLETE_NUMBER,
    },
  });
};

export const getRecipeInfoById = async (id) => {
  let url = `/recipes/${id}/information`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
    },
  });
};

export const getInstructions = async (id) => {
  let url = `/recipes/${id}/analyzedInstructions`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
    },
  });
};
