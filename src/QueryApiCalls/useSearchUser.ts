import {  useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
const getUser: any = (options:{getApiEnabled:boolean,userEmail:string,project:string}) => {
    let url = ""
    if(options.project && !options.userEmail){
        url = `/user-search/?project=${options.project}`
    }else if(options.userEmail && !options.project ){
        url = `/user-search/?emp_id=${options.userEmail}`
    }else if(options.project && options.userEmail){
        url = `/user-search/?emp_id=${options.userEmail}&project=${options.project}`
    }else{
        url = `/user-search/`
    }
    
    return privateAxios({
        url:url,
        method:"GET"
    })
}

const useSearchUser = (options:{getApiEnabled:boolean,userEmail:string,project:string},onSuccess:any,onError:any) => {
    return useQuery( ["user-search"] ,()=>getUser(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useSearchUser;