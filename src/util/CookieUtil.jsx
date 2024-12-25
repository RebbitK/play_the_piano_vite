import { Cookies } from "react-cookie";

const cookies = new Cookies()

export const setCookie = (name, value, maxAgeInSeconds) => {
  return cookies.set(name, value, { path: '/', maxAge: maxAgeInSeconds });
};

export const getCookie = (name) => {

  return cookies.get(name)
}

export const removeCookie = (name , path="/") => {

  cookies.remove(name, {path} )

}