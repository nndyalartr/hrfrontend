import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const createAttendancePunchApi: any = (options:{getApiEnabled:boolean,userEmail:string,type:string}) => {
    return privateAxios({
        url:`/attendance-punch/`,
        method:options.type,
        data:{
            user_email:options.userEmail
        }
    })
}

const useCreateAttendance = (options:{getApiEnabled:boolean,userEmail:string,type:string},onSuccess:any,onError:any) => {
    return useQuery( ["Attendance-punch"] ,()=>createAttendancePunchApi(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useCreateAttendance;