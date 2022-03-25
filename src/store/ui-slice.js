import { createSlice } from "@reduxjs/toolkit";

const initialUIState = { isModalShown: false, isToastShown: false, toastBody: "" };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    showModal(state) {
      state.isModalShown = true
    },
    hideModal(state){
      state.isModalShown = false
    },
    showToast(state, action){
      state.isToastShown = true
      state.toastBody = action.payload
    },
    hideToast(state){
      state.isToastShown = false
      state.toastBody = ""
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
