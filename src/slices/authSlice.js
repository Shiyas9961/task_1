import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    accessToken : localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null,
    error : null
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loginRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        loginSuccess : (state, action) => {
            localStorage.setItem('accessToken', JSON.stringify(action.payload))
            return {
                ...state,
                loading : false,
                accessToken : action.payload
            }
        },
        loginFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearError : (state, action) => {
            return {
                ...state,
                error : null
            }
        },
        wrongToken : (state, action) => {
            localStorage.removeItem('accessToken')
            return {
                ...state,
                accessToken : null
            }
        }
    }
})

export default authSlice.reducer

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    wrongToken
} = authSlice.actions