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
exports.User = exports.USER_TABLE_NAME = exports.USER_ROLE = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const quiz_1 = require("../quiz");
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["ADMIN"] = "ADMIN";
    USER_ROLE["USER"] = "USER";
})(USER_ROLE = exports.USER_ROLE || (exports.USER_ROLE = {}));
exports.USER_TABLE_NAME = "user";
let User = class User extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: USER_ROLE, default: USER_ROLE.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmedEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "currentHashedRefreshToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_1.Quiz, (q) => q.user),
    __metadata("design:type", Array)
], User.prototype, "quizs", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map