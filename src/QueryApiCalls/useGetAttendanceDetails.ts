import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const getAttendance: any = (options:{getApiEnabled:boolean,userEmail:string}) => {
    return privateAxios({
        url:`/attendance-details/?email_id=${options.userEmail}`,
        method:"GET"
    })
}

const useGetAttendanceDetails = (options:{getApiEnabled:boolean,userEmail:string},onSuccess:any,onError:any) => {
    return useQuery( ["Attendance-details"] ,()=>getAttendance(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetAttendanceDetails;