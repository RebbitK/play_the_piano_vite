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
        <a href="/" className="w-full">
          <div
              className="w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${banner})`,
                height: 'calc(100vw * 1 / 16)',
              }}
          >
            <div
                className="flex justify-center items-center h-full bg-white bg-opacity-40"></div>
          </div>
        </a>

        <nav
            className="flex items-center justify-between bg-pink-200 px-6 py-6">
          <ul className="flex space-x-16 items-center">
            <li className="text-white px-4 py-2 text-xl tracking-wider ml-96">
              <Link to="/"
                    className="text-white text-3xl tracking-wider font-bold hover:text-yellow-200"
                    style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                학원안내
              </Link>
            </li>
            <li className="text-white px-4 py-2 text-xl tracking-wider">
              <Link to="/about"
                    className="text-white text-3xl tracking-wider font-bold hover:text-yellow-200"
                    style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                오시는길
              </Link>
            </li>
            <li className="text-white px-4 py-2 text-xl tracking-wider">
              <Link to="/services"
                    className="text-white text-3xl tracking-wider font-bold hover:text-yellow-200"
                    style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                공지사항
              </Link>
            </li>
            <li className="text-white px-4 py-2 text-xl tracking-wider">
              <Link to="/services"
                    className="text-white text-3xl tracking-wider font-bold hover:text-yellow-200"
                    style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
                이벤트
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
              <div>
                <Link
                    to="/auth/login"
                    className="bg-white text-orange-500 text-xl px-20 py-4 rounded font-semibold"
                >
                  Logout
                </Link>
              </div>

          ) : (
              <div>
                <Link
                    to="/auth/login"
                    className="bg-white text-orange-500 text-xl px-20 py-4 rounded font-semibold"
                >
                  Login
                </Link>
              </div>
          )}
        </nav>
      </>
  );

}

export default BasicMenu