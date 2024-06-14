import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { privateAxios } from "../utils/AxiosUtils";
const getAllFiles: any = (options:{getApiEnabled:boolean,id:string}) => {
    return privateAxios({
        url:`/test/?id=${options.id}`,
        method:"GET"
    })
}

const useGetAllFiles = (options:{getApiEnabled:boolean,id:string},onSuccess:any,onError:any) => {
    return useQuery( ["all-files"] ,()=>getAllFiles(options),{
        onSuccess,
        onError,
        refetchOnMount:false,
        enabled:options.getApiEnabled
    })
}

export default useGetAllFiles;