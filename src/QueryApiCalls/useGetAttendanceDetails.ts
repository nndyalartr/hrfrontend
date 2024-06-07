import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const getAttendance: any = (options:{getApiEnabled:boolean,userEmail:string,fromDate?: string, toDate?: string}) => {
    let url = `/attendance-details/?email_id=${options.userEmail}`
    if (options.toDate?.length){
        url=`/attendance-details/?email_id=${options.userEmail}&startDate=${options.fromDate}&endDate=${options.toDate}`
    }else{
        url=`/attendance-details/?email_id=${options.userEmail}`
    }
    return privateAxios({
        url:url,
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