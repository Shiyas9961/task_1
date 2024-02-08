import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducers from './slices/authSlice'

const reducer = combineReducers({
    authState : authReducers
})

export const store = configureStore({
    reducer
})