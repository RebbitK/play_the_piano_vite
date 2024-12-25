import React, {useState} from 'react';
import {updatePassword} from '../api/UserApi.jsx';
import {useLocation, useNavigate} from "react-router-dom";
import {useInputValidationHook} from "../hooks/useInputValidationHook.jsx";
import showSwal from "../util/ShowSwalUtil.jsx";

const UpdatePasswordComponent = () => {
  const navigate = useNavigate()
  const passwordValidation = (value) => /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}/.test(
      value)
  const {value: password, setValue: setPassword, validate: validatePassword} =
      useInputValidationHook(passwordValidation,
          '비밀번호는 영어와 숫자가 각각 1개 이상 포함되어있는 8자 ~ 20자로 입력해주세요.')
  const [checkPassword, setCheckPassword] = useState('')
  const location = useLocation()
  const email = location.state?.email

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validatePassword()
      if (password !== checkPassword) {
        await showSwal('비밀번호 불일치', '두 비밀번호가 일치하지 않습니다.', 'error')
        return
      }
      const response = await updatePassword({email, password, checkPassword})
      if (response.data === true) {
        await showSwal('비밀번호 변경', '성공적으로 비밀번호가 변경되었습니다.', 'success')
        navigate('/auth/login')
      }
    } catch (error) {
      throw error
    }
  }
  return (
      <div
          className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">비밀번호 변경</h2>
        <form onSubmit={handleSubmit}>
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
          <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            비밀번호 변경하기
          </button>
        </form>
      </div>

  )
}
export default UpdatePasswordComponent