import React, {useState} from 'react';
import {checkNickname, checkUsername, signup} from '../api/UserApi.jsx';
import {useNavigate} from 'react-router-dom';

const SignupComponent = () => {
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('')
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isUsernameChecked) {
        alert("아이디 중복 확인을 먼저 해주세요.");
        return;
      }
      if (!isNicknameChecked) {
        alert("닉네임 중복 확인을 먼저 해주세요.");
        return;
      }
      const response = await signup({
        username: tempUsername,
        password,
        checkPassword,
        email: "test",
        nickname: tempNickname,
        consent
      });
      alert("회원가입 성공")
      navigate('/auth/login');

    } catch (error) {
    }
  };

  const handleCheckUsername = async (e) => {
    try {
      const response = await checkUsername({username: tempUsername});
      if (response.data === true) {
        setUsername(tempUsername)
        setIsUsernameChecked(true)
        alert("사용가능한 아이디 입니다.")
      }
    } catch (error) {
      setUsername("")
      setIsUsernameChecked(false)
      throw error;
    }
  };

  const handleCheckNickname = async (e) => {
    try {
      const response = await checkNickname({nickname: tempNickname});
      if (response.data === true) {
        setNickname(tempNickname)
        setIsNicknameChecked(true)
        alert("사용가능한 아이디 입니다.")
      }
    } catch (error) {
      setNickname("")
      setIsNicknameChecked(false)
      throw error;
    }
  };

  return (
      <div
          className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">
              아이디*
            </label>
            <input
                id="username"
                type="text"
                placeholder="아이디를 입력해주세요"
                value={tempUsername}
                onChange={(e) => {
                  setTempUsername(e.target.value);
                  setIsUsernameChecked(false)
                }}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button
                type="button"
                onClick={handleCheckUsername}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              중복 확인
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">
              닉네임*
            </label>
            <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={tempNickname}
                onChange={(e) => {
                  setTempNickname(e.target.value);
                  setIsNicknameChecked(false)
                }}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button
                type="button"
                onClick={handleCheckNickname}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              중복 확인
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              비밀번호*
            </label>
            <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              비밀번호확인*
            </label>
            <input
                id="checkPassword"
                type="checkPassword"
                placeholder="비밀번호를 재입력해주세요"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">(선택)이벤트성 문자 발송 수신 동의</label>
            <div>
              <input
                  type="checkbox"
                  id="eventSubscription"
                  name="eventSubscription"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mr-2"
              />
              <label htmlFor="eventSubscription" className="mr-4">
                동의합니다.
              </label>
              <p className="text-gray-600">
                저희는 귀하에게 이벤트, 프로모션 소식, 할인 혜택 등의 정보를 제공하기 위해 문자 메시지를 발송하고자 합니다.
                귀하의 개인 정보를 보호하며, 귀하가 제공하는 정보는 오직 이벤트 및 프로모션 소식 발송에만 사용됩니다.
              </p>
            </div>
          </div>
          <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            가입하기
          </button>
        </form>
      </div>
  );
};

export default SignupComponent;
