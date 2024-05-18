import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { OnBoardUser } from "../interfaces/types";
const onboardUser: any = (options:OnBoardUser) => {
    return privateAxios({
        url:`/onoard-init/`,
        method:"POST",
        data:{
            email : options.email,
            name : options.name,
            location : options.location,
            doj : options.doj,
            designation : options.designation,
            ctc : options.ctc
        },
        responseType: 'blob',
    })
}

const useCreateOnboardUser = (options:OnBoardUser,onSuccess:any,onError:any) => {
    return useQuery( ["onboard-user"] ,()=>onboardUser(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useCreateOnboardUser;