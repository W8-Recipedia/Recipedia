import Axios from "axios";
const root = process.env.API_ROOT;

export const getRecipesComplex = async (
  ingredients,
  intolerances,
  diet,
  offset = 0,
  query,
  maxReadyTime
) => {
  let url = `${root}recipes/complexSearch`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.RECIPE_API_KEY,
      instructionsRequired: true,
      addRecipeInformation: true,
      fillIngredients: true,
      number: process.env.MAX_RECIPE_NO,
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
  let url = `${root}recipes/findByIngredients`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.RECIPE_API_KEY,
      ingredients,
      number: process.env.MAX_RECIPE_NO,
      ranking: 1,
      ignorePantry: true,
    },
  });
};

export const getIngredients = async (query) => {
  let url = `${root}food/ingredients/autocomplete`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.RECIPE_API_KEY,
      query,
      number: process.env.MAX_AUTOCOMPLETE_NO,
    },
  });
};

export const getRecipeInfoById = async (id) => {
  let url = `${root}recipes/${id}/information`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.RECIPE_API_KEY,
    },
  });
};

export const getInstructions = async (id) => {
  let url = `${root}recipes/${id}/analyzedInstructions`;
  return await Axios.get(url, {
    params: {
      apiKey: process.env.RECIPE_API_KEY,
    },
  });
};
