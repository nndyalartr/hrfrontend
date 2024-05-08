import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { Events } from "../interfaces/types";
const updateTicket: any = (options:{getApiEnabled: boolean,id:string}) => {
    return privateAxios({
        url:`/raise-ticket/${options.id}/`,
        method:"PATCH",
    })
}

const useUpdateTicket = (options:{getApiEnabled: boolean,id:string},onSuccess:any,onError:any) => {
    return useQuery( ["Ticket-details-update"] ,()=>updateTicket(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useUpdateTicket