import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
const getMySelfDetails: any = (options:{getApiEnabled: boolean,email:string}) => {
    return privateAxios({
        url:`/me/?email=${options.email}`,
        method:"GET",
    })
}

const useGetMeDetails = (options:{getApiEnabled: boolean,email:string},onSuccess:any,onError:any) => {
    return useQuery( ["myself-details-get"] ,()=>getMySelfDetails(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetMeDetails