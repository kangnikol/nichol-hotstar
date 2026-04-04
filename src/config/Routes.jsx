import React, { lazy, Suspense } from "react"
import { useRoutes, Navigate } from "react-router-dom"

const Home   = lazy(() => import("../pages/Home"))
const Catalog = lazy(() => import("../pages/Catalog"))
const Detail = lazy(() => import("../pages/detail/Detail"))
const Play   = lazy(() => import("../pages/play/Play"))

const Fallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-[#0B1120]">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
)

const Routes = () => {
  const element = useRoutes([
    { path: "/",                              element: <Home /> },
    { path: "/:category",                     element: <Catalog /> },
    { path: "/:category/:id",                 element: <Detail /> },
    { path: "/:category/search/:keyword",     element: <Catalog /> },
    { path: "/play/:category/:id",            element: <Play /> },
    { path: "*",                              element: <Navigate to="/" replace /> },
  ])

  return <Suspense fallback={<Fallback />}>{element}</Suspense>
}

export default Routes
