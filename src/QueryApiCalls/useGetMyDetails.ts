import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const getMyDetails: any = (options:{getApiEnabled:boolean,userEmail:string}) => {
    return privateAxios({
        url:`/my-details/?user_email=${options.userEmail}`,
        method:"GET"
    })
}

const useGetMyDetails = (options:{getApiEnabled:boolean,userEmail:string},onSuccess:any,onError:any) => {
    return useQuery( ["my-details"] ,()=>getMyDetails(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetMyDetails;