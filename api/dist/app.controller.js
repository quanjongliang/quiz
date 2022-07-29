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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const cloudinary_1 = require("./cloudinary");
const drive_1 = require("./drive");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("./app.service");
const pdf_1 = require("./pdf");
let AppController = class AppController {
    constructor(appService, cloundinaryService, driveService, pdfService) {
        this.appService = appService;
        this.cloundinaryService = cloundinaryService;
        this.driveService = driveService;
        this.pdfService = pdfService;
    }
    getHello() {
        return this.appService.getHello();
    }
    uploadFile(file) {
        return this.driveService.uploadFile(file);
    }
    deleteFile(publicId) {
        return this.cloundinaryService.deleteFile(publicId);
    }
    getConcatField() {
        return this.appService.getConcat();
    }
    async downloadFile(id, res) {
        try {
            const { newName, mimeType, file } = await this.driveService.downloadFile(id);
            res.setHeader("Content-type", mimeType);
            res.setHeader("Content-disposition", "attachment; filename=" + newName);
            res.send(file);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getPdfFile(name, res) {
        return this.pdfService.createResumePdf(res);
    }
    async compareImage() {
        return this.appService.compareImage();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)(":publicId"),
    __param(0, (0, common_1.Param)("publicId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Get)("concat"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getConcatField", null);
__decorate([
    (0, common_1.Get)("download/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Get)("pdf/:name"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPdfFile", null);
__decorate([
    (0, common_1.Get)('compare-image'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "compareImage", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        cloudinary_1.CloundinaryService,
        drive_1.DriveService,
        pdf_1.PdfService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map