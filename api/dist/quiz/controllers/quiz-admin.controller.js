"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAdminController = void 0;
const auth_1 = require("../../auth");
const entity_1 = require("../../entity");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let QuizAdminController = class QuizAdminController {
};
QuizAdminController = __decorate([
    (0, common_1.Controller)("quiz-admin"),
    (0, swagger_1.ApiTags)("auth"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, auth_1.Roles)(entity_1.USER_ROLE.ADMIN)
], QuizAdminController);
exports.QuizAdminController = QuizAdminController;
//# sourceMappingURL=quiz-admin.controller.js.map