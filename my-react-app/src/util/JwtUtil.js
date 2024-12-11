import axios from "axios";
import {getCookie} from "./cookieUtil";

const jwtAxios = axios.create();

// before request
const beforeReq = (config) => {
  console.log("before request.............");

  const memberInfo = getCookie("accessToken");

  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }

  const { accessToken } = memberInfo;

  // Authorization 헤더 처리
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

// fail request
const requestFail = (err) => {
  console.log("request error............");

  return Promise.reject(err);
};

// before return response
const beforeRes = async (res) => {
  console.log("before return response...........");

  const data = res.data;

  // If error indicates accessToken is expired or invalid
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookieValue = getCookie("accessToken");

    const { accessToken } = memberCookieValue;

    console.log("Access token expired, requesting new token from backend...");

    const originalRequest = res.config;  // 원래 요청
    return axios(originalRequest);
  }

  return res;  // 에러가 아니면 응답 그대로 반환
};

// fail response
const responseFail = (err) => {
  console.log("response fail error.............");
  return Promise.reject(err);
};

// Add interceptors
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
