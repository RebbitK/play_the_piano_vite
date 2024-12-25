import { useDispatch, useSelector } from "react-redux"
import { Navigate, createSearchParams, useNavigate } from "react-router-dom"
import { loginPostAsync, logout } from "../slices/loginSlice"

const LoginHook = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const exceptionHandle = (ex) => {
    const errorMsg = ex.response.data.error

    const errorStr = createSearchParams({ error: errorMsg }).toString()

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인 해야만 합니다.")
      navigate({ pathname: "/auth/login", search: errorStr })

      return
    }

    if (ex.response.data.error === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
      navigate({ pathname: "/auth/login", search: errorStr })
      return;
    }
  }

  const loginState = useSelector((state) => state.loginSlice)

  const isLogin = !!loginState.username

  const doLogin = async (loginParam) => {


    const action = await dispatch(loginPostAsync(loginParam))


    return action.payload
  }

  const doLogout = () => {

    dispatch(logout())
  }

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true })
  }

  const moveToLogin = () => {
    navigate({ pathname: "/auth/login" }, { replace: true })
  }
  const moveToLoginReturn = () => {
    return <Navigate replace to="/auth/login" />
  }

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
  }
}

export default LoginHook