import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { GetTimeLogs } from "../interfaces/types";
const fetchLogs: any = (options:GetTimeLogs) => {
    return privateAxios({
        url:`/fetch-time_logs/?user_email=${options.userEmail}&date=${options.logsDate}`,
        method:options.type,
    })
}

const useGetUserTimeLogs = (options:GetTimeLogs,onSuccess:any,onError:any) => {
    return useQuery( ["gett-time-logs"] ,()=>fetchLogs(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetUserTimeLogs;