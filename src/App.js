import React, { Suspense } from "react";
import PublicRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<ScaleLoader />}>
        <PublicRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
