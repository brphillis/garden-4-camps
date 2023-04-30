import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gardens, { loader as gardenLoader } from "./routes/gardens";
import Root from "./routes/root";
import UserProvider from "../context/UserContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../theme";
import GardenEditor, { loader as editGardenLoader } from "./routes/editgarden";

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
        element: <Gardens />,
        loader: gardenLoader,
      },
      {
        path: "addgarden",
        element: <GardenEditor />,
      },
      {
        path: "editGarden/:id",
        element: <GardenEditor />,
        loader: editGardenLoader,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(<RouterProvider router={router} />);
