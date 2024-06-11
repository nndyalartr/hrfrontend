import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "../utils/AxiosUtils";
import { TeamAttendanceType } from "../interfaces/types";
const listTeamAttendanceLogs: any = (options: TeamAttendanceType) => {
    console.log(options.date)
    let url = `team-attendance/?email=${options.userEmail}`
    if (options.date) {
        url = `team-attendance/?email=${options.userEmail}&date=${options.date}`
    }
    return privateAxios({
        url: url,
        method: options.type,
        data: {

        }
    })
}

const useListTeamAttendanceList = (options: TeamAttendanceType, onSuccess: any, onError: any) => {
    return useQuery(["team-attendance"], () => listTeamAttendanceLogs(options), {
        onSuccess: onSuccess,
        onError: onError,
        refetchOnMount: false,
        enabled: options.getApiEnabled
    })
}

export default useListTeamAttendanceList;