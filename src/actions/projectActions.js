//import axios from "axios"
import { wrongToken } from "../slices/authSlice"
import { projectsFail, projectsRequest, projectsSuccess } from "../slices/listSilce"


//Get Projects
export const getAllProject = (privateAxios) => {

    return async (dispatch) => {
        try{
            dispatch(projectsRequest())

            const { data } = await privateAxios.get('/prod/projects')

            dispatch(projectsSuccess(data.projects))

        }catch(error){
            console.log(error)
            if(error.message === "Network Error"){
                dispatch(wrongToken(error.message))
                return dispatch(projectsFail(error.message))
            }
            if(error.response.status === 502){
                return dispatch(wrongToken(error.response.data.message))
            }
            
            dispatch(wrongToken("Refresh Token is wrong or expired"))
        }
    }
}
