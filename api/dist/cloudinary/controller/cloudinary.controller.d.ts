/// <reference types="multer" />
import { CloundinaryService } from "../service";
export declare class CloundinaryController {
    private cloudinaryService;
    constructor(cloudinaryService: CloundinaryService);
    postBannerImage(files: Array<Express.Multer.File>): Promise<void>;
}
