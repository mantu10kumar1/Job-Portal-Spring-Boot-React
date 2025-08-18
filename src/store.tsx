import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import profileReducer from "./Slices/ProfileSlice1"
import filterReducer from "./Slices/FilterSlice";


export default configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        filter:filterReducer
    }
})