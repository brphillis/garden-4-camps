import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0320fc",
    },
    secondary: {
      main: "#11cb5f",
    },
    warning: {
      main: "#f53527",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "montserrat",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
});
