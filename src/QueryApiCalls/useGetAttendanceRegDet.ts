import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { AttendanceReg } from "../interfaces/types";
const attendReg: any = (options:AttendanceReg) => {
    return privateAxios({
        url:`/attendance-regularize/?id=${options.userEmail}`,
        method:options.type,
        data:{
           
        }
    })
}

const useGetAttendanceRegDet = (options:AttendanceReg,onSuccess:any,onError:any) => {
    return useQuery( ["att-reg"] ,()=>attendReg(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetAttendanceRegDet;