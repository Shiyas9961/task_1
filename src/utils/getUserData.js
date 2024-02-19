import { jwtDecode } from 'jwt-decode'

export const getCurrentUser = async () => {
    const idToken = localStorage.getItem('idToken')

    const decode = jwtDecode(idToken)

    const userDetails = {
        email : decode.email,
        role : decode["custom:role"],
        name : decode.name
    }
    
    return userDetails
}