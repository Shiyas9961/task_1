//import axios from "axios"
import { wrongToken } from "../slices/authSlice"
import { projectsFail, projectsRequest, projectsSuccess } from "../slices/listSilce"

export const getAllProject = (privateAxios, navigate) => {

    return async (dispatch) => {
        try{
            dispatch(projectsRequest())

            const { data } = await privateAxios.get('/prod/projects')

            dispatch(projectsSuccess(data.projects))

        }catch(error){
            console.log(error)
            navigate('/login')
            if(error.message === "Network Error"){
                return dispatch(projectsFail(error.message))
            }
            if(error.response.status === 502){
                return dispatch(wrongToken(error.response.data.message))
            }
            
            dispatch(wrongToken("Refresh Token has expired"))
        }
    }
}