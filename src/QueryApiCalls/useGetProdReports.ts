import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { ProdReportsGet } from "../interfaces/types";
const prodReports: any = (options:ProdReportsGet) => {
    return privateAxios({
        url:`prod-reports/?client=${options.client}&year=${options.year}&shift=${options.shift}&month=${options.month}`,
        method:"GET",
        data:{
           
        }
    })
}

const useGetProdReports = (options:ProdReportsGet,onSuccess:any,onError:any) => {
    return useQuery( ["prod-reports"] ,()=>prodReports(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetProdReports;