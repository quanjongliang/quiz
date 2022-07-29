/// <reference types="multer" />
import { CloundinaryService } from "@/cloudinary";
import { DriveService } from "@/drive";
import { AppService } from "./app.service";
import { Response } from "express";
import { PdfService } from "@/pdf";
export declare class AppController {
    private readonly appService;
    private cloundinaryService;
    private driveService;
    private pdfService;
    constructor(appService: AppService, cloundinaryService: CloundinaryService, driveService: DriveService, pdfService: PdfService);
    getHello(): string;
    uploadFile(file: Express.Multer.File): Promise<import("googleapis").drive_v3.Schema$File & import("./entity").Drive>;
    deleteFile(publicId: string): Promise<[any, import("typeorm").DeleteResult]>;
    getConcatField(): Promise<import("./entity").Drive[]>;
    downloadFile(id: string, res: Response): Promise<void>;
    getPdfFile(name: string, res: Response): Promise<void>;
    compareImage(): Promise<{
        distance: number;
        result: string;
    }>;
}
