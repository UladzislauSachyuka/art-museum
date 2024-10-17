import "./index.css";

import ErrorBoundaryLayout from "components/ErrorBoundaryLayout";
import NotFoundPage from "pages/NotFoundPage";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Details from "./pages/DetailsPage";
import Favorites from "./pages/Favorites";
import PaintingList from "./pages/PaintingList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundaryLayout />,
    children: [
      { path: "/", element: <PaintingList /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "painting/:id", element: <Details /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
