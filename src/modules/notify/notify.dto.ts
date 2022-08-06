export interface BodyNotifyDTO {
    skip: number,
    take: number
}

export interface NotifyDTO {
    id?: string;
    createdBy?: Date;
    updatedBy?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
    title?: string;
    time?: Date;
    description?: string;
    status?: string;
    driverId?: string;
}
