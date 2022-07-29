import { Connection } from "typeorm";
import { DriveReposiotry } from "./repository/drive";
export declare class AppService {
    private driveRepository;
    constructor(driveRepository: DriveReposiotry, connection: Connection);
    getHello(): string;
    getConcat(): Promise<import("./entity").Drive[]>;
    downloadFileDrive(id: string): Promise<void>;
    compareImage(): Promise<{
        distance: number;
        result: string;
    }>;
}
