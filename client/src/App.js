import { Navigate, useRoutes } from "react-router-dom";
import React, { useState } from "react";

import AccessCheck from "src/components/auth/AccessCheck";
import FAQView from "src/pages/faq";
import FavouritesView from "src/pages/favourites";
import FeedbackView from "src/pages/feedback";
import HomeView from "src/pages/home";
import LegalView from "src/pages/legal";
import LoginCheck from "src/components/auth/LoginCheck";
import NotFoundView from "src/pages/error";
import SearchView from "src/pages/search";
import SettingsView from "src/pages/settings";
import SignUpView from "src/pages/signup";
import { SnackbarProvider } from "notistack";
import Styles from "src/components/theme/styles";
import Theme from "src/components/theme";
import { ThemeProvider } from "@material-ui/core";
import VerifyView from "src/pages/verify";

const App = () => {
  const [theme, setTheme] = useState(Theme.light);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} dense>
        <Styles />
        {useRoutes([
          {
            path: "app",
            element: (
              <AccessCheck
                toggleDarkMode={() => {
                  theme === Theme.light
                    ? setTheme(Theme.dark)
                    : setTheme(Theme.light);
                }}
              />
            ),
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
              { path: "faq", element: <FAQView /> },
              { path: "verify/*", element: <VerifyView /> },
              { path: "", element: <LoginCheck /> },
              { path: "*", element: <NotFoundView /> },
            ],
          },
        ])}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
