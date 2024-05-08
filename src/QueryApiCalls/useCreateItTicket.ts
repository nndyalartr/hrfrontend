import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { ItTicketCreate } from "../interfaces/types";
const createItTicket: any = (options:ItTicketCreate) => {
    return privateAxios({
        url:`/raise-ticket/`,
        method:options.type,
        data:{
            created_by:options.created_by,
            title:options.title,
            desc:options.desc,
        }
    })
}

const useCreateItTicket = (options:ItTicketCreate,onSuccess:any,onError:any) => {
    return useQuery( ["create-it-ticket"] ,()=>createItTicket(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useCreateItTicket;