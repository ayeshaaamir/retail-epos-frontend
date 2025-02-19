import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import inventoryReducer from './slices/inventorySlice';
import billingReducer from './slices/billingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    inventory: inventoryReducer,
    billing: billingReducer,
  },
});
