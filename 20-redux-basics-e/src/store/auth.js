import {createSlice} from '@reduxjs/toolkit';

const initialAuthState={
    isAuthenticated:false,

}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){//mevcut durum parametre olan (state) redux tarafından otomatik olarak sağlanır
          state.isAuthenticated=true
        },
        logout(state){
         state.isAuthenticated=false
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;