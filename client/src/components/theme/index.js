import { colors, createMuiTheme } from "@material-ui/core";

import typography from "src/components/theme/typography";

const dark = createMuiTheme({
  palette: {
    background: {
      dark: "#1d2021",
      default: "#181a1b",
      paper: "#181a1b",
    },
    primary: {
      main: colors.teal[800],
    },
    secondary: {
      main: colors.teal[800],
    },
    text: {
      primary: "#beb8b0",
      secondary: "#beb8b0",
    },
    type: 'dark',
  },
  typography,
});

const light = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: "#FFF",
      paper: "#FFF",
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
