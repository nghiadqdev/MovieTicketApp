export class ListTaskDto {
    id: string;
    createdBy: string;
    createdByName: string
    updatedBy: string
    updatedByName: string
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    name: string;
    code: string;

    jobCategoryId: string;
    employeeId: string;
    residentId: string;
    roomId: string;
    apartmentId: string;
    areaId: string;
    processDate: Date;
    completedDate: string;
    status: string;
    price: number;
    description: string;
    __histories__: Array<[{
        id: string
        createdBy: string
        createdByName: string
        updatedBy: string
        updatedByName: string
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        status: string;
        jobId: string;
        description: string;
    }]>;
    __resident__: object
    __has_resident__: boolean
    statusName: string
    employeeName: string
    jobCategoryName: string
    roomName: string
    areaName: string
    apartmentName: string
    residentname: string
}

export class DetailTaskDto {
    id: string;
    createdBy: string;
    createdByName: string
    updatedBy: string
    updatedByName: string
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    name: string;
    code: string;

    jobCategoryId: string;
    employeeId: string;
    residentId: string;
    roomId: string;
    apartmentId: string;
    areaId: string;
    processDate: Date;
    completedDate: string;
    status: string | 'APPROVED' | 'PROCESSING' | 'COMPLETE';
    price: number;
    description: string;
    __histories__: Array<[{
        id: string
        createdBy: string
        createdByName: string
        updatedBy: string
        updatedByName: string
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        status: string;
        jobId: string;
        description: string;
    }]>;
    __files__: Array<[{
        id: string
        createdBy: string
        createdByName: string
        updatedBy: string
        updatedByName: string
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        status: string;
        jobId: string;
        description: string;
    }]>;
    statusName: string
    employeeName: string
    jobCategoryName: string
    roomName: string
    areaName: string
    apartmentName: string
    residentname: string
}

export class ListTaskRequest {
    skip: number;
    take: number;
    code?: string
    name?: string
    roomId?: string
    apartmentId?: string
    dateFrom?: Date
    dateTo?: Date
    dateFromCompletedDate?: Date
    dateToCompletedDate?: Date
    dateFromCreatAt?: Date
    dateToCreatAt?: Date
}

export class RoomDto {
    id: string
    createdBy: string
    createdByName: string
    updatedBy: string
    updatedByName: string
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    name: string
    code: string
    apartmentId: string
    areaId: string
    acreage: number
    price: number
    status: string
    description: string
}
export class ApartmentDto {
    id: string
    createdBy: string
    createdByName: string
    updatedBy: string
    updatedByName: string
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    name: string
    code: string
    address: string
    description: string
    areaId: string
}

export class DetailTaskRequest {
    apartmentId: string
}

export class DoneTaskRequest {
    id: string;
    fileList: Array<[{ name: string, url: string }]>
}
export class StartTaskRequest {
    id: string;
    price: number;
}
