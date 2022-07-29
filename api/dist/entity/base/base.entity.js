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
exports.RELATION_WITH = exports.BaseColumn = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const TIMESTAMP_TYPE = "timestamp without time zone";
class BaseColumn {
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BaseColumn.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" }),
    (0, typeorm_1.CreateDateColumn)({ type: TIMESTAMP_TYPE }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BaseColumn.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" }),
    (0, typeorm_1.UpdateDateColumn)({ type: TIMESTAMP_TYPE }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BaseColumn.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BaseColumn.prototype, "isDeleted", void 0);
exports.BaseColumn = BaseColumn;
const RELATION_WITH = (relations) => {
    return { relations: relations };
};
exports.RELATION_WITH = RELATION_WITH;
//# sourceMappingURL=base.entity.js.map