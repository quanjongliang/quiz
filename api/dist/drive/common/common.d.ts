import { FileMediaDriveInteface, FileMetaDataDriveInferface } from "../intefaces";
export declare const getFileMetaDataDrive: (fileName: string) => FileMetaDataDriveInferface;
export declare const getFileMediaDrive: (mimeType: string, filePath: string) => FileMediaDriveInteface;
export declare const removeFileFs: (filePath: string) => void;
