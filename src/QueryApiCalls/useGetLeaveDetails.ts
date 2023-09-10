import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const getLeaveDetails: any = (options:{getApiEnabled:boolean,userEmail:string}) => {
    return privateAxios({
        url:`/leave-details/?email_id=${options.userEmail}`,
        method:"GET"
    })
}

const useGetLeaveDetails = (options:{getApiEnabled:boolean,userEmail:string},onSuccess:any,onError:any) => {
    return useQuery( ["leave-details"] ,()=>getLeaveDetails(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetLeaveDetails;