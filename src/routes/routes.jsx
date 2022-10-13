import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const Dashboard = lazy(() => import("../pages/Dashboard"));

const PublicRoutes = () => {
  const routes = useRoutes([{ path: "/", element: <Dashboard /> }]);
  return routes;
};

export default PublicRoutes;
