import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { getUserCredentials } from "src/components/auth/UserAuth";
import LandingView from "src/views/landing/LandingView";
import LoginView from "src/views/login/LoginView";

const LoginCheck = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserCredentials().then((authResponse) => {
      console.log(authResponse);
      if (authResponse.data.loggedIn) {
        navigate("/app/home");
      } else {
        setIsLoggedIn("false");
      }
    });
  });
  return isloggedIn == "false" ? (pathname == "/" ? <LandingView /> : <LoginView/> ) : <CircularProgress/>;
};

export default LoginCheck;
