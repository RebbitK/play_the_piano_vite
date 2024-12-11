import axios   from "axios";
import {setCookie} from "../util/CookieUtil.js";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

const host = `${API_SERVER_HOST}/auth`

export const signup = async (signupParam) => {
  const header = { headers: { "Content-Type": "application/json" } };

  const body = {
    username: signupParam.username,
    nickname: signupParam.nickname,
    password: signupParam.password,
    checkPassword: signupParam.checkPassword,
    phoneNumber: signupParam.phoneNumber,
    consent: signupParam.consent
  };

  try {
    const res = await axios.post(`${host}/auth/signup`, body, header);
    return res.data;
  } catch (error) {
    console.error("회원가입 중 오류 발생", error);
    throw error;
  }
};

export const login = async (data) => {
  const body = {
    username: data.username,
    password: data.password
  };
  console.log(`${host}/login`)
  const res = await axios.post(`${host}/login`, body);
  console.log(res)
  const token = res.headers['authorization'].split("Bearer ")[1];
  console.log(token)

  if (token) {
    setCookie("accessToken", token);
  }

  return res.data

}