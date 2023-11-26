import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const getAllUsers: any = (options:{getApiEnabled:boolean,userEmail:string}) => {
    return privateAxios({
        url:`/user-details/`,
        method:"GET"
    })
}

const useGetAllUserDetails = (options:{getApiEnabled:boolean,userEmail:string},onSuccess:any,onError:any) => {
    return useQuery( ["all-users-detailssdfsdf"] ,()=>getAllUsers(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetAllUserDetails;