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
exports.Tag = exports.TAG_RELATION = exports.TAG_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const tag_quiz_tag_1 = require("../tag-quiz-tag");
exports.TAG_TABLE_NAME = 'tag';
exports.TAG_RELATION = {
    PARENT: 'tagParent',
    CHILDREN: 'tagChildren'
};
let Tag = class Tag extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Tag.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Tag.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", Tag)
], Tag.prototype, "tagParent", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], Tag.prototype, "tagChildren", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tag_quiz_tag_1.TagQuizTag, tQT => tQT.quiz),
    __metadata("design:type", Array)
], Tag.prototype, "tagQuizTag", void 0);
Tag = __decorate([
    (0, typeorm_1.Entity)(exports.TAG_TABLE_NAME),
    (0, typeorm_1.Tree)('closure-table')
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map