import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { userId: "", token: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.isLoggedIn = true
    },
    logout(state) {
      state.token = ""
      state.userId = ""
      state.isLoggedIn = false      
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
