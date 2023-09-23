import {signal} from "@preact/signals-react"
export const UserInfoStore = ()=>{
    const loggedInfo:{user_email:string} ={
        user_email:""
    }
    const loadBaseData = ()=>{
        const userData = localStorage.getItem("_USER_EMAIL");
        return userData?userData:loggedInfo.user_email
    }
    const loggedUserInfo = signal(loadBaseData())
    return {loggedUserInfo}
}
