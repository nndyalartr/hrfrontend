import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { LeaveApproval } from "../interfaces/types";
const leaveApproval: any = (options:LeaveApproval) => {
    return privateAxios({
        url:`/leave-approval/?email=${options.userEmail}`,
        method:"GET"
    })
}

const useLeaveApprovalGet = (options:LeaveApproval,onSuccess:any,onError:any) => {
    return useQuery( ["Leave-approve-get"] ,()=>leaveApproval(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useLeaveApprovalGet;