import React, { useState } from "react";

import LandingView from "src/pages/landing";
import LoginView from "src/pages/login";
import { getUserData } from "src/components/ServerRequests";
import { useNavigate } from "react-router-dom";

export const LoginCheck = ({ toggleDarkMode }) => {
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
      <LandingView toggleDarkMode={toggleDarkMode} />
    )
  ) : null;
};

export default LoginCheck;
