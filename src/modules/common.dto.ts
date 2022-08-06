export type TDataType = Number | number | String | string | Boolean | boolean | undefined | null

export interface IPageResponse<T = any> {
    total?: number,
    res?: T[]
}
export interface IMessageRepose {
    message?: string;
}

export interface IMessageRepo {
    message?: string;
    code?: number;
    data?: {
        message?: string;
        statusCode?: string
    }
}
export interface IMessageDataRespon {
    data: [];
    total: number;
}
export interface ArrDTO {
    code: string;
    name: string;
}
export interface ExceptionErr {
    data?: {
        message?: string;
    };
};
export interface GeolocationDTO {
    lat: number;
    lng: number;
}
export interface CommonIdDTO {
    id: string;
}
export interface CommonPaginationDTO {
    skip: number;
    take: number;
}
export interface CommonPicker {
    label: string;
    value: string
}