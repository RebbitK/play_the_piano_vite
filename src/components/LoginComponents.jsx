import {useState} from "react";
import useCustomLogin from "../hooks/LoginHook.jsx";
import {useNavigate} from "react-router-dom";

const initState = {username: '', pw: ''};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({...initState});
  const {doLogin, moveToPath} = useCustomLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({...loginParam});
  };

  const handleClickLogin = (e) => {
    doLogin(loginParam)
    .then(data => {
      moveToPath('/')
    });
  };

  const handleClickSignUp = () => {
    navigate('/auth/signup')
  };

  return (
      <div
          className="max-w-xl mx-auto my-10 p-6 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <div className="mb-4 px-6">
          <input
              className="w-full p-2 border border-gray-300 rounded"
              name="username"
              type="text"
              value={loginParam.username}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
          />
        </div>
        <div className="mb-2 px-6">
          <input
              className="w-full p-2 border border-gray-300 rounded"
              name="pw"
              type="password"
              value={loginParam.pw}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="text-left px-6 mb-4">
          <a href="/auth/username" className="text-purple-600 hover:underline">
            아이디 찾기
          </a>
          <span className="mx-2 text-gray-500">/</span>
          <a href="/auth/password" className="text-purple-600 hover:underline">
            비밀번호 찾기
          </a>
        </div>

        <div className="flex justify-between items-center px-6 mb-4">
          <button
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={handleClickLogin}
          >
            로그인
          </button>
        </div>
        <div className="flex px-6 justify-between items-center mb-4">
          <button
              className="w-full py-2 bg-gray-200 text-gray-700 rounded "
              onClick={handleClickSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
  );
};

export default LoginComponent;
