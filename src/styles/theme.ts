import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#62edff",
      dark: "#008a9e",
      contrastText: "#ededed",
      main: "#02bacf",
    },
    secondary: {
      main: "#cbda70",
      light: "#ffffa0",
      dark: "#98a941",
      contrastText: "#ededed",
    },
    text: {
      primary: "#ededed",
      secondary: grey[400],
    },
    background: {
      default: grey[800],
      paper: grey[700],
    },
  },
});

export { theme };
