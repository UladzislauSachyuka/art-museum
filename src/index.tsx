import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PaintingList from "./pages/PaintingList";
import Favorites from "./pages/Favorites";
import Details from "./pages/DetailsPage";
import NotFoundPage from "pages/NotFoundPage";
import ErrorBoundaryLayout from "components/ErrorBoundaryLayout";

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
