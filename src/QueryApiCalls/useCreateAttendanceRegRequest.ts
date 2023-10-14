import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { AttendanceRegRequst } from "../interfaces/types";
const attendRegRequest: any = (options:AttendanceRegRequst) => {
    return privateAxios({
        url:`apply/attendance-regularize/`,
        method:'POST',
        data:{
            user_email : options.userEmail,
            attendance_id:options.attendance_id,
            date:options.date,
            login_time:options.login_time,
            logout_time:options.logout_time,
            working_hours:options.working_hours,
            reason:options.reason,
            status:options.status
        }
    })
}

const useCreateAttendanceRegRequest = (regOptions:AttendanceRegRequst,onRegSuccess:any,onRegError:any) => {
    return useQuery( ["att-reg-request"] ,()=>attendRegRequest(regOptions),{
        onSuccess:onRegSuccess,
        onError:onRegError,
        refetchOnMount:false,
        enabled:regOptions.getApiEnabled
    })
}

export default useCreateAttendanceRegRequest;