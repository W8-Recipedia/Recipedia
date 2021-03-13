import Axios from "axios";

Axios.defaults.withCredentials = true;

const tokenType = () => {
  if (localStorage.getItem("usertoken")) {
    return "usertoken";
  } else if (localStorage.getItem("gusertoken")) {
    return "gusertoken";
  } else {
    return null;
  }
};

const getToken = async () => {
  if (tokenType == "usertoken") {
    return localStorage.getItem("usertoken");
  } else if (tokenType == "gusertoken") {
    return localStorage.getItem("gusertoken");
  } else {
    return null;
  }
};

const updateToken = async (token) => {
  if (tokenType == "usertoken") {
    return localStorage.setItem("usertoken", token);
  } else if (tokenType == "gusertoken") {
    return localStorage.setItem("gusertoken", token);
  } else {
    return null;
  }
};

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
    // return "success";
  }
  // else {
  //   return response.data.message;
  // }
  return response;
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
    // return "success";
  }
  // else {
  //   return response.data.message;
  // }
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
  // return response.data.message;
  return response;
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
    // return response.data.message;
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
  // return response.data.message;
  return response;
};

export const resendVerificationEmail = async (email) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/resendverification",
    {
      email: email,
    }
  );
  // return response.data.message;
  return response;
};

export const getUserData = async () => {
  const localtoken = getToken();
  if (localtoken) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/getuserdata",
      {
        headers: {
          "x-access-token": localtoken,
        },
      }
    );
    if (response.data.token) {
      updateToken(response.data.token);
      if (tokenType == "gusertoken") {
        response.data.user.firstname = response.data.user.givenName;
        response.data.user.lastname = response.data.user.familyName;
      }
    }
    return response;
  } else {
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const addToFavourites = async (favourite) => {
  const localtoken = getToken();
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
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const removeFromFavourites = async (favourite) => {
  const localtoken = getToken();
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
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const changeUserInfo = async (firstname, lastname, email) => {
  const localtoken = getToken();
  if (localtoken) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/changeuserinfo",
      { firstname: firstname, lastname: lastname, email: email },
      {
        headers: { "x-access-token": localtoken },
      }
    );
    // if (response.data.message === "emailExists") {
    //   return response.data.message;
    // } else {
    //   updateToken(response.data.token);
    //   return "success";
    // }
    if (response.data.token) {
      updateToken(response.data.token);
    }
    return response;
  } else {
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const changePreferences = async (
  diet,
  allergens,
  height,
  weight,
  activity
) => {
  const localtoken = getToken();
  if (localtoken) {
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
          "x-access-token": localtoken,
        },
      }
    );
    if (response.data.token) {
      updateToken(response.data.token);
    }
    return response;
  } else {
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const changePassword = async (oldpassword, newpassword) => {
  const localtoken = getToken();
  if (localtoken) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/changeuserpassword",
      {
        oldpassword: oldpassword,
        newpassword: newpassword,
      },
      {
        headers: { "x-access-token": localtoken },
      }
    );
    if (response.data.token) {
      updateToken(response.data.token);
      // return "success";
    }
    return response; // response.data.message;
  } else {
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const submitFeeback = async (feedback) => {
  const localtoken = getToken();
  if (localtoken) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/submitfeedback",
      {
        feedback: feedback,
      },
      {
        headers: { "x-access-token": localtoken },
      }
    );
    if (response.data.token) {
      updateToken(response.data.token);
    }
    return response;
  } else {
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const deleteAccount = async () => {
  const localtoken = getToken();
  if (localtoken) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/deleteaccount",
      {
        headers: {
          "x-access-token": localtoken,
        },
      }
    );
    if (response.data.message === "accountDeleted") {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("gusertoken");
    }
    return response; // response.data.message;
  } else {
    return { data: { message: "notLoggedIn" } }; // { data: { loggedIn: false } };
  }
};

export const logOut = () => {
  localStorage.removeItem("usertoken");
  localStorage.removeItem("gusertoken");
};

export default login;
