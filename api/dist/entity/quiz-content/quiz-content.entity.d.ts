import { BaseColumn } from "../base";
import { Quiz } from "../quiz/quiz.entity";
export declare const QUIZ_CONTENT_TABLE_NAME = "quiz-content";
export declare enum QUIZ_CONTENT_TYPE {
    QUESTION = "QUESTION",
    ANSWER = "ANSWER"
}
export declare const QUIZ_CONTENT_RELATION: {
    QUESTION: string;
    ANSWERS: string;
};
export declare class QuizContent extends BaseColumn {
    content: string;
    type: QUIZ_CONTENT_TYPE;
    question?: QuizContent;
    answers?: QuizContent[];
    isCorrect: boolean;
    quiz: Quiz;
}
