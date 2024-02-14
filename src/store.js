import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducers from './slices/authSlice'
import listReducers from './slices/listSilce'

const reducer = combineReducers({
    authState : authReducers,
    listState : listReducers
})

export const store = configureStore({
    reducer
})