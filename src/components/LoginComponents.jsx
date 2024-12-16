import { useState } from "react";
import useCustomLogin from "../hooks/LoginHook.jsx";
import { useNavigate, Link } from "react-router-dom";

const initState = { username: '', pw: '' };

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin, moveToPath } = useCustomLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    doLogin(loginParam)
    .then(data => {
      console.log(data);
      if (data.error) {
        alert("아이디와 패스워드를 다시 확인하세요");
      } else {
        alert("로그인 성공");
        moveToPath('/');
      }
    });
  };

  const handleClickSignUp = () => {
    navigate('/auth/signup');
  };

  return (
      <div className="max-w-xl mx-auto my-10 p-6 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <div className="mb-4 px-6">
          <div>                                                                                                                                            </div>
          <input
              className="w-full p-2 border border-gray-300 rounded"
              name="username"
              type="text"
              value={loginParam.username}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
          />
        </div>
        <div className="mb-4 px-6 ">
          <input
              className="w-full p-2 border border-gray-300 rounded"
              name="pw"
              type="password"
              value={loginParam.pw}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
          />
        </div>

        <div className="flex justify-between items-center  px-6 mb-4">
          <button
              className="w-full py-2  bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={handleClickLogin}
          >
            로그인
          </button>
        </div>
        <div className="flex px-6 justify-between  items-center mb-4">
          <button
              className="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-purple-700"
              onClick={handleClickSignUp}
          >
            회원가입
          </button>
        </div>
      </div>

  );
};

export default LoginComponent;