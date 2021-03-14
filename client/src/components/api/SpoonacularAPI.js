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
//
// MERGE getComplexRecipes and getShuffledRecommendedRecipes
//
export const getShuffledRecommendedRecipes = async (
  intolerances,
  diet,
  offset
) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/complexsearch",
    {
      instructions: true,
      recipeinformation: true,
      fillingredients: true,
      diet: diet,
      intolerances: intolerances,
      offset,
      random: true,
    }
  );
};

export const getRecipesByID = async (favourites) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/informationbulk",
    {
      favourites: favourites,
    }
  );
};
