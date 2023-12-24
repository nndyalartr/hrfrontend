import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { CreateLogs } from "../interfaces/types";
const createLogs: any = (options:CreateLogs) => {
    return privateAxios({
        url:`/time_logs/`,
        method:options.type,
        data:options.data
    })
}

const useCreateDailyLogs = (options:CreateLogs,onSuccess:any,onError:any) => {
    return useQuery( ["create-time-logs"] ,()=>createLogs(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useCreateDailyLogs;