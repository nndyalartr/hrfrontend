import {  useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
const getUserOpt: any = (options:{getApiEnabled:boolean}) => {
    let url = "/user-options/"
   
    
    return privateAxios({
        url:url,
        method:"GET"
    })
}

const useUserOptionList = (options:{getApiEnabled:boolean},onSuccess:any,onError:any) => {
    return useQuery( ["user-options-search"] ,()=>getUserOpt(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useUserOptionList;