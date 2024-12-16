import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRouter from "./AuthRouter.jsx";

const Main = lazy(() => import("../pages/MainPage.jsx"));
const Loading = <div>Loading....</div>;

const root = createBrowserRouter([
  {
    path: "",
    element: (
        <Suspense fallback={Loading}>
          <Main />
        </Suspense>
    ),
  },
  {
    path: "/auth",
    children: authRouter()
  },
]);

export default root;
