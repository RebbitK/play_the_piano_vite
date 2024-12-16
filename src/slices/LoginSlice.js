import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/UserApi.jsx";

import { getCookie, setCookie, removeCookie } from "../util/CookieUtil.jsx";

const initState = {
  username:''
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param)

})

const loadMemberCookie = () => {  //쿠키에서 로그인 정보 로딩 

  const memberInfo =  getCookie("accessToken");
  
  if(memberInfo && memberInfo.username) {
    memberInfo.username = decodeURIComponent(memberInfo.username)
  }

  return memberInfo
}


const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie()|| initState, //쿠키가 없다면 초깃값사용 
  reducers: {
    login: (state, action) => {
      console.log("login.....")
      
      const data = action.payload

      //새로운 상태 
      return {username: data.username}

    },
    logout: (state, action) => {
      console.log("logout....")

      removeCookie("member")
      return {...initState}
    }
  },
  extraReducers: (builder) => {

    builder.addCase( loginPostAsync.fulfilled, (state, action) => {
      console.log("fulfilled")

      const payload = action.payload


      //정상적인 로그인시에만 저장 
      if(!payload.error){
        setCookie("accessToken",JSON.stringify(payload), 1) //1일
      }

      return payload

    })

    .addCase(loginPostAsync.pending, (state,action) => {
      console.log("pending")
    })
    .addCase(loginPostAsync.rejected, (state,action) => {
      console.log("rejected")
    })
  }
})


export const {login,logout} = loginSlice.actions

export default loginSlice.reducer