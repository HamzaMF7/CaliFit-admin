import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice"
import orderReducer from "../features/orderSlice"
import customerReducer from "../features/customerSlice"






export const store = configureStore({
    reducer : {
        product : productReducer ,
        order : orderReducer,
        customer : customerReducer ,
    }
})