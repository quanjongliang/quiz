import { BaseColumn } from "../base";
import { Quiz } from "../quiz";
import { Tag } from "../tag";
export declare const TAG_QUIZ_TAG_TABLE_NAME = "tag_quiz_tag";
export declare const TAG_QUIZ_TAG_RELATION: {
    QUIZ: string;
    TAG: string;
};
export declare class TagQuizTag extends BaseColumn {
    quiz: Quiz;
    tag: Tag;
}
