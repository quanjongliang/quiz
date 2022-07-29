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
exports.TagQuizTag = exports.TAG_QUIZ_TAG_RELATION = exports.TAG_QUIZ_TAG_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const quiz_1 = require("../quiz");
const tag_1 = require("../tag");
exports.TAG_QUIZ_TAG_TABLE_NAME = "tag_quiz_tag";
exports.TAG_QUIZ_TAG_RELATION = {
    QUIZ: "quiz",
    TAG: "tag",
};
let TagQuizTag = class TagQuizTag extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_1.Quiz, (q) => q.tagQuizTag, { nullable: true, cascade: true }),
    __metadata("design:type", quiz_1.Quiz)
], TagQuizTag.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tag_1.Tag, (t) => t.tagQuizTag, { nullable: true, cascade: true }),
    __metadata("design:type", tag_1.Tag)
], TagQuizTag.prototype, "tag", void 0);
TagQuizTag = __decorate([
    (0, typeorm_1.Entity)(exports.TAG_QUIZ_TAG_TABLE_NAME)
], TagQuizTag);
exports.TagQuizTag = TagQuizTag;
//# sourceMappingURL=tag-quiz-tag.entity.js.map