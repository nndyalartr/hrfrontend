import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { LeaveApproval } from "../interfaces/types";
const attendanceApproval: any = (options:LeaveApproval) => {
    return privateAxios({
        url:`/approve/attendance-regularize/?id=${options.userEmail}`,
        method:"GET"
    })
}

const useAttendanceApprovalGetList = (options:LeaveApproval,onSuccess:any,onError:any) => {
    return useQuery( ["attendance-approve-list"] ,()=>attendanceApproval(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useAttendanceApprovalGetList;