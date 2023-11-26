import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { GetAllAttendanceDet } from "../interfaces/types";
const getAllAttendanceLogs: any = (options: GetAllAttendanceDet) => {
    return privateAxios({
        url: `all-attendance-records/?from_date=${options.fromDate}&to_date=${options.toDate}`,
        method: 'GET',
        responseType: 'blob',
    })
}

const useGetAllAttendance = (options: GetAllAttendanceDet, onSuccess: any, onError: any) => {
    let queryStr = options.type === 'GET' ? 'Get-All-Attendancess' : 'All-Attendancesss'
    return useQuery([queryStr], () => getAllAttendanceLogs(options), {
        onSuccess,
        onError,
        refetchOnMount: false,
        enabled: options.getApiEnabled
    })
}

export default useGetAllAttendance;