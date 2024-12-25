import React, {useState} from 'react';
import {
  checkEmail,
  checkNickname,
  checkUsername,
  signup,
  verificationEmail
} from '../api/UserApi.jsx';
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import showSwal from "../util/ShowSwalUtil.jsx"
import {useInputValidationHook} from "../hooks/useInputValidationHook.jsx";

const SignupComponent = () => {
  const [isUsernameChecked, setIsUsernameChecked] = useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [checkPassword, setCheckPassword] = useState('')
  const [isEmailChecked, setIsEmailChecked] = useState(false)
  const [consent, setConsent] = useState(false)
  const navigate = useNavigate()
  const usernameValidation = (value) => /^[a-z0-9]{4,20}$/.test(value)
  const {value: username, setValue: setUsername, validate: validateUsername} =
      useInputValidationHook(usernameValidation,
          '아이디는 영문 소문자와 숫자 4~12자리로 설정해 주세요.')

  const nicknameValidation = (value) => /^[가-힣a-zA-Z0-9]{2,10}$/.test(value)
  const {value: nickname, setValue: setNickname, validate: validateNickname} =
      useInputValidationHook(nicknameValidation,
          '닉네임은 특수문자를 포함하지 않은 2~10글자로 설정해 주세요.')

  const emailValidation = (value) => /^(?!.*\.\.)[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      value)
  const {value: email, setValue: setEmail, validate: validateEmail} =
      useInputValidationHook(emailValidation, '올바른 이메일 형식을 입력해주세요.')

  const passwordValidation = (value) => /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}/.test(
      value)
  const {value: password, setValue: setPassword, validate: validatePassword} =
      useInputValidationHook(passwordValidation,
          '비밀번호는 영어와 숫자가 각각 1개 이상 포함되어있는 8자 ~ 20자로 입력해주세요.')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isUsernameChecked) {
        await showSwal('아이디 중복 확인', '아이디 중복 확인을 먼저 해주세요.', 'warning')
        return
      }

      if (!isNicknameChecked) {
        await showSwal('닉네임 중복 확인', '닉네임 중복 확인을 먼저 해주세요.', 'warning')
        return
      }

      if (!isEmailChecked) {
        await showSwal('이메일 인증 확인', '이메일 인증을 확인해 주세요.', 'warning')
        return
      }
      await validatePassword()
      if (password !== checkPassword) {
        await showSwal('비밀번호 불일치', '두 비밀번호가 일치하지 않습니다.', 'error')
        return
      }

      const response = await signup({
        username,
        password,
        checkPassword,
        email,
        nickname,
        consent
      })
      await showSwal('회원가입 성공!', '회원가입이 완료되었습니다.', 'success')
      navigate('/auth/login')
    } catch (error) {
      await showSwal('오류 발생', '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.', 'error')
    }
  }

  const handleCheckUsername = async (e) => {
    try {
      await validateUsername()
      const response = await checkUsername({username})
      if (response.data === true) {
        setIsUsernameChecked(true)
        await showSwal('사용 가능한 아이디', '사용 가능한 아이디입니다.', 'success')
      }
    } catch (error) {
      setUsername("")
      setIsUsernameChecked(false)
      throw error
    }
  }

  const handleCheckNickname = async (e) => {
    try {
      await validateNickname()
      const response = await checkNickname({nickname})
      if (response.data === true) {
        setIsNicknameChecked(true)
        await showSwal('사용 가능한 닉네임', '사용 가능한 닉네임입니다.', 'success')
      }
    } catch (error) {
      setNickname("")
      setIsNicknameChecked(false)
      throw error
    }
  }

  const handleCheckEmail = async (e) => {

    try {
      await validateEmail()
      const response = checkEmail({email})
      let codeValid = false
      while (!codeValid) {
        try {
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
          })

          if (result.isDismissed) {
            return
          }

          const code = result.value;

          const verificationResponse = await verificationEmail(
              {email, code})

          if (verificationResponse.success) {
            await showSwal('인증 성공!', '이메일 인증이 완료되었습니다.', 'success')
            setIsEmailChecked(true)
            codeValid = true
          }
        } catch (error) {
        }
      }
    } catch (error) {
      setEmail('')
      setIsEmailChecked(false)
      throw error
    }
  }

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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
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
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
  )
}

export default SignupComponent
