import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { ListAttendanceRequest } from "../interfaces/types";
const listAttendRegRequest: any = (options:ListAttendanceRequest) => {
    return privateAxios({
        url:`list/attendance-regularize/?id=${options.userEmail}`,
        method:options.type,
        data:{
            
        }
    })
}

const useListAttendanceReg = (options:ListAttendanceRequest,onSuccess:any,onError:any) => {
    return useQuery( ["list-att-reg-request"] ,()=>listAttendRegRequest(options),{
        onSuccess:onSuccess,
        onError:onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useListAttendanceReg;