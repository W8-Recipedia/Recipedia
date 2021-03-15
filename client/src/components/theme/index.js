import { colors, createMuiTheme } from "@material-ui/core";

import darkshadows from "src/components/theme/darkshadows";
import shadows from "src/components/theme/shadows";
import typography from "src/components/theme/typography";

const dark = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      dark: colors.common.black,
      default: "#2b2b2b",
      paper: "#2b2b2b",
    },
    primary: {
      main: colors.indigo[400],
    },
    secondary: {
      main: colors.indigo[400],
    },
    text: {
      primary: colors.blueGrey[50],
      secondary: colors.blueGrey[200],
    },
  },
  darkshadows,
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
      main: colors.indigo[500],
    },
    secondary: {
      main: colors.indigo[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows,
  typography,
});

const Theme = { dark, light };

export default Theme;
