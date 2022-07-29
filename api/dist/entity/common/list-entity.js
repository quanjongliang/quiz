"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIST_ENTITY = void 0;
const cloudinary_1 = require("../cloudinary");
const drive_1 = require("../drive");
const quiz_1 = require("../quiz");
const quiz_content_1 = require("../quiz-content");
const tag_1 = require("../tag");
const tag_quiz_tag_1 = require("../tag-quiz-tag");
const user_1 = require("../user");
const vn_pay_1 = require("../vn-pay");
exports.LIST_ENTITY = [drive_1.Drive, user_1.User, cloudinary_1.Cloundinary, vn_pay_1.VnPay, quiz_1.Quiz, quiz_content_1.QuizContent, tag_1.Tag, tag_quiz_tag_1.TagQuizTag];
//# sourceMappingURL=list-entity.js.map