import { authApiService } from "~/services/network/api.service"
import { IMessageDataRespon, IMessageRepo } from "../common.dto";
import { BodyNotifyDTO, NotifyDTO } from "./notify.dto";

const ENPOINT = {
    loadNotify: "notify/list".trim(),
    detailNotify: "notify/detail".trim(),
    comfirmNotify: "notify/comfirm".trim(),
}

const loadNotify = async (body: BodyNotifyDTO): Promise<IMessageDataRespon> => {
    const emtyData = {
        data: [],
        total: 0
    } as IMessageDataRespon;
    try {
        const res = await authApiService.post(ENPOINT.loadNotify, body);
        if (res.length > 0) {
            return {
                data: res[0],
                total: res[1]
            } as IMessageDataRespon;
        } else {
            return emtyData;
        }
    } catch (error) {
        console.log(error);
        return emtyData;
    }
}

const detailNotify = async (id: string): Promise<NotifyDTO> => {
    try {
        const res = await authApiService.post(ENPOINT.detailNotify, { id });
        return res;
    } catch (error) {
        console.log(error);
        return {} as NotifyDTO;
    }
}

const comfirmNotify = async (id: string): Promise<IMessageRepo> => {
    try {
        const res = await authApiService.post(ENPOINT.comfirmNotify, { id });
        return {
            message: '',
            data: res,
            code: 200
        };
    } catch (error) {
        console.log('error');
        return {
            message: error.data.message,
            code: error.data.statusCode,
            data: {},
        };
    }
};

export default {
    loadNotify,
    detailNotify,
    comfirmNotify,
}