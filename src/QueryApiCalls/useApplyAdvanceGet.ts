import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { ApplyAdvance } from "../interfaces/types";
const advanceApply: any = (options: {userEmail:string, getApiEnabled:boolean}) => {
    return privateAxios({
        url: `apply/advance/?user_email?${options.userEmail}`,
        method: "GET",
    })
}

const useApplyAdvanceGet = (options: {userEmail:string, getApiEnabled:boolean}, onSuccess: any, onError: any) => {
    return useQuery(["Apply-Advance-get"], () => advanceApply(options), {
        onSuccess,
        onError,
        refetchOnMount: false,
        enabled: options.getApiEnabled
    })
}

export default useApplyAdvanceGet;