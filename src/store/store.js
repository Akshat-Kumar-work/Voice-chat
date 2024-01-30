import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../store/authSlice";
import activateReducers from "./activateSlice";
import roomsReducer from "./RoomsSlice";

export const store = configureStore({
    reducer:{
        auth : authReducers,
        activate : activateReducers,
        rooms:roomsReducer
    }
})

