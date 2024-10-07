import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout/Layout";
import PaintingList from "./pages/PaintingList";
import Favorites from "./pages/Favorites";
import PaintingDetails from "./pages/PaintingDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <PaintingList /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "painting/:id", element: <PaintingDetails /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
