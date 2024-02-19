import { jwtDecode } from "jwt-decode"
import { wrongToken } from './slices/authSlice'

export const verifyJWT = async (token, dispatch) => {
    const decode = jwtDecode(token)
    if(decode.exp < Date.now() / 1000){
        return dispatch(wrongToken("Token expired"))
    }
    return
}