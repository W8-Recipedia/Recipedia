import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getUserInfo } from "src/components/auth/UserAuth";
import LandingView from "src/views/landing/LandingView";
import LoginView from "src/views/login/LoginView";
import DashboardView from "src/views/dashboard/DashboardView";

export const LoginCheck = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserInfo().then((authResponse) => {
      setIsLoggedIn(authResponse.data.loggedIn);
      if (authResponse.data.loggedIn) {
        navigate("/app/home");
      }
    });
  });
  return isloggedIn == false ? (
    pathname == "/login" ? (
      <LoginView />
    ) : (
      <LandingView />
    )
  ) : null;
};

export const AccessCheck = () => {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserInfo().then((authResponse) => {
      setIsLoggedIn(authResponse.data.loggedIn);
      if (!authResponse.data.loggedIn) {
        navigate("/");
      }
    });
  });
  return isloggedIn ? <DashboardView /> : null;
};

export default LoginCheck;
