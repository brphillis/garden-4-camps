import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Garden, { loader as gardenLoader } from "./routes/garden";
import Root from "./routes/root";
import UserProvider from "../context/UserContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../theme";
import AddGarden, { loader as editGardenLoader } from "./routes/addgarden";

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
      {
        path: "addgarden",
        element: <AddGarden />,
      },
      {
        path: "editGarden/:id",
        element: <AddGarden />,
        loader: editGardenLoader,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(<RouterProvider router={router} />);
