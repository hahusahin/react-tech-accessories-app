import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], cartQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const foundItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.cartQuantity++;
    },
    removeItem(state, action) {
      const selectedItem = state.items.find(
        (item) => item.id === action.payload
      );
      selectedItem.quantity--;
      selectedItem.totalPrice -= selectedItem.price;
      state.cartQuantity--;
    },
    deleteFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.cartQuantity-= action.payload.quantity;
    },
    clearCart(state){
      state.items = []
      state.cartQuantity = 0
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
