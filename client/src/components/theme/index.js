import { colors, createMuiTheme } from "@material-ui/core";

import typography from "src/components/theme/typography";

const dark = createMuiTheme({
  palette: {
    background: {
      dark: colors.common.black,
      default: "#2b2b2b",
      paper: "#2b2b2b",
    },
    primary: {
      main: colors.teal[800],
    },
    secondary: {
      main: colors.teal[800],
    },
    text: {
      primary: colors.blueGrey[50],
      secondary: colors.blueGrey[200],
    },
  },
  typography,
});

const light = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.teal[900],
    },
    secondary: {
      main: colors.teal[900],
    },
    text: {
      primary: colors.blueGrey[800],
      secondary: colors.blueGrey[800],
    },
  },
  typography,
});

const Theme = { dark, light };

export default Theme;
