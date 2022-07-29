"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnPay = exports.OrderType = exports.LanguageCode = exports.BankCode = exports.VNPAY_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
exports.VNPAY_TABLE_NAME = 'vn-pay';
var BankCode;
(function (BankCode) {
    BankCode["VNPAYQR"] = "VNPAYQR";
    BankCode["NCB"] = "NCB";
    BankCode["SCB"] = "SCB";
    BankCode["SACOMBANK"] = "SACOMBANK";
    BankCode["EXIMBANK"] = "EXIMBANK";
    BankCode["MSBANK"] = "MSBANK";
    BankCode["NAMABANK"] = "NAMABANK";
    BankCode["VISA"] = "VISA";
    BankCode["VNMART"] = "VNMART";
    BankCode["VIETINBANK"] = "VIETINBANK";
    BankCode["VIETCOMBANK"] = "VIETCOMBANK";
    BankCode["HDBANK"] = "HDBANK";
    BankCode["DONGABANK"] = "DONGABANK";
    BankCode["TPBANK"] = "TPBANK";
    BankCode["OJB"] = "OJB";
    BankCode["BIDV"] = "BIDV";
    BankCode["TECHCOMBANK"] = "TECHCOMBANK";
    BankCode["VPBANK"] = "VPBANK";
    BankCode["AGRIBANK"] = "AGRIBANK";
    BankCode["MBBANK"] = "MBBANK";
    BankCode["ACB"] = "ACB";
    BankCode["OCB"] = "OCB";
    BankCode["SHB"] = "SHB";
    BankCode["IVB"] = "IVB";
})(BankCode = exports.BankCode || (exports.BankCode = {}));
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["VN"] = "vn";
    LanguageCode["EN"] = "en";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));
var OrderType;
(function (OrderType) {
    OrderType["TOPUP"] = "topup";
    OrderType["BILLPAYMENT"] = "billpayment";
    OrderType["FASHION"] = "fashion";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
let VnPay = class VnPay extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], VnPay.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_Command", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_TmnCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: LanguageCode, default: LanguageCode.VN }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_Locale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_Version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_TxnRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_CurrCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_OrderInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_OrderType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], VnPay.prototype, "vnp_Amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_ReturnUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_IpAddr", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_CreateDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: BankCode }),
    __metadata("design:type", String)
], VnPay.prototype, "vnp_BankCode", void 0);
VnPay = __decorate([
    (0, typeorm_1.Entity)(exports.VNPAY_TABLE_NAME)
], VnPay);
exports.VnPay = VnPay;
//# sourceMappingURL=vn-pay.entity.js.map