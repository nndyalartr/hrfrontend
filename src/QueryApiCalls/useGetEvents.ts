import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { Events } from "../interfaces/types";
const createorGetEventApi: any = (options:{getApiEnabled: boolean}) => {
    return privateAxios({
        url:`/event-details/`,
        method:"GET",
    })
}

const useGetEvents = (options:{getApiEnabled: boolean},onSuccess:any,onError:any) => {
    return useQuery( ["Event-details-get"] ,()=>createorGetEventApi(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetEvents;