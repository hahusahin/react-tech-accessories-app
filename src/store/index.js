import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
   reducer: {cart: cartSlice.reducer, ui: uiSlice.reducer, auth: authSlice.reducer}
})

export default store