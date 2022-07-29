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
exports.Quiz = exports.QUIZ_TYPE = exports.QUIZ_RESULT_STATUS = exports.QUIZ_RELATION = exports.QUIZ_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const quiz_content_entity_1 = require("../quiz-content/quiz-content.entity");
const tag_quiz_tag_1 = require("../tag-quiz-tag");
const user_1 = require("../user");
exports.QUIZ_TABLE_NAME = "quiz";
exports.QUIZ_RELATION = {
    QUIZ_CONTENT: "quizContent",
    TAG_QUIZ_TAG: "tagQuizTag",
    CREATOR: "creator",
};
var QUIZ_RESULT_STATUS;
(function (QUIZ_RESULT_STATUS) {
    QUIZ_RESULT_STATUS["COMPLETED"] = "COMPLETED";
    QUIZ_RESULT_STATUS["PENDING"] = "PENDING";
    QUIZ_RESULT_STATUS["ON_GOING"] = "ON_GOING";
    QUIZ_RESULT_STATUS["CANCEL"] = "CANCEL";
})(QUIZ_RESULT_STATUS = exports.QUIZ_RESULT_STATUS || (exports.QUIZ_RESULT_STATUS = {}));
var QUIZ_TYPE;
(function (QUIZ_TYPE) {
    QUIZ_TYPE["QUIZ"] = "QUIZ";
    QUIZ_TYPE["RESULT"] = "RESULT";
})(QUIZ_TYPE = exports.QUIZ_TYPE || (exports.QUIZ_TYPE = {}));
let Quiz = class Quiz extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "bigint" }),
    __metadata("design:type", Number)
], Quiz.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "bigint" }),
    __metadata("design:type", Number)
], Quiz.prototype, "timeComplete", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Quiz.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: QUIZ_TYPE, default: QUIZ_TYPE.QUIZ }),
    __metadata("design:type", String)
], Quiz.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: QUIZ_RESULT_STATUS, nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_content_entity_1.QuizContent, (qC) => qC.quiz),
    __metadata("design:type", Array)
], Quiz.prototype, "quizContent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tag_quiz_tag_1.TagQuizTag, (tQT) => tQT.quiz),
    __metadata("design:type", Array)
], Quiz.prototype, "tagQuizTag", void 0);
__decorate([
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", Quiz)
], Quiz.prototype, "quizSource", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], Quiz.prototype, "quizResults", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (u) => u.quizs, { nullable: true, cascade: true }),
    __metadata("design:type", user_1.User)
], Quiz.prototype, "user", void 0);
Quiz = __decorate([
    (0, typeorm_1.Entity)(exports.QUIZ_TABLE_NAME),
    (0, typeorm_1.Tree)("closure-table")
], Quiz);
exports.Quiz = Quiz;
//# sourceMappingURL=quiz.entity.js.map