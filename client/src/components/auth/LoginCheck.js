import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getUserCredentials } from "src/components/auth/UserAuth";
import LandingView from "src/views/landing/LandingView";
import LoginView from "src/views/login/LoginView";
import DashboardLayout from "src/dashboard/DashboardLayout";


const LoginCheck = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const [isloggedIn, setIsLoggedIn] = useState(() => {
    getUserCredentials().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        navigate("/app/home");
      }
      else {
        setIsLoggedIn("false");
      }
    });
  });
  return isloggedIn == "false" ? (pathname == "/login" ? <LoginView/>: <LandingView />  ) : null;
};

export default LoginCheck;
