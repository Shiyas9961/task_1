import axios from "axios";

export const BASE_URL = 'https://u9n6ynvzkj.execute-api.ap-south-1.amazonaws.com' 

export const privateAxios = axios.create({
    baseURL : BASE_URL,
    headers : {
        'Content-Type' : 'application/json'
    }
})
