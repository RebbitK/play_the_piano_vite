import axios from "axios";
import {setCookie} from "../util/CookieUtil.jsx";
import sweet from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export const API_SERVER_HOST = import.meta.env.VITE_APP_API_SERVER_HOST;

const host = `${API_SERVER_HOST}/auth`

export const signup = async (signupParam) => {
  const header = {headers: {"Content-Type": "application/json"}};

  const body = {
    username: signupParam.username,
    nickname: signupParam.nickname,
    password: signupParam.password,
    checkPassword: signupParam.checkPassword,
    email: signupParam.email,
    consent: signupParam.consent
  }
  try {
    const res = await axios.post(`${host}/signup`, body, header);
    return res.data;
  } catch (error) {
    console.log(error)
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const loginPost = async (data) => {
  const body = {
    username: data.username,
    password: data.password
  }
  try {
    const res = await axios.post(`${host}/login`, body);
    const token = res.headers['authorization'].split("Bearer ")[1];
    setCookie("accessToken", token);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const checkUsername = async (data) => {
  const body = {
    username: data.username
  }
  try {
    const res = await axios.post(`${host}/check-username`, body);
    return res.data;
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const checkNickname = async (data) => {
  const body = {
    nickname: data.nickname
  }
  try {
    const res = await axios.post(`${host}/check-nickname`, body);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const checkEmail = async (data) => {
  const body = {
    email: data.email
  }
  try {
    const res = await axios.post(`${host}/signup/send-email`, body);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const verificationEmail = async (data) => {
  const body = {
    email: data.email,
    code: data.code
  }
  try {
    const res = await axios.post(`${host}/check-email-verification`, body);
    return {success: true, data: res.data};
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const sendFindUsernameEmail = async (data) => {
  const body = {
    email: data.email
  }
  try {
    const res = await axios.post(`${host}/username/send-email`, body);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const findUsernameByEmail = async (data) => {
  const body = {
    email: data.email,
    code: data.code
  }
  try {
    const res = await axios.post(`${host}/find-username`, body);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const sendFindPasswordEmail = async (data) => {
  const body = {
    email: data.email
  }
  try {
    const res = await axios.post(`${host}/password/send-email`, body);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const findPasswordByEmail = async (data) => {
  const body = {
    email: data.email,
    code: data.code
  }
  try {
    const res = await axios.post(`${host}/find-password`, body);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}

export const updatePassword = async (data) => {
  const body = {
    email: data.email,
    password: data.password,
    checkPassword: data.checkPassword
  }
  try {
    const res = await axios.post(`${host}/update-password`, body);
    return res.data
  } catch (error) {
    await withReactContent(sweet).fire({
      title: 'Play the piano',
      text: error.response?.data?.msg || '알 수 없는 에러가 발생했습니다.',
      confirmButtonText: '확인'
    })
  }
}