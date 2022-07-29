import { Response } from "express";
import { HttpService } from "@nestjs/axios";
export declare class PdfService {
    private httpService;
    constructor(httpService: HttpService);
    createFilePdf(name: string, res: Response): Promise<void>;
    createResumePdf(res: Response): Promise<void>;
}
