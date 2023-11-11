import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { ApplyResignation } from "../interfaces/types";
const createorGetEventApi: any = (options: ApplyResignation) => {
    return privateAxios({
        url: `apply/resignation/?user_email=${options.user_email}`,
        method: options.type,
        data: {
            personal_mail_id: options.personal_mail_id,
            personal_phone_no: options.personal_phone_no,
            resignation_date: options.resignation_date,
            resignation_reason: options.resignation_reason,
            user_email: options.user_email
        }
    })
}

const useApplyResignation = (options: ApplyResignation, onSuccess: any, onError: any) => {
    return useQuery(["Apply-Resignation"], () => createorGetEventApi(options), {
        onSuccess,
        onError,
        refetchOnMount: false,
        enabled: options.getApiEnabled
    })
}

export default useApplyResignation;