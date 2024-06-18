import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { PreBoardFormDetails } from "../interfaces/types";
const createPreboardDetails: any = (options:PreBoardFormDetails) => {
    return privateAxios({
        url:`/pre-onboard-details/`,
        method:options.type,
        data:{
            id:options.id,
            type:options.data_type,
            data:options.data,
        }
    })
}

const useCreatePreBoardDetails = (options:PreBoardFormDetails,onSuccess:any,onError:any) => {
    return useQuery( ["pre-board-form-details"] ,()=>createPreboardDetails(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useCreatePreBoardDetails;