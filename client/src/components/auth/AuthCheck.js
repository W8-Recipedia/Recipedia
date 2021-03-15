import React, { useState } from "react";

import DashboardView from "src/views/dashboard/DashboardView";
import LandingView from "src/views/landing/LandingView";
import LoginView from "src/views/login/LoginView";
import { getUserData } from "src/components/ServerRequests";
import { useNavigate } from "react-router-dom";

export const LoginCheck = () => {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        setIsLoggedIn(true);
        navigate("/app/home");
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

export const AccessCheck = () => {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserData().then((response) => {
      if (response.data.message !== "loggedIn") {
        setIsLoggedIn(false);
        navigate("/");
      } else {
        setIsLoggedIn(true);
      }
    });
  });

  return isloggedIn ? <DashboardView /> : null;
};

export default LoginCheck;
