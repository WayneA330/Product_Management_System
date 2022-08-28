import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const PublicRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return routes;
};

export default PublicRoutes;
