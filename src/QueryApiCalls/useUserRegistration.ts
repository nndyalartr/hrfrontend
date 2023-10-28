import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { ApplyLeave } from "../interfaces/types";
const createUser: any = (options:any) => {
    return privateAxios({
        url:"user-register/",
        method:"POST",
        data:options
    })
}

const useUserRegistration = (options:any,onSuccess:any,onError:any) => {
    return useQuery( ["User-Register"] ,()=>createUser(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useUserRegistration;