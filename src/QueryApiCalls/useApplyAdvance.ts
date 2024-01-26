import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { ApplyAdvance } from "../interfaces/types";
const advanceApply: any = (options: ApplyAdvance) => {
    return privateAxios({
        url: `apply/advance/`,
        method: "POST",
        data: {
            personal_mail_id: options.personal_mail_id,
            personal_phone_no: options.personal_phone_no,
            advance_date: options.advance_date,
            advance_reason: options.advance_reason,
            user_email: options.user_email,
            user_address: options.address,
            advance_amount : options.advance_amount,

        }
    })
}

const useApplyAdvance = (options: ApplyAdvance, onSuccess: any, onError: any) => {
    return useQuery(["Apply-Advance"], () => advanceApply(options), {
        onSuccess,
        onError,
        refetchOnMount: false,
        enabled: options.getApiEnabled
    })
}

export default useApplyAdvance;