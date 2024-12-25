import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/UserApi.jsx";

import { getCookie, setCookie, removeCookie } from "../util/CookieUtil.jsx";

const initState = {
  username:''
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param)

})

const loadMemberCookie = () => {

  const memberInfo =  getCookie("accessToken");
  
  if(memberInfo && memberInfo.username) {
    memberInfo.username = decodeURIComponent(memberInfo.username)
  }

  return memberInfo
}


const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie()|| initState,
  reducers: {
    login: (state, action) => {
      
      const data = action.payload

      return {username: data.username}

    },
    logout: (state, action) => {
      removeCookie("accessToken")
      return {...initState}
    }
  },
  extraReducers: (builder) => {

    builder.addCase( loginPostAsync.fulfilled, (state, action) => {
      const payload = action.payload

      if(!payload.error){
        setCookie("accessToken",JSON.stringify(payload), 1)
      }

      return payload

    })

    .addCase(loginPostAsync.pending, (state,action) => {
    })
    .addCase(loginPostAsync.rejected, (state,action) => {
    })
  }
})


export const {login,logout} = loginSlice.actions

export default loginSlice.reducer