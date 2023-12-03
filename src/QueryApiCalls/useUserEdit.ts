import {  useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
const getUserEdit: any = (options:{getApiEnabled:boolean,data:any,id:string}) => {
    return privateAxios({
        url:`/user-edit/`,
        method:"POST",
        data:options.data
    })
}

const useEditUser = (options:{getApiEnabled:boolean,data:any,id:string},onSuccess:any,onError:any,) => {
    return useQuery( ["user-edittt"] ,()=>getUserEdit(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useEditUser;