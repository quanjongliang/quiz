export interface PromiseApi {
    statusCode?: number;
    data?: any;
    message?: string;
    error?: any;
    dataList?: any;
}
export interface ContentPackParams {
    name: string;
    description: string;
    numberOfContent: number;
    contentPackStatus: number;
    contentUpload: contentUpload[];
}

export interface contentUpload {
    fileUpload: File;
    duration: number;
    seq: number;
}
