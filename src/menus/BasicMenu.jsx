import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {getCookie} from "../util/CookieUtil.jsx"
import banner from "../img/Play the piano.png"

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice)
  const jwt = getCookie("accessToken")
  const isLoggedIn = !!jwt

  return (
      <>
        <div className="w-full bg-cover bg-center" style={{
          backgroundImage: `url(${banner})`,
          height: 'calc(100vw * 1 / 16)',
        }}>
          <div
              className="flex justify-center items-center h-full bg-white bg-opacity-40"></div>
        </div>

        <nav
            className="flex items-center justify-between bg-orange-500 px-6 py-4">
          <ul className="flex space-x-6 text-white font-bold text-lg">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
          </ul>

          <div>
            <Link
                to="/auth/login"
                className="bg-white text-orange-500 px-4 py-2 rounded font-semibold"
            >
              Login
            </Link>
          </div>
        </nav>
      </>
  )
}

export default BasicMenu