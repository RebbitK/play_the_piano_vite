import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {getCookie} from "../util/CookieUtil.jsx";

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const jwt = getCookie("accessToken");
  const isLoggedIn = !!jwt;
  const isSeller = isLoggedIn && jwtDecode(jwt).role === "SELLER";
  const isAdmin = isLoggedIn && jwtDecode(jwt).role === "ADMIN";

  return (
      <nav className="flex items-center justify-between bg-orange-500 px-6 py-4">
        {/* 왼쪽 메뉴 */}
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

        {/* 오른쪽 로그인 버튼 */}
        <div>
          <Link
              to="/auth/login"
              className="bg-white text-orange-500 px-4 py-2 rounded font-semibold"
          >
            Login
          </Link>
        </div>
      </nav>
  );
};


export default BasicMenu;