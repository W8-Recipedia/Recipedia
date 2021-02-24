import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getUserCredentials } from "src/components/auth/UserAuth";
import LandingView from "src/views/landing/LandingView";
import LoginView from "src/views/login/LoginView";
import DashboardLayout from "src/dashboard/DashboardLayout";

export const LoginCheck = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserCredentials().then((authResponse) => {
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
    getUserCredentials().then((authResponse) => {
      setIsLoggedIn(authResponse.data.loggedIn);
      if (!authResponse.data.loggedIn) {
        navigate("/");
      }
    });
  });
  return isloggedIn ? <DashboardLayout /> : null;
};

export default LoginCheck;
