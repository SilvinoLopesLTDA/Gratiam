import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import cartReducer from "../redux/features/product/cartSlice";
import transactionReducer from "../redux/features/transaction/transactionSlice";
import paymentReducer from "./features/payment/paymentSlice"; 
import clientReducer from "./features/client/clientSlice"; 
import filterClientReducer from "./features/client/filterClientSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    client: clientReducer,
    product: productReducer,
    transaction: transactionReducer,
    filter: filterReducer,
    filterClient: filterClientReducer,
    payment: paymentReducer,
  },
});
