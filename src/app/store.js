import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice"
import orderReducer from "../features/orderSlice"
import customerReducer from "../features/customerSlice"
import userReducer from "../features/userSlice"
import couponReducer from "../features/couponSlice"



export const store = configureStore({
    reducer : {
        product : productReducer ,
        order : orderReducer,
        customer : customerReducer ,
        user : userReducer ,
        coupon : couponReducer ,
    }
})