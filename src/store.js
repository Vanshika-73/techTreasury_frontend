import { configureStore, createReducer } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import ProjectReducer from './slices/ProjectSlice';
import SingleProjectReducer from './slices/SingleProject'
import carteReducer from './slices/CartSlice'
const store = configureStore({
    reducer:{
        singleProject: SingleProjectReducer,
        project:ProjectReducer,
        user : UserReducer,
        cart : carteReducer
    }
})

export default store;