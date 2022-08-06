import { ApiException } from "~/@helpers/network/common";
import { authApiService } from "~/services/network/api.service"
import { CarsDTO, LanguageDTO, ReasonList, ScheduleDTO } from ".";
import { IMessageDataRespon, IMessageRepo, IMessageRepose } from "..";
import { ExceptionErr } from "../common.dto";
import { BodyRequestFCM, InternationalPhoneNumberDTO, LoginRequest, UserDto, WorkDayDTO, } from "./auth.dto";

const ENPOINT = {
    login: "auth/login".trim(), 
}

const signIn = async (body: LoginRequest) => {
    try {
        const res = await authApiService.post(ENPOINT.login, body) as UserDto;
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}

export default {
    signIn,
}