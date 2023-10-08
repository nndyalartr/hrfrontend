import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { ApplyLeave } from "../interfaces/types";
const createLeave: any = (options:ApplyLeave) => {
    return privateAxios({
        url:`/leave-apply/?email=${options.userEmail}`,
        method:options.type,
        data:{
            email:options.userEmail,
            leaves:options.leaves,
            leave_type:options.leaveType,
            leave_reason:options.leaveReason
        }
    })
}

const useCreateLeave = (options:ApplyLeave,onSuccess:any,onError:any) => {
    return useQuery( ["Leave-apply"] ,()=>createLeave(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useCreateLeave;