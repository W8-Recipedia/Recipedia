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
    localStorage.removeItem("gusertoken");
    localStorage.setItem("usertoken", response.data.token);
    return "Success";
  } else {
    return response.data.message;
  }
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
  if (response.data.token) {
    localStorage.removeItem("gusertoken");
    localStorage.setItem("usertoken", response.data.token);
    return "Success";
  } else {
    return response.data.err;
  }
};

export const googleLogin = async (token, userprofile) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/glogin",
    {
      userprofile,
    }
  );
  if (response.data.token) {
    localStorage.removeItem("usertoken");
    localStorage.setItem("gusertoken", response.data.token);
    return "Success";
  } else {
    return response.data.message;
  }
};

export const googleSignUp = async (gtoken, userprofile) => {
  if (gtoken) {
    localStorage.removeItem("usertoken");
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/gsignup",
      {
        user: userprofile,
      }
    );
    if (response.data.token) {
      localStorage.setItem("gusertoken", response.data.token);
      return "Success";
    } else {
      return response.data.message;
    }
  }
};

export const getUserInfo = async () => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  if (localtoken) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/getuserinfo",
      {
        headers: {
          "x-access-token": localtoken,
        },
      }
    );
    if (localStorage.getItem("gusertoken")) {
      response.data.user.firstname = response.data.user.givenName;
      response.data.user.lastname = response.data.user.familyName;
    }
    return response;
  } else {
    return { data: { loggedIn: false } };
  }
};

export const getUserPreferences = async () => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  if (localtoken) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/getuserpreferences",
      {
        headers: {
          "x-access-token": localtoken,
        },
      }
    );
    return response;
  } else {
    return { data: { loggedIn: false } };
  }
};

export const getUserFavourites = async () => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  if (localtoken) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/getuserfavourites",
      {
        headers: {
          "x-access-token": localtoken,
        },
      }
    );
    return response;
  } else {
    return { data: { loggedIn: false } };
  }
};

export const addToFavourites = async (favourite) => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  if (localtoken) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/addtofavourites",
      { favourite: favourite },
      {
        headers: {
          "x-access-token": localtoken,
        },
      }
    );
    return response;
  } else {
    return { data: { loggedIn: false } };
  }
};

export const removeFromFavourites = async (favourite) => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  if (localtoken) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/removefromfavourites",
      { favourite: favourite },
      {
        headers: {
          "x-access-token": localtoken,
        },
      }
    );
    return response;
  } else {
    return { data: { loggedIn: false } };
  }
};

export const changeUserInfo = async (firstname, lastname, email) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changeuserinfo",
    { firstname: firstname, lastname: lastname, email: email },
    {
      headers: { "x-access-token": localStorage.getItem("usertoken") },
    }
  );
  if (response.data.message === "emailExists") {
    return response.data.message;
  } else {
    localStorage.setItem("usertoken", response.data.token);

    return "Success";
  }
};

export const changePreferences = async (diet, allergens, height, weight, activity) => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changepreferences",
    {
      diet: diet,
      allergens: allergens,
      height: height,
      weight: weight,
      activity: activity,
    },
    {
      headers: {
        "x-access-token": localtoken,
      },
    }
  );
  return response;
};

export const changePassword = async (oldpassword, newpassword) => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changepassword",
    {
      oldpassword: oldpassword,
      newpassword: newpassword,
    },
    {
      headers: { "x-access-token": localtoken },
    }
  );
  if (response.data.passwordChanged) {
    localStorage.getItem("usertoken")
      ? localStorage.setItem("usertoken", response.data.token)
      : localStorage.setItem("gusertoken", response.data.token);
    return "Success";
  } else {
    return response.data.message;
  }
};

export const submitFeeback = async (feedback) => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/submitfeedback",
    {
      feedback: feedback,
    },
    {
      headers: { "x-access-token": localtoken },
    }
  );
  return response;
};

export const deleteAccount = async () => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));

  const response = await Axios.get(
    process.env.REACT_APP_SERVER_URL + "/deleteaccount",
    {
      headers: {
        "x-access-token": localtoken,
      },
    }
  );
  if (response.data.message === "success") {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("gusertoken");
  }
  return response.data.message;
};

export const logOut = () => {
  localStorage.removeItem("usertoken");
  localStorage.removeItem("gusertoken");
};

export default login;
