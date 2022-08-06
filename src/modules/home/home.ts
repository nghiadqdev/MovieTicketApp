import { ApiException } from "~/@helpers/network/common";
import { apiService } from "~/services/network/api.service"
import { ListTaskRequest, DetailTaskRequest, StartTaskRequest } from "./home.dto";

const ENPOINT = {
    listTaskApproved: "/mobile/job_list_approved".trim(),
    listTaskDoing: "/mobile/job_list_doing".trim(),
    listTaskDone: "/mobile/job_list_done".trim(),
    detailTask: "/mobile/job_detail/".trim(),
    startTask: "/mobile/update_process/".trim(),
    doneTask: "/mobile/update_complete/".trim(),
    cancelTask: "/mobile/update_cancel/".trim(),
    loadRoom: "/mobile/load_room/".trim(),
    loadApartment: "/mobile/load_apartment/".trim(),
    loadRoomByApm: "/mobile/load_room_by_apartment/".trim(),

    
}

const apiListTaskApproved = async (body: ListTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.listTaskApproved, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}
const apiListTaskDoing = async (body: ListTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.listTaskDoing, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}
const apiListTaskDone = async (body: ListTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.listTaskDone, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}

const apiDetailTask = async (body: DetailTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.detailTask, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}

const apiStartTask = async (body: StartTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.startTask, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}
const apiDoneTask = async (body: DetailTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.doneTask, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}
const apiCancelTask = async (body: DetailTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.cancelTask, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}

const apiGetRoom =async () => {
    try {
        const res = await apiService.post(ENPOINT.loadRoom);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}

const apiGetApartment =async () => {
    try {
        const res = await apiService.post(ENPOINT.loadApartment);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}

const apiGetRoomByApm =async (body: DetailTaskRequest) => {
    try {
        const res = await apiService.post(ENPOINT.loadRoomByApm, body);
        if (!res) {
            throw new ApiException('Server Error', 500);
        }
        return res;
    } catch (error) {
        throw error
    }
}

export {
    apiListTaskApproved,
    apiListTaskDoing,
    apiListTaskDone,
    apiDetailTask,
    apiStartTask,
    apiDoneTask,
    apiCancelTask,
    apiGetRoom,
    apiGetApartment,
    apiGetRoomByApm
}