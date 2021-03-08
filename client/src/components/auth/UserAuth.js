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

export const changePassword = async (oldpassword, newpassword) => {
  const response = await Axios.post(
    process.env.REACT_APP_SERVER_URL + "/changepassword",
    {
      oldpassword: oldpassword,
      newpassword: newpassword,
    }
  );
  if (response.data.passwordChanged) {
    if (localStorage.getItem("usertoken")) {
      localStorage.setItem("usertoken", response.data.token);
    } else {
      localStorage.setItem("gusertoken", response.data.token);
    }
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
      localStorage.removeItem("gusertoken");
      localStorage.setItem("usertoken", response.data.token);
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
  localStorage.removeItem("usertoken");
  localStorage.setItem("gusertoken", response.data.token);
  if (response.data.message == "noAccount") {
    return response.data.message;
  } else {
    return "Success";
  }
};

export const googleSignUp = async (token, userprofile, password) => {
  if (token) {
    localStorage.removeItem("usertoken");
    const response = await Axios.post(
      process.env.REACT_APP_SERVER_URL + "/gsignup",
      {
        user: userprofile,
        password: password,
      }
    );
    if (response.data.message == "yesAccount") {
      localStorage.removeItem("gusertoken");
      return response.data.message;
    } else {
      localStorage.setItem("gusertoken", response.data.token);
      return "Success";
    }
  }
};

export const getUserCredentials = async () => {
  if (localStorage.getItem("gusertoken")) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/userinfo",
      {
        headers: { "x-access-token": localStorage.getItem("gusertoken") },
      }
    );
    if (response.data.loggedIn) {
      response.data.user.firstname = response.data.user.givenName;
      response.data.user.lastname = response.data.user.familyName;
    }
    return response;
  } else if (localStorage.getItem("usertoken")) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/userinfo",
      {
        headers: { "x-access-token": localStorage.getItem("usertoken") },
      }
    );
    return response;
  } else {
    return { data: { loggedIn: false } };
  }
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

export const deleteAccount = async () => {
  if (localStorage.getItem("usertoken")) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/deleteaccount",
      {
        headers: { "x-access-token": localStorage.getItem("usertoken") },
      }
    );
    if (response.data.message == "success") {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("gusertoken");
    }
    return response.data.message;
  } else if (localStorage.getItem("gusertoken")) {
    const response = await Axios.get(
      process.env.REACT_APP_SERVER_URL + "/deleteaccount",
      {
        headers: { "x-access-token": localStorage.getItem("gusertoken") },
      }
    );
    if (response.data.message == "success") {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("gusertoken");
    }
    return response.data.message;
  }
};

export const userLogOut = () => {
  localStorage.removeItem("usertoken");
  localStorage.removeItem("gusertoken");
};

export default userLogin;
