import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Garden, { loader as gardenLoader } from "./routes/garden";
import Root from "./routes/root";
import UserProvider from "../context/UserContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </UserProvider>
    ),
    children: [
      {
        path: "gardens/:id",
        element: <Garden />,
        loader: gardenLoader,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(<RouterProvider router={router} />);
