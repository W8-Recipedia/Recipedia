import React, { useState } from "react";

import DashboardView from "src/views/dashboard/DashboardView";
import { getUserData } from "src/components/ServerRequests";
import { useNavigate } from "react-router-dom";

export const AccessCheck = ({ toggleDarkMode }) => {
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

  return isloggedIn ? <DashboardView toggleDarkMode={toggleDarkMode} /> : null;
};

export default AccessCheck;
