import axios from "axios";
import {getTokenFromLocalStorage} from "../Auth/helper.auth"

//This is for fetching authenticated URI's
export const privateAxios=axios.create({
    baseURL:"",
})
privateAxios.interceptors.request.use((config)=>{
    const token=getTokenFromLocalStorage();
    if(token){
        console.log(config.headers)
           config.headers.Authorization=`Bearer ${token}`
    }
    return config
},(error)=>Promise.reject(error))