import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice"
import orderReducer from "../features/orderSlice"






export const store = configureStore({
    reducer : {
        product : productReducer ,
        order : orderReducer,
    }
})