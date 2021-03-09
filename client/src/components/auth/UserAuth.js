import Axios from "axios";

Axios.defaults.withCredentials = true;

export const userLogin = async (email, password) => {
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

export const userSignUp = async (firstname, lastname, email, password) => {
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

export const googleSignUp = async (gtoken, userprofile, password) => {
  if (gtoken) {
    localStorage.removeItem("usertoken");
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/gsignup",
      {
        user: userprofile,
        password: password,
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

export const changePassword = async (oldpassword, newpassword) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changepassword",
    {
      oldpassword: oldpassword,
      newpassword: newpassword,
    },
    {
      headers: { "x-access-token": localStorage.getItem("gusertoken") },
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

export const getUserCredentials = async () => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));
  if (localtoken) {
    const response = localStorage.getItem("usertoken")
      ? await Axios.get(process.env.REACT_APP_SERVER_URL + "/userinfo", {
          headers: {
            "x-access-token": localStorage.getItem("usertoken"),
          },
        })
      : await Axios.get(process.env.REACT_APP_SERVER_URL + "/userinfo", {
          headers: {
            "x-access-token": localStorage.getItem("gusertoken"),
          },
        });
    if (localStorage.getItem("gusertoken")) {
      response.data.user.firstname = response.data.user.givenName;
      response.data.user.lastname = response.data.user.familyName;
    }
    return response;
  } else {
    return { data: { loggedIn: false } };
  }
};
export const changePreferences = async (diets, allergens, height, weight) => {
  var localtoken;
  localStorage.getItem("usertoken")
    ? (localtoken = localStorage.getItem("usertoken"))
    : (localtoken = localStorage.getItem("gusertoken"));

  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changepreferences",
    {
      diets: diets,
      allergens: allergens,
      height: height,
      weight: weight,
    },
    {
      headers: {
        "x-access-token": localtoken,
      },
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
  if (response.data.message == "success") {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("gusertoken");
  }
  return response.data.message;
};

export const changeDetails = async (firstname, lastname, email) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changedetails",
    { firstname: firstname, lastname: lastname, email: email },
    {
      headers: { "x-access-token": localStorage.getItem("usertoken") },
    }
  );
  if (response.data.message == "emailExists") {
    return response.data.message;
  } else {
    localStorage.setItem("usertoken", response.data.token);

    return "Success";
  }
};

export const userLogOut = () => {
  localStorage.removeItem("usertoken");
  localStorage.removeItem("gusertoken");
};

export default userLogin;
