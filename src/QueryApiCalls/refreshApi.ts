import axios from "axios";
import Cookies from "js-cookie";
import { createRefresh } from "react-auth-kit"
const intervalTime = 10
const refreshApi: any = createRefresh({
    interval: intervalTime,
    // @ts-ignore
    refreshApiCallback: async ({ refreshToken }) => {
        await axios.post("http://127.0.0.1:8000/user-login/", {
            refresh: refreshToken
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