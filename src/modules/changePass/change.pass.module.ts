import { ApiException } from "~/@helpers/network/common";
import { authApiService } from "~/services/network/api.service";
import { ChangePassDTO } from ".";
import { IMessageRepose } from "../common.dto";


const ENPOINT = {
    changePass: 'auth/update-password'.trim(),
}

const changePass = async (body?: ChangePassDTO.ChangePassDTO): Promise<IMessageRepose> => {
    try {
        const res = await authApiService.post(ENPOINT.changePass, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error;
    }
};

export default {
    changePass
}