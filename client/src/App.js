import { Navigate, useRoutes } from "react-router-dom";

import AccessCheck from "src/components/auth/AccessCheck";
import FAQView from "src/views/faq/FAQView";
import FavouritesView from "src/views/favourites/FavouritesView";
import FeedbackView from "src/views/feedback/FeedbackView";
import HomeView from "src/views/home/HomeView";
import LegalView from "src/views/legal/LegalView";
import LoginCheck from "src/components/auth/LoginCheck";
import NotFoundView from "src/views/error/ErrorView";
import React from "react";
import SearchView from "src/views/search/SearchView";
import SettingsView from "src/views/settings/SettingsView";
import SignUpView from "src/views/signup/SignUpView";
import Styles from "src/components/theme/styles";
import Theme from "src/components/theme";
import { ThemeProvider } from "@material-ui/core";
import VerifyView from "src/views/verify/VerifyView";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Styles />
      {useRoutes([
        {
          path: "app",
          element: <AccessCheck />,
          children: [
            { path: "home/*", element: <HomeView /> },
            { path: "search/*", element: <SearchView /> },
            { path: "favourites/*", element: <FavouritesView /> },
            { path: "settings", element: <SettingsView /> },
            { path: "faq", element: <FAQView /> },
            { path: "feedback", element: <FeedbackView /> },
            { path: "legal", element: <LegalView /> },
            { path: "", element: <Navigate to="/app/home" /> },
            { path: "*", element: <Navigate to="/404" /> },
          ],
        },
        {
          path: "/",
          children: [
            { path: "signup", element: <SignUpView /> },
            { path: "login", element: <LoginCheck /> },
            { path: "legal", element: <LegalView /> },
            { path: "verify/*", element: <VerifyView /> },
            { path: "", element: <LoginCheck /> },
            { path: "*", element: <NotFoundView /> },
          ],
        },
      ])}
    </ThemeProvider>
  );
};

export default App;
