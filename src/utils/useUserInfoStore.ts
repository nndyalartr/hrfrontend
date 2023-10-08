import {signal} from "@preact/signals-react"
export const UserInfoStore = ()=>{
    const loggedInfo:{user_data:any} ={
        user_data:{}
    }
    const loadBaseData = ()=>{
        const userData = localStorage.getItem("_USER_DATA");
        return userData?JSON.parse(userData):loggedInfo.user_data
    }
    const loggedUserInfo = signal(loadBaseData())
    return {loggedUserInfo}
}
