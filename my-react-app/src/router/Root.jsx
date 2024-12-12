import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Main = lazy(() => import("../pages/MainPage.jsx"));
const Loading = <div>Loading....</div>; // 로딩 중 표시

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Suspense fallback={Loading}>
          <Main />
        </Suspense>
    ),
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
