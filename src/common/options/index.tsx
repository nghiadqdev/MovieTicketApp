const BUTTON_TRIPS = [
    { name: "GetOutParkScreen", text: "Ra bãi" },
    { name: "PickUpPointScreen", text: "Đã đến đón" },
    { name: "ReceiveCustomerScreen", text: "Nhận khách" },
    { name: "ReturnCustomerScreen", text: "Trả khách" },
    { name: "GoToParkScreen", text: "Về bãi" }
];

const ISSUES_DRIVER_TYPE = {
    PhatSinh: { value: 'PHATSINH', label: 'Phát sinh' },
    TaiNan: { value: 'TAINAN', label: 'Tai nạn' },
    NghiPhep: { value: 'NGHIPHEP', label: 'Nghỉ phép' },
    DoiTai: { value: 'DOITAI', label: 'Đổi tài' },
};

const ISSUES_STATUS_CONST = {
    Open: { value: 'OPEN', label: 'Mới tạo' },
    Processing: { value: 'PROCESSING', label: 'Đang xử lý' },
    Complete: { value: 'COMPLETE', label: 'Đã xử lý' },
    Cancel: { value: 'CANCEL', label: 'Hủy', percent: 100, successPercent: 0, typeCss: 'exception' },
    Close: { value: 'CLOSE', label: 'Đóng', percent: 100, successPercent: 0, typeCss: 'exception' },
};

const MENU_PERSONAL = [
    { icon: "md-car-outline", text: "Trả xe", screen: "ChangePassScreen" },
    // { icon: "ios-logo-ionic", text: "Đổi trạng thái", screen: "ChangeStatusScreen" },
];

export const Options = {
    MENU_PERSONAL,

    BUTTON_TRIPS,
    ISSUES_DRIVER_TYPE,
    ISSUES_STATUS_CONST,
}