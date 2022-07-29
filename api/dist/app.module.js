"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_1 = require("./auth");
const cloudinary_1 = require("./cloudinary");
const mailer_1 = require("./mailer");
const repository_1 = require("./repository");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_1 = require("./database");
const upload_file_interceptor_1 = require("./interceptors/upload-file.interceptor");
const drive_module_1 = require("./drive/drive.module");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const pdf_1 = require("./pdf");
const axios_1 = require("@nestjs/axios");
const decorator_1 = require("./decorator");
const entity_1 = require("./entity");
const quiz_module_1 = require("./quiz/quiz.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: "./uploads",
                    filename: (_req, file, cb) => {
                        const randomName = (0, uuid_1.v4)();
                        cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
                    },
                }),
            }),
            database_1.DatabaseModule,
            mailer_1.MailerModule,
            repository_1.RepositoryModule,
            auth_1.AuthModule,
            platform_express_1.MulterModule,
            cloudinary_1.CloudinaryModule,
            drive_module_1.DriveModule,
            pdf_1.PdfModule,
            axios_1.HttpModule,
            decorator_1.TypeOrmExModule.forCustomRepository(entity_1.LIST_ENTITY),
            quiz_module_1.QuizModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, upload_file_interceptor_1.UploadFileInterceptor,],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map