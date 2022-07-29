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
exports.DriveService = void 0;
const drive_1 = require("../../repository/drive");
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const common_2 = require("../common");
const crypto_1 = require("crypto");
let DriveService = class DriveService {
    constructor(driveRepository) {
        this.driveRepository = driveRepository;
        this.googleAuth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: "src/core/constants/googlekey.json",
            scopes: ["https://www.googleapis.com/auth/drive"],
        });
        this.driveService = googleapis_1.google.drive({ version: "v3", auth: this.googleAuth });
    }
    async uploadFile(file) {
        try {
            const { mimetype, path, filename } = file;
            const media = (0, common_2.getFileMediaDrive)(mimetype, path);
            const fileMetaData = (0, common_2.getFileMetaDataDrive)(filename);
            const response = await this.driveService.files.create({
                media,
                fields: "id",
                requestBody: fileMetaData,
            });
            await this.setFilePublic(response.data.id);
            (0, common_2.removeFileFs)(path);
            const { data } = await this.getFileUrlById(response.data.id);
            return this.driveRepository.save(data);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getFileUrlById(fileId) {
        return this.driveService.files.get({
            fileId,
            fields: "*",
        });
    }
    async setFilePublic(fileId) {
        return this.driveService.permissions.create({
            fileId,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });
    }
    async deleteFile(fileId) {
        return this.driveService.files.delete({ fileId });
    }
    async downloadFile(fileId) {
        const { id, name, mimeType } = await this.driveRepository.findOneIfExist(fileId);
        const newName = (0, crypto_1.randomUUID)() + name;
        if (!id)
            throw new common_1.NotFoundException(`Drive id: ${id} not found!`);
        return this.driveService.files
            .get({ fileId, alt: "media" }, { responseType: "stream" })
            .then(({ data }) => new Promise((resolve, reject) => {
            const buf = [];
            data.on("data", (e) => buf.push(e));
            data.on("error", (err) => reject(err));
            data.on("end", () => {
                const file = Buffer.concat(buf);
                return resolve({ file, mimeType, newName });
            });
        }));
    }
};
DriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [drive_1.DriveReposiotry])
], DriveService);
exports.DriveService = DriveService;
//# sourceMappingURL=drive.service.js.map