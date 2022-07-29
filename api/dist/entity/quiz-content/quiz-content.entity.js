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
exports.QuizContent = exports.QUIZ_CONTENT_RELATION = exports.QUIZ_CONTENT_TYPE = exports.QUIZ_CONTENT_TABLE_NAME = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const quiz_entity_1 = require("../quiz/quiz.entity");
exports.QUIZ_CONTENT_TABLE_NAME = "quiz-content";
var QUIZ_CONTENT_TYPE;
(function (QUIZ_CONTENT_TYPE) {
    QUIZ_CONTENT_TYPE["QUESTION"] = "QUESTION";
    QUIZ_CONTENT_TYPE["ANSWER"] = "ANSWER";
})(QUIZ_CONTENT_TYPE = exports.QUIZ_CONTENT_TYPE || (exports.QUIZ_CONTENT_TYPE = {}));
exports.QUIZ_CONTENT_RELATION = {
    QUESTION: "question",
    ANSWERS: "answers",
};
let QuizContent = class QuizContent extends base_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], QuizContent.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: QUIZ_CONTENT_TYPE, default: QUIZ_CONTENT_TYPE.QUESTION }),
    __metadata("design:type", String)
], QuizContent.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", QuizContent)
], QuizContent.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], QuizContent.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], QuizContent.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, (q) => q.quizContent, { nullable: true }),
    __metadata("design:type", quiz_entity_1.Quiz)
], QuizContent.prototype, "quiz", void 0);
QuizContent = __decorate([
    (0, typeorm_1.Entity)(exports.QUIZ_CONTENT_TABLE_NAME),
    (0, typeorm_1.Tree)("closure-table")
], QuizContent);
exports.QuizContent = QuizContent;
//# sourceMappingURL=quiz-content.entity.js.map