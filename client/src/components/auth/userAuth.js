import Axios from "axios";

Axios.defaults.withCredentials = true;

export const userLogin = async (email, password) => {
  const response = await Axios.post("http://localhost:3001/login", {
    email: email,
    password: password,
  });
  if (response.data.auth) {
    console.log(response);
    localStorage.setItem("token", response.data.token);
    return "Success";
  } else {
    return response.data.message;
  }
};

export const userRegister = (firstname, lastname, email, password) => {
  Axios.post("http://localhost:3001/register", {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  });
};

export const getUserCredentials = async () => {
  const response = await Axios.get("http://localhost:3001/userinfo", {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  return response;
};

export const userLogOut = () => {
  localStorage.removeItem("token");
};

export default userLogin;
