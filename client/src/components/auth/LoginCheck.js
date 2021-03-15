import React, { useState } from "react";

import LandingView from "src/views/landing/LandingView";
import LoginView from "src/views/login/LoginView";
import { getUserData } from "src/components/ServerRequests";
import { useNavigate } from "react-router-dom";

export const LoginCheck = () => {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        navigate("/app/home");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });

  return !isloggedIn ? (
    window.location.pathname === "/login" ? (
      <LoginView />
    ) : (
      <LandingView />
    )
  ) : null;
};

export default LoginCheck;
