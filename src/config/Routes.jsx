import React from "react"
import { useRoutes, Navigate } from "react-router-dom"

import Home from "../pages/Home"
import Catalog from "../pages/Catalog"
import Detail from "../pages/detail/Detail"

const Routes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:category",
      element: <Catalog />,
    },
    {
      path: "/:category/:id",
      element: <Detail />,
    },
    {
      path: "/:category/search/:keyword",
      element: <Catalog />,
    },
    // Fallback/Redirect
    {
      path: "*",
      element: <Navigate to="/" replace />,
    }
  ])

  return element
}

export default Routes
