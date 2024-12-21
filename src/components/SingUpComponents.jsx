import React, {useState} from 'react';
import {
  checkEmail,
  checkNickname,
  checkUsername,
  signup, verificationEmail
} from '../api/UserApi.jsx';
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

const SignupComponent = () => {
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [tempEmail, setTempEmail] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isUsernameChecked) {
        await Swal.fire({
          title: '아이디 중복 확인',
          text: '아이디 중복 확인을 먼저 해주세요.',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#3085d6',
          background: '#f4f4f9',
        });
        return;
      }

      if (!isNicknameChecked) {
        await Swal.fire({
          title: '닉네임 중복 확인',
          text: '닉네임 중복 확인을 먼저 해주세요.',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#3085d6',
          background: '#f4f4f9',
        });
        return;
      }

      if (!isEmailChecked) {
        await Swal.fire({
          title: '이메일 인증 확인',
          text: '이메일 인증을 확인해 주세요.',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#3085d6',
          background: '#f4f4f9',
        });
        return;
      }
      const response = await signup({
        username,
        password,
        checkPassword,
        email,
        nickname,
        consent
      });
      await Swal.fire({
        title: '회원가입 성공!',
        text: '회원가입이 완료되었습니다.',
        icon: 'success',
        confirmButtonText: '로그인 페이지로 이동',
        confirmButtonColor: '#3085d6',
      });
      navigate('/auth/login');

    } catch (error) {
      await Swal.fire({
        title: '오류 발생',
        text: '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleCheckUsername = async (e) => {
    try {
      const response = await checkUsername({username: tempUsername});
      if (response.data === true) {
        setUsername(tempUsername)
        setIsUsernameChecked(true)
        await Swal.fire({
          title: '사용 가능한 아이디',
          text: '사용 가능한 아이디입니다.',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#3085d6',
        });
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
        await Swal.fire({
          title: '사용 가능한 닉네임',
          text: '사용 가능한 닉네임입니다.',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#3085d6',
        });
      }
    } catch (error) {
      setNickname("")
      setIsNicknameChecked(false)
      throw error;
    }
  };

  const handleCheckEmail = async (e) => {
    if (isRequesting) {
      await Swal.fire('잠시만 기다려주세요', '인증 요청이 진행 중입니다.', 'info');
      return;
    }

    try {
      setIsRequesting(true);

      const response = await checkEmail({ email: tempEmail });
      if (response.data === true) {
        let codeValid = false;
        while (!codeValid) {
          const result = await Swal.fire({
            title: '인증번호 입력',
            input: 'text',
            inputPlaceholder: '인증번호를 입력하세요',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            inputValidator: (value) => {
              if (!value) {
                return '인증번호를 입력해주세요';
              }
            },
          });

          if (result.isDismissed) {
            await Swal.fire('취소됨', '이메일 인증을 취소하였습니다.', 'info');
            setIsRequesting(false);
            return;
          }

          const code = result.value;

          const verificationResponse = await verificationEmail({ email: tempEmail, code });

          if (verificationResponse.success) {
            await Swal.fire('인증 성공!', '이메일 인증이 완료되었습니다.', 'success');
            setEmail(tempEmail);
            setIsEmailChecked(true);
            codeValid = true;
          } else {
            const errorMessage = verificationResponse.data?.msg || '인증 중 오류가 발생하였습니다.';
            await Swal.fire('인증 실패!', errorMessage, 'error');
          }
        }
      }
    } catch (error) {
      setEmail('');
      setIsEmailChecked(false);
      throw error;
    } finally {
      setIsRequesting(false);
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
            <label htmlFor="username" className="block font-bold mb-2">
              이메일*
            </label>
            <input
                id="email"
                type="text"
                placeholder="이메일를 입력해주세요"
                value={tempEmail}
                onChange={(e) => {
                  setTempEmail(e.target.value);
                  setIsEmailChecked(false)
                }}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button
                type="button"
                onClick={handleCheckEmail}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              이메일 인증
            </button>
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
