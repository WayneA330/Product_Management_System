import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Example = lazy(() => import("../pages/Example"));

const PublicRoutes = () => {
  const routes = useRoutes([{ path: "/", element: <Example /> }]);

  return routes;
};

export default PublicRoutes;
