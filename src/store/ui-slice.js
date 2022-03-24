import { createSlice } from "@reduxjs/toolkit";

const initialUIState = { isModalShown: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    showModal(state) {
      state.isModalShown = true
    },
    hideModal(state){
      state.isModalShown = false
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
