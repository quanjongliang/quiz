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
exports.CloundinaryService = void 0;
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const fs = require("fs");
let CloundinaryService = class CloundinaryService {
    constructor(cloudinaryRepository) {
        this.cloudinaryRepository = cloudinaryRepository;
        cloudinary_1.v2.config({
            cloud_name: "dv6zan7ag",
            api_key: "756826445571745",
            api_secret: "nzl5H1ZXNUxxq0RxGOblGuYBELA",
        });
    }
    async uploadFile(file, isBanner = false, order = 0, isAvatar = false) {
        try {
            const path = `./${file.path}`;
            const result = await cloudinary_1.v2.uploader.upload(path);
            fs.unlinkSync(`./${path}`);
            return this.cloudinaryRepository.save(Object.assign(Object.assign({}, result), { isBanner,
                order,
                isAvatar }));
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteFile(publicId) {
        return Promise.all([
            cloudinary_1.v2.uploader.destroy(publicId),
            this.cloudinaryRepository.delete({ public_id: publicId }),
        ]);
    }
    async deleteMultiFile(publicIds) {
        return Promise.all([...publicIds.map((id) => this.deleteFile(id))]);
    }
    async uploadMultiFiles(files) {
        const promiseUploadFile = files.map((file, index) => this.uploadFile(file, true, index + 1));
        await Promise.all([...promiseUploadFile]);
    }
    async uploadMultiFilesAccount(files) {
        const promiseUploadFile = files.map((file, index) => this.uploadFile(file, false, index + 1, index === 0));
        return Promise.all([...promiseUploadFile]);
    }
};
CloundinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.CloundinaryReposiotry])
], CloundinaryService);
exports.CloundinaryService = CloundinaryService;
//# sourceMappingURL=cloudinary.service.js.map