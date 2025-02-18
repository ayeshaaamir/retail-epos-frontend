// features/billing/billingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  actualBill: 0, // Sum of all prices from the cart
  discountFromCart: 0, // Sum of all discounts from the cart
  additionalDiscount: 0, // Additional discount from payment summary
  total: 0, // Editable total
  paymentMethod: null,
  receipt: null,
};

const billingSlice = createSlice({
  name: "paymentSummary",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartItemId = Date.now();
      const newCartItem = {
        ...action.payload,
        cartItemId,
      };
      state.cart.push(newCartItem);
      // Update actualBill and discountFromCart when a new item is added
      state.actualBill = state.cart.reduce((sum, item) => sum + item.price, 0);
      state.discountFromCart = state.cart.reduce(
        (sum, item) => sum + (item.item_discount || 0),
        0
      );
      state.total = state.actualBill - state.discountFromCart;
    },
    updateCartItem: (state, action) => {
      const { cartItemId, updates } = action.payload;
      const item = state.cart.find((item) => item.cartItemId === cartItemId);
      if (item) {
        Object.assign(item, updates);
        // Update actualBill and discountFromCart when an item's price or discount is updated
        state.actualBill = state.cart.reduce(
          (sum, item) => sum + item.price,
          0
        );
        state.discountFromCart = state.cart.reduce(
          (sum, item) => sum + (item.item_discount || 0),
          0
        );
        state.total = state.actualBill - state.discountFromCart;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.cartItemId !== action.payload
      );
      // Update actualBill and discountFromCart when an item is removed
      state.actualBill = state.cart.reduce((sum, item) => sum + item.price, 0);
      state.discountFromCart = state.cart.reduce(
        (sum, item) => sum + (item.item_discount || 0),
        0
      );
      state.total = state.actualBill - state.discountFromCart;
    },
    updateTotal: (state, action) => {
      const newTotal = action.payload;
      state.total = newTotal;
      // Calculate additional discount
      state.additionalDiscount =
        state.actualBill - state.discountFromCart - newTotal;
    },
    processSale: (state, action) => {
      state.receipt = action.payload;
      state.cart = [];
      state.actualBill = 0;
      state.discountFromCart = 0;
      state.additionalDiscount = 0;
      state.total = 0;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  addToCart,
  updateCartItem,
  removeFromCart,
  updateTotal,
  processSale,
  setPaymentMethod,
} = billingSlice.actions;

export default billingSlice.reducer;
