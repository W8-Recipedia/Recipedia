import Axios from "axios";

Axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/login",
    {
      email,
      password,
    }
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

export const googleLogin = async (user) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/googlelogin",
    {
      user,
    }
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

export const signUp = async (firstname, lastname, email, password) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/signup",
    {
      firstname,
      lastname,
      email,
      password,
    }
  );
  return response;
};

export const googleSignUp = async (gtoken, user) => {
  if (gtoken) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/googlesignup",
      {
        user,
      }
    );
    return response;
  }
};

export const verifyEmail = async (token) => {
  const response = await Axios.get(
    process.env.REACT_APP_SERVER_URL + "/verifyemail",
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response;
};

export const resendVerificationEmail = async (email) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/resendverification",
    {
      email,
    }
  );
  return response;
};

export const getUserData = async () => {
  if (localStorage.getItem("token")) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/getuserdata",
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      if (response.data.google) {
        response.data.user.firstname = response.data.user.givenName;
        response.data.user.lastname = response.data.user.familyName;
      }
    }
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const addToFavourites = async (favourite) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/addtofavourites",
      { favourite },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const removeFromFavourites = async (favourite) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/removefromfavourites",
      { favourite },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const changeUserInfo = async (firstname, lastname, email) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/changeuserinfo",
      { firstname, lastname, email },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const changePreferences = async (
  diet,
  allergens,
  height,
  weight,
  activity,
  age,
  sex,
  minCalories,
  maxCalories
) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/changeuserpreferences",
      {
        diet,
        allergens,
        height,
        weight,
        activity,
        age,
        sex,
        minCalories,
        maxCalories,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const changePassword = async (oldpassword, newpassword) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/changeuserpassword",
      {
        oldpassword,
        newpassword,
      },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const submitFeedback = async (feedback) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/submitfeedback",
      {
        feedback,
      },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const deleteAccount = async () => {
  if (localStorage.getItem("token")) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/deleteaccount",
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    if (response.data.message === "accountDeleted") {
      localStorage.removeItem("token");
    }
    return response;
  } else {
    return { data: { message: "notLoggedIn" } };
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
};

export const getRecipesComplex = async (
  intolerances,
  diet,
  dishtypes,
  cuisines,
  ingredients,
  offset = 0,
  query,
  minCalories,
  maxCalories
) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/getRecipesComplex",
    {
      intolerances,
      diet,
      dishtypes,
      cuisines,
      ingredients,
      offset,
      query,
      minCalories,
      maxCalories,
    }
  );
};

export const getRecipesByID = async (favourites) => {
  return await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/recipes/getRecipesByID",
    {
      favourites,
    }
  );
};

export default login;
