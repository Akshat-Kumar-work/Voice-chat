import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../store/authSlice";
import activateReducers from "./activateSlice";

export const store = configureStore({
    reducer:{
        auth : authReducers,
        activate : activateReducers
    }
})

