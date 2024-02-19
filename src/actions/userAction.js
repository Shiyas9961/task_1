import { setUserDetails } from "../slices/authSlice"
import { getCurrentUser } from "../utils/getUserData"

export const getCurrentUserData = () => {
    return async (dispatch) => {
        try{
            const user = await getCurrentUser()
            //console.log(user)
            dispatch(setUserDetails(user))
          }catch(error){
            console.log(error)
          }
    }
}