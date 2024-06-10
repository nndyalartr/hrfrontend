import axios from "axios";
import Cookies from "js-cookie";
import { createRefresh } from "react-auth-kit"
const intervalTime = 3600
const backendUrl = process.env.REACT_APP_BACKEND_URL
const refreshApi: any = createRefresh({
    interval: 60,
    // @ts-ignore
    refreshApiCallback: async ({ refreshToken }) => {
        let userAuthRefreshToken = Cookies.get('_auth_refresh')
        await axios.post(`${backendUrl}/api/token/refresh/`, {

            data:{refresh:userAuthRefreshToken} 
        }).then(({ data }) => {
            Cookies.set("_auth", data.access)
            return {
                isSuccess: true,
                newAuthToken: data.access
            }
        }).catch((e) => {
            return {
                isSuccess: false
            }
        })
    }
})

export default refreshApi