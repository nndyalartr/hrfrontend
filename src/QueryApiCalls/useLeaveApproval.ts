import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { LeaveApproval } from "../interfaces/types";
const leaveApproval: any = (options:LeaveApproval) => {
    return privateAxios({
        url:`/leave-approval/?email=${options.userEmail}`,
        method:options.type,
        data:{
            id:options.id,
            action:options.action
        }
    })
}

const useLeaveApproval = (options:LeaveApproval,onSuccess:any,onError:any) => {
    return useQuery( ["Leave-approve"] ,()=>leaveApproval(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useLeaveApproval;