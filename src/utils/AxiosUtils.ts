import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const backendUrl = process.env.REACT_APP_BACKEND_URL
const client = axios.create({
    // baseURL:"http://13.127.146.76:8000"
    baseURL:`${backendUrl}`
})

export const privateAxios:any=({...options})=>{
    let userAuthToken = Cookies.get('_auth')
    client.defaults.headers.common.Authorization = `Bearer ${userAuthToken}`||""
    const onSuccess = (response:any)=> response
  
    const onError =(err:any)=>{
        if(err.response.status===401){
            message.error("your Session is expired")
            window.location.href = window.location.origin+"/"
            localStorage.clear()
            Cookies.remove('_auth')
            Cookies.remove('_auth_refresh')
        }
        return err
    }
    return client(options).then(onSuccess).catch(onError)
}