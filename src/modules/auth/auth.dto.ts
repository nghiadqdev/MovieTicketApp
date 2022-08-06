export class LoginRequest {
    username?: string;
    password?: string
}
export class BodyRequestFCM {
    userId: string;
    fcmToken: string;
}
export class UserDto {
    accessToken?: string;
    departmentCode?: string;
    employeeId?: string;
    permission?: Array<[]>;
    enumData: {
        MessengerType: MessengerType,
        StatusFilter: StatusFilter,
        OrderStatus: OrderStatus,
        PaymentStatus: PaymentStatus,
        ScheduleStatus: ScheduleStatus,
        ScheduleActive: ScheduleActive
    }
}
export interface ScheduleStatus {
    On: InfoDTO;
    BusyOrder: InfoDTO;
    BusyPrivate: InfoDTO;
    Off: InfoDTO;
}
export interface ScheduleActive {
    Open: InfoDTO;
    LockInside: InfoDTO;
    LockOutside: InfoDTO;
}
export interface InfoDTO {
    code: string;
    name: string;
}
export interface PaymentStatus {
    NonPaid: Paid;
    Paid: Paid;
}
export interface Paid {
    code: string;
    name: string;
    description: string;
}
export interface OrderStatus {
    New: Status;
    Wait: Status;
    Confirm: Status;
    Doing: Status;
    Complete: Status;
    Cancel: Status;
}
export interface Status {
    code: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    sort?: number;
}
export interface StatusFilter {
    All: Active;
    Active: Active;
    InActive: Active;
}
export interface Active {
    value: number;
    code: string;
    name: string;
}
export interface CommonEnumDTO {
    code: string;
    name: string;
    description: string;
}

export interface MessengerType {
    Sms: CommonEnumDTO,
    Whatsapp: CommonEnumDTO
}
export interface WorkDayDTO {
    id: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    name: string;
    code: string;
    description: null;
}
export interface ScheduleDTO {
    id: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    scheduleDate: Date;
    driverId: string;
    shiftId: string;
    carId: string;
    carWaitId: null;
    status: string;
    active: string;
    description: null;
    carNo: string;
    carRegNo: string;
    shiftName: string;
    driverName: string;
}

export interface ReasonList {
    id: string;
    createdBy: string;
    updatedBy: null;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    name: string;
    code: string;
    description: null;
    checked?: boolean
}
export interface BodyReasonDTO {
    reason: string;
    status?: boolean;
}
export interface LanguageDTO {
    id: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    name: string;
    code: string;
    description: string;
}
export interface InformationDTO {
    driverName: string;
    carNumber: string;
    dirverCode: string;
    carSeat: string;
    doanhThu: number;
    kmDaTh: number;
    soChuyenDaTh: number;
    soChuyenDatTruoc: number;
    image: string;
    cashPayment: number,
    vnPayPayment: number,
    priceVnpay: number,
    priceCash: number

}
export interface InternationalPhoneNumberDTO {
    name: string;
    code: string;
    dial_code: string;
}
export interface CarsDTO {
    id: string;
    createdBy: string;
    updatedBy: null;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    trackingId: number;
    plate: string;
    no: string;
    regNo: string;
    type: string;
    status: string;
    modelId: string;
    seatId: string;
    description: null;
}