import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import paymentReducer from "./features/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    payment: paymentReducer,
  },
});
