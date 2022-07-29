"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("../entity");
const common_1 = require("@nestjs/common");
const user_1 = require("./user");
const cloudinary_1 = require("./cloudinary");
const drive_1 = require("./drive");
const vn_pay_1 = require("./vn-pay");
const quiz_1 = require("./quiz");
const quiz_content_1 = require("./quiz-content");
const tag_1 = require("./tag");
const tag_quiz_tag_1 = require("./tag-quiz-tag");
const ENTITY_LIST = [entity_1.User, entity_1.Cloundinary, entity_1.Drive, entity_1.VnPay, entity_1.Quiz, entity_1.QuizContent, entity_1.Tag, entity_1.TagQuizTag];
const REPOSITORY_LIST = [
    user_1.UserRepository,
    cloudinary_1.CloundinaryReposiotry,
    drive_1.DriveReposiotry,
    vn_pay_1.VnPayRepository,
    quiz_1.QuizRepository,
    quiz_content_1.QuizContentRepository,
    tag_1.TagRepository,
    tag_quiz_tag_1.TagQuizTagRepository
];
let RepositoryModule = class RepositoryModule {
};
RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...ENTITY_LIST, ...REPOSITORY_LIST])],
        exports: [typeorm_1.TypeOrmModule],
    })
], RepositoryModule);
exports.RepositoryModule = RepositoryModule;
//# sourceMappingURL=repository.module.js.map