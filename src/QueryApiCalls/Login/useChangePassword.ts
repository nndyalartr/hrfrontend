import { useMutation } from "@tanstack/react-query"
import { privateAxios } from "../../utils/AxiosUtils";

const changePasswordApi: any = ({ email, oldPassword, newPassword }: any) => {
    const requestObject: any = {
        user_email: email,
        old_password: oldPassword,
        new_password: newPassword
    };
    return privateAxios({
        url: `/change-password/`,
        method: "POST",
        data: requestObject
    })
};

const useChangePassword = () => {
    return useMutation(changePasswordApi, {
        mutationKey: [`user-change-password`]
    });
};

export default useChangePassword;
