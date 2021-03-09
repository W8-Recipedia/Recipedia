import Axios from "axios";

export const getComplexRecipes = async (
  ingredients,
  intolerances,
  diet,
  dishtypes,
  cuisines,
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
      type: dishtypes || undefined,
      cuisine: cuisines || undefined,
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

export const getMultipleRecipes = async (favRecipes) => {
  let url = "/recipes/informationBulk";
  return await Axios.get(url, {
    params: {
      apiKey: process.env.REACT_APP_RECIPE_API_KEY,
      ids: favRecipes,
    },
  });
};
