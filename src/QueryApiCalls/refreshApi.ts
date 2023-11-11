import axios from "axios";
import Cookies from "js-cookie";
import { createRefresh } from "react-auth-kit"
const intervalTime = 3600
const refreshApi: any = createRefresh({
    interval: intervalTime,
    // @ts-ignore
    refreshApiCallback: async ({ refreshToken }) => {
        let userAuthRefreshToken = Cookies.get('_auth_refresh')        
        await axios.post("http://127.0.0.1:8000/api/token/refresh/", {

            refresh: userAuthRefreshToken
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