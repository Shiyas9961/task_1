import { logOutSlice } from "../slices/authSlice"
import userpool from "../userpool"

export const logOut = (dispatch) => {
    const cognitoUser = userpool.getCurrentUser()
    console.log(cognitoUser)
    if(cognitoUser){
        cognitoUser.signOut()
        dispatch(logOutSlice())
    }
}