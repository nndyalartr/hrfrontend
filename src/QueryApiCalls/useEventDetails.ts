import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { Events } from "../interfaces/types";
const createorGetEventApi: any = (options:Events) => {
    return privateAxios({
        url:`/event-details/`,
        method:options.type,
        data:{
            name:options.name,
            date:options.date,
            shift:options.shift,
            eventType:options.eventType
        }
    })
}

const useCreateorGetEvents = (options:Events,onSuccess:any,onError:any) => {
    return useQuery( ["Event-details"] ,()=>createorGetEventApi(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useCreateorGetEvents;