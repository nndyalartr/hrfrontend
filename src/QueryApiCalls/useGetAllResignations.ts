import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { GetAllRegnations } from "../interfaces/types";
const getAllResignations: any = (options: GetAllRegnations) => {
    return privateAxios({
        url: `all-resignation/?user_email=${options.user_email}`,
        method: options.type,
        data: {
            user_email: options.user_email,
            record_id: options.record_id,
            status: options.status,
            exit_date: options.exit_date
        }
    })
}

const useGetAllResignations = (options: GetAllRegnations, onSuccess: any, onError: any) => {
    let queryStr = options.type === 'GET' ? 'Get-All-Resignations' : 'Approve-Resignation'
    return useQuery([queryStr], () => getAllResignations(options), {
        onSuccess,
        onError,
        refetchOnMount: false,
        enabled: options.getApiEnabled
    })
}

export default useGetAllResignations;