import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    accessToken : localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null,
    idToken : localStorage.getItem('idToken') ? JSON.parse(localStorage.getItem('idToken')) : null,
    refreshToken : localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null,
    error : null,
    userDetails : {}
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
            localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
            localStorage.setItem('idToken', JSON.stringify(action.payload.idToken))
            localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken))
            return {
                ...state,
                loading : false,
                accessToken : action.payload.accessToken,
                refreshToken : action.payload.refreshToken,
                idToken : action.payload.idToken 
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
            localStorage.removeItem('idToken')
            localStorage.removeItem('refreshToken')
            return {
                ...state,
                accessToken : null,
                idToken : null,
                refreshToken : null,
                error : action.payload
            }
        },
        logOutSlice : (state, action) => {
            localStorage.removeItem('idToken')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return {
                ...state,
                accessToken : null,
                idToken : null,
                refreshToken : null,
            }
        },
        setUserDetails : (state, action) => {
            return {
                ...state,
                userDetails : action.payload
            }
        },
        tokenRefreshed : (state, action) => {
            
            localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
            localStorage.setItem('idToken', JSON.stringify(action.payload.idToken))
            localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken))

            return {
                ...state,
                accessToken : action.payload.accessToken,
                idToken : action.payload.idToken,
                refreshToken : action.payload.refreshToken
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
    wrongToken,
    logOutSlice,
    setUserDetails,
    tokenRefreshed
} = authSlice.actions