import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/LoginSlice.js'

const store = configureStore({
  reducer: {
    loginSlice: loginReducer, // login 상태를 관리하는 슬라이스
  },
});

export default store;
