import {  useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
const getLeaderList: any = (options:{getApiEnabled:boolean}) => {
    let url = "/leader_list/"
   
    
    return privateAxios({
        url:url,
        method:"GET"
    })
}

const useLeaderList = (options:{getApiEnabled:boolean},onSuccess:any,onError:any) => {
    return useQuery( ["leader-search"] ,()=>getLeaderList(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useLeaderList;