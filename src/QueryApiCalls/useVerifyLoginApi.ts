import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL
const verifyLogin: any = (values: { "email": string, "password": string }) => {
    const url = `${backendUrl}user-login/`
    console.log(url)
    const config = {
        method:"POST",
        // url:"http://13.127.146.76:8000/user-login/",
        url:url,
        data:values
    }
    return axios(config).then((res)=>{
        return res
    }).catch(err=>{
        console.log(err)
    })
}

const useVerifyLoginApi = () => {
    return useMutation(verifyLogin, { mutationKey: ["verify-login"] })
}

export default useVerifyLoginApi;