import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { Events } from "../interfaces/types";
const getTicketsList: any = (options:{getApiEnabled: boolean,email:string}) => {
    return privateAxios({
        url:`/raise-ticket/?email=${options.email}`,
        method:"GET",
    })
}

const useGetTicketList = (options:{getApiEnabled: boolean,email:string},onSuccess:any,onError:any) => {
    return useQuery( ["Ticket-details-get"] ,()=>getTicketsList(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetTicketList