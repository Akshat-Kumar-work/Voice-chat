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
        setUser:(state,action)=>{
            state.user = action.payload;
            if(action.payload === null){
                state.isAuth = false;
            }
            else{
                state.isAuth = true;
            }
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        }
    }
});

export const { setUser , setEmail}  = authSlice.actions;
export default authSlice.reducer;