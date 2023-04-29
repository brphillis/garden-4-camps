import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Garden, { loader as gardenLoader } from "./routes/garden";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
