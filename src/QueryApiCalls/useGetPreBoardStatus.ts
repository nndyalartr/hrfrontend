import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const createPreboardDetails: any = (options:{id:string,getApiEnabled:boolean}) => {
    return privateAxios({
        url:`/pre-onboard-details/?id=${options.id}`,
        method:"GET",
        
    })
}

const useGetPreBoardStatus = (options:{id:string,getApiEnabled:boolean},onSuccess:any,onError:any) => {
    return useQuery( ["pre-board-status"] ,()=>createPreboardDetails(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetPreBoardStatus;