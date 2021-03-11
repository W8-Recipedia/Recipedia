import Axios from "axios";

export const getComplexRecipes = async (
  intolerances,
  diet,
  dishtypes,
  cuisines,
  offset = 0,
  query
) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/complexsearch",
    {
      instructions: true,
      recipeinformation: true,
      fillingredients: true,
      diet: diet,
      intolerances: intolerances,
      type: dishtypes,
      cuisine: cuisines,
      offset,
      query,
    }
  );
};

export const getRandomRecommendedRecipes = async (tags) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/random",
    {
      tags: tags,
    }
  );
};

export const getMultipleRecipes = async (favourites) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/informationbulk",
    {
      favourites: favourites,
    }
  );
};
