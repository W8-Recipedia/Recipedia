import Axios from "axios";

Axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/login",
    {
      email: email,
      password: password,
    }
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

export const googleLogin = async (userprofile) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/googlelogin",
    {
      userprofile: userprofile,
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
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    }
  );
  return response;
};

export const googleSignUp = async (gtoken, userprofile) => {
  if (gtoken) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/googlesignup",
      {
        user: userprofile,
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
      email: email,
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
      { favourite: favourite },
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
      { favourite: favourite },
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
      { firstname: firstname, lastname: lastname, email: email },
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
  activity
) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/changeuserpreferences",
      {
        diet: diet,
        allergens: allergens,
        height: height,
        weight: weight,
        activity: activity,
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
        oldpassword: oldpassword,
        newpassword: newpassword,
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

export const submitFeeback = async (feedback) => {
  if (localStorage.getItem("token")) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/submitfeedback",
      {
        feedback: feedback,
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
      favourites: favourites,
    }
  );
};

export default login;
