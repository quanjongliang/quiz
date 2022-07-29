import { BaseColumn } from "../base";
export declare const VNPAY_TABLE_NAME = "vn-pay";
export declare enum BankCode {
    VNPAYQR = "VNPAYQR",
    NCB = "NCB",
    SCB = "SCB",
    SACOMBANK = "SACOMBANK",
    EXIMBANK = "EXIMBANK",
    MSBANK = "MSBANK",
    NAMABANK = "NAMABANK",
    VISA = "VISA",
    VNMART = "VNMART",
    VIETINBANK = "VIETINBANK",
    VIETCOMBANK = "VIETCOMBANK",
    HDBANK = "HDBANK",
    DONGABANK = "DONGABANK",
    TPBANK = "TPBANK",
    OJB = "OJB",
    BIDV = "BIDV",
    TECHCOMBANK = "TECHCOMBANK",
    VPBANK = "VPBANK",
    AGRIBANK = "AGRIBANK",
    MBBANK = "MBBANK",
    ACB = "ACB",
    OCB = "OCB",
    SHB = "SHB",
    IVB = "IVB"
}
export declare enum LanguageCode {
    VN = "vn",
    EN = "en"
}
export declare enum OrderType {
    TOPUP = "topup",
    BILLPAYMENT = "billpayment",
    FASHION = "fashion"
}
export declare class VnPay extends BaseColumn {
    orderId: string;
    vnp_Command: string;
    vnp_TmnCode: string;
    vnp_Locale: LanguageCode;
    vnp_Version: string;
    vnp_TxnRef: string;
    vnp_CurrCode: string;
    vnp_OrderInfo: string;
    vnp_OrderType: string;
    vnp_Amount: number;
    vnp_ReturnUrl: string;
    vnp_IpAddr: string;
    vnp_CreateDate: string;
    vnp_BankCode: BankCode;
}
