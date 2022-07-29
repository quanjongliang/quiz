/// <reference types="multer" />
import { Cloundinary } from "@/entity";
import { CloundinaryReposiotry } from "@/repository";
export declare class CloundinaryService {
    private cloudinaryRepository;
    constructor(cloudinaryRepository: CloundinaryReposiotry);
    uploadFile(file: Express.Multer.File, isBanner?: boolean, order?: number, isAvatar?: boolean): Promise<Cloundinary>;
    deleteFile(publicId: string): Promise<[any, import("typeorm").DeleteResult]>;
    deleteMultiFile(publicIds: string[]): Promise<[any, import("typeorm").DeleteResult][]>;
    uploadMultiFiles(files: Array<Express.Multer.File>): Promise<void>;
    uploadMultiFilesAccount(files: Array<Express.Multer.File>): Promise<Cloundinary[]>;
}
