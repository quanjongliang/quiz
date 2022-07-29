import { Drive } from "@/entity";
import { Repository } from "typeorm";
export declare class DriveReposiotry extends Repository<Drive> {
    findOneIfExist(id: string): Promise<Drive>;
}
