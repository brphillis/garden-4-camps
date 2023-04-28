import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";

import { App } from "./App";
import SiteLayout from "../components/Layout/SiteLayout";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ThemeProvider theme={theme}>
    <SiteLayout>
      <App />
    </SiteLayout>
  </ThemeProvider>
);
