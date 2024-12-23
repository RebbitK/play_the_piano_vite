import React, {useState} from 'react';
import {findUsernameByEmail, sendFindUsernameEmail} from '../api/UserApi.jsx';
import Swal from "sweetalert2";

const FindUsernameComponent = () => {
  const [email, setEmail] = useState('');

  const handleCheckEmail = async (e) => {
    e.preventDefault()
    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      await Swal.fire('유효하지 않은 이메일', '올바른 이메일 형식을 입력해주세요.', 'error')
      return
    }
    const response =  sendFindUsernameEmail({
      email
    })
    let codeValid = false;
    while (!codeValid) {
      const result = await Swal.fire({
        title: '인증번호 입력',
        input: 'text',
        inputPlaceholder: '인증번호를 입력하세요.',
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

      const verificationResponse = await findUsernameByEmail({email, code});
      if (verificationResponse.data) {
        await Swal.fire('인증 성공!',
            `이메일 인증이 완료되었습니다.<br>
    <div style="margin-top: 10px; padding: 10px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 4px; color: #333;">
      ${verificationResponse.data}
    </div>
  `, 'success')
        codeValid = true
      }
    }

  }

  return (
      <div
          className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg max-h-screen overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Play The Piano</h2>
        <form onSubmit={handleCheckEmail}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              아이디 찾기
            </label>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">이메일</span>
              <input
                  id="email"
                  type="text"
                  placeholder="이메일을 입력해 주세요"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="flex-1 w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              입력하신 이메일로 인증 메일을 보내드립니다.
            </p>
            <button
                type="button"
                onClick={handleCheckEmail}
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              이메일 보내기
            </button>
          </div>
        </form>
      </div>
  )
}

export default FindUsernameComponent
