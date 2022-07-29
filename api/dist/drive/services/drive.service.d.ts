/// <reference types="multer" />
import { DriveReposiotry } from "@/repository/drive";
import { drive_v3 } from "googleapis";
import { FileDownloadInterface } from "../intefaces";
export declare class DriveService {
    private driveRepository;
    private googleAuth;
    private driveService;
    constructor(driveRepository: DriveReposiotry);
    uploadFile(file: Express.Multer.File): Promise<drive_v3.Schema$File & import("../../entity").Drive>;
    getFileUrlById(fileId: string): Promise<import("googleapis-common").GaxiosResponse<drive_v3.Schema$File>>;
    setFilePublic(fileId: string): Promise<import("googleapis-common").GaxiosResponse<drive_v3.Schema$Permission>>;
    deleteFile(fileId: string): Promise<import("googleapis-common").GaxiosResponse<void>>;
    downloadFile(fileId: string): Promise<FileDownloadInterface>;
}
