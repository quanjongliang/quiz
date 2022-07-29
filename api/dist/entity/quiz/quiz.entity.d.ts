import { BaseColumn } from "../base";
import { QuizContent } from "../quiz-content/quiz-content.entity";
import { TagQuizTag } from "../tag-quiz-tag";
import { User } from "../user";
export declare const QUIZ_TABLE_NAME = "quiz";
export declare const QUIZ_RELATION: {
    QUIZ_CONTENT: string;
    TAG_QUIZ_TAG: string;
    CREATOR: string;
};
export declare enum QUIZ_RESULT_STATUS {
    COMPLETED = "COMPLETED",
    PENDING = "PENDING",
    ON_GOING = "ON_GOING",
    CANCEL = "CANCEL"
}
export declare enum QUIZ_TYPE {
    QUIZ = "QUIZ",
    RESULT = "RESULT"
}
export declare class Quiz extends BaseColumn {
    name: string;
    description: string;
    time: number;
    timeComplete: number;
    note: string;
    type: QUIZ_TYPE;
    status: QUIZ_RESULT_STATUS;
    quizContent: QuizContent[];
    tagQuizTag: TagQuizTag[];
    quizSource?: Quiz;
    quizResults: Quiz[];
    user: User;
}
