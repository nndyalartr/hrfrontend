import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const verifyLogin: any = (values: { "email": string, "password": string }) => {
    const config = {
        method:"POST",
        url:"http://13.127.146.76:8000/user-login/",
        // url:"http://127.0.0.1:8000/user-login/",
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