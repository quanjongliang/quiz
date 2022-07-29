import { BaseColumn } from "../base";
import { TagQuizTag } from "../tag-quiz-tag";
export declare const TAG_TABLE_NAME = "tag";
export declare const TAG_RELATION: {
    PARENT: string;
    CHILDREN: string;
};
export declare class Tag extends BaseColumn {
    name: string;
    description: string;
    slug: string;
    tagParent?: Tag;
    tagChildren: Tag[];
    tagQuizTag: TagQuizTag[];
}
