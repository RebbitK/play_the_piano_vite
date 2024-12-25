import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Login = lazy(() => import("../pages/LoginPage.jsx"))
const Signup = lazy(()=>import ("../pages/SignupPage.jsx"))
const Username = lazy(() =>import ("../pages/FindUsernamePage.jsx"))
const Password = lazy(() =>import("../pages/FindPasswordPage.jsx"))
const UpdatePassword = lazy(() =>import ("../pages/UpdatePasswordPage.jsx"))


const authRouter = () => {
  return [
    {
      path: "login",
      element: (
          <Suspense fallback={Loading}>
            <Login />
          </Suspense>
      )
    },{
    path:"signup",
      element: (
          <Suspense fallback={Loading}>
            <Signup />
          </Suspense>
      )
    },{
    path: "username",
      element: (
          <Suspense fallback={Loading}>
            <Username />
          </Suspense>
      )
    },{
      path: "password",
      element: (
          <Suspense fallback={Loading}>
            <Password />
          </Suspense>
      )
    },{
      path: "update-password",
      element: (
          <Suspense fallback={Loading}>
            <UpdatePassword />
          </Suspense>
      )
    }
  ];
};

export default authRouter;