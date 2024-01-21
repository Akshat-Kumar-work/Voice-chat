import { createSlice } from "@reduxjs/toolkit";

const initialState ={
   isAuth :false,
   user:null,
   email:''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuth:(state,action)=>{
            state.isAuth = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        }
    }
});

export const {setAuth , setUser , setEmail}  = authSlice.actions;
export default authSlice.reducer;