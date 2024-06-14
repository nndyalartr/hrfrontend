import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
import { PreOnBoard } from "../interfaces/types";
const createPreOnBoard: any = (options: PreOnBoard) => {
    return privateAxios({
        url: `/create-onoard-init/`,
        method: options.type,
        data: {
            email: options.email,
            name: options.name,
            designation: options.designation,
            dob: options.dob,
            doj: options.doj,
            mobile: options.mobile
        }
    })
}

const useCreatePreOnBoard = (options: PreOnBoard, onSuccess: any, onError: any) => {
    return useQuery(["on-board"], () => createPreOnBoard(options), {
        onSuccess,
        onError,
        refetchOnMount: false,
        enabled: options.getApiEnabled
    })
}

export default useCreatePreOnBoard;