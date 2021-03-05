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
    localStorage.setItem("token", response.data.token);
    localStorage.removeItem("gtoken");
    return "Success";
  } else {
    return response.data.message;
  }
};

export const changePassword = async (oldpassword, newpassword) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changepassword",
    {
      oldpassword: oldpassword,
      newpassword: newpassword,
    }
  );
  if (response.data.passwordChanged) {
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
  if (response.data.result) {
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/login",
      {
        email: email,
        password: password,
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return "Success";
    } else {
      return response.data.message;
    }
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
  localStorage.setItem("gtoken", token);
  localStorage.removeItem("token");
  if (response.data.message == "noAccount") {
    return response.data.message;
  } else {
    return "Success";
  }
};

export const googleSignUp = async (token, userprofile, password) => {
  if (token) {
    localStorage.setItem("gtoken", token);
    localStorage.removeItem("token");

    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/gsignup",
      {
        user: userprofile,
        password: password,
      }
    );
    if (response.data.message == "yesAccount") {
      localStorage.removeItem("gtoken");
      return response.data.message;
    } else {
      return "Success";
    }
  }
};

export const getUserCredentials = async () => {
  if (localStorage.getItem("gtoken")) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/guserinfo",
      {
        headers: { "x-access-token": localStorage.getItem("gtoken") },
      }
    );
    if (response.data.loggedIn) {
      response.data.user[0].firstname = response.data.user[0].givenName;
      response.data.user[0].lastname = response.data.user[0].familyName;
    }
    return response;
  } else {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/userinfo",
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
    return response;
  }
};

export const userLogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("gtoken");
};

export default userLogin;
