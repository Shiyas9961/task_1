import axios from "axios";
import { useDispatch } from "react-redux";
import { tokenRefreshed } from "../slices/authSlice";
import { useAuth } from "./useAuth";

//Get refresh token
export const useRefresh =() => {

    const dispatch = useDispatch()
    const { refreshToken } = useAuth()

    const refresh = async () => {
        const { data } = await axios.request({
            method : 'POST',
            url : 'https://web-app.auth.ap-south-1.amazoncognito.com/oauth2/token',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials' : true
            },
            data : new URLSearchParams({
                grant_type : 'refresh_token',
                client_id : '5e8g13esvnitvpakrp88llqtpj',
                refresh_token : `${refreshToken}`
            })
        })

        dispatch(tokenRefreshed({
            accessToken : data.access_token,
            idToken : data.id_token,
            refreshToken
        }))
        return data.id_token
    }

    return refresh
}