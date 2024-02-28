import { useEffect } from "react"
import { privateAxios } from "../baseUrl"
import { useAuth } from "./useAuth"
import { useRefresh } from "./useRefresh"

//Seting id token and when this id token expires giving refresh token also for getting new id token
export const usePrivateAxios = () => {

    const { idToken } = useAuth()
    const refresh = useRefresh()

    useEffect(() => {

        const requestIntercept = privateAxios.interceptors.request.use(
            //Initialy giving id token in Hedeaders Bearer
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${ idToken }}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        //When the token expires call refresh api to get new id token and setting to header
        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return privateAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateAxios.interceptors.request.eject(requestIntercept);
            privateAxios.interceptors.response.eject(responseIntercept);
        }
    }, [refresh, idToken])

    return privateAxios;
}