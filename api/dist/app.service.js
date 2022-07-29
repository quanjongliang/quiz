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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const drive_1 = require("./repository/drive");
const http = require("http");
const fs = require("fs");
const jimp = require("jimp");
let AppService = class AppService {
    constructor(driveRepository, connection) {
        this.driveRepository = driveRepository;
    }
    getHello() {
        return "Hello World!";
    }
    async getConcat() {
        return this.driveRepository.createQueryBuilder('drive')
            .addSelect(`(CONCAT(webContentLink, ' ' , name) concated)`)
            .getMany();
    }
    async downloadFileDrive(id) {
        const drive = await this.driveRepository.findOne({ where: { id } });
        if (!drive)
            throw new common_1.NotFoundException(`Drive id: ${id} not found`);
        const { webViewLink, name } = drive;
        const file = fs.createWriteStream(name);
        http.get(webViewLink, function (response) {
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log("Download Completed");
            });
        });
    }
    async compareImage() {
        const logo = await jimp.read('images/logo.jpeg');
        const logo2 = await jimp.read('images/logo-2.jpeg');
        const logoHash = logo.hash();
        const logo2Hash = logo2.hash();
        const distance = jimp.distance(logo, logo2);
        const diff = jimp.diff(logo, logo2);
        return {
            distance,
            result: distance > 0.2 ? 'Image dont match' : 'Image match',
        };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [drive_1.DriveReposiotry,
        typeorm_1.Connection])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map