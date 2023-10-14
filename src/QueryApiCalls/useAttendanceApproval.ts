import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { LeaveApproval } from "../interfaces/types";
const attendanceApproval: any = (options:LeaveApproval) => {
    return privateAxios({
        url:`/approve/attendance-regularize/?id=${options.userEmail}`,
        method:options.type,
        data:{
            id:options.id,
            action:options.action
        }
    })
}

const useAttendanceApproval = (options:LeaveApproval,onSuccess:any,onError:any) => {
    return useQuery( ["attendance-approve"] ,()=>attendanceApproval(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useAttendanceApproval;