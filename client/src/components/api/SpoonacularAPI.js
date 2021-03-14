import Axios from "axios";

export const getRecipesComplex = async (
  allergens,
  diet,
  dishtypes,
  cuisines,
  offset = 0,
  query,
  random
) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/getRecipesComplex",
    {
      instructions: true,
      recipeinformation: true,
      fillingredients: true,
      diet: diet,
      intolerances: allergens,
      type: dishtypes,
      cuisine: cuisines,
      offset,
      query,
      random: random,
    }
  );
};

export const getRecipesByID = async (favourites) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/getRecipesByID",
    {
      favourites: favourites,
    }
  );
};
