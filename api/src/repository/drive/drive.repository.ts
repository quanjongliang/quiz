import { CustomRepository } from "@/decorator";
import { Drive, User } from "@/entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, EntityRepository, Repository } from "typeorm";

// @EntityRepository(Drive)
@CustomRepository(Drive)
export class DriveReposiotry extends Repository<Drive> {
  async findOneIfExist(id: string): Promise<Drive> {
    const drive = await this.findOne({ where:{id} });
    if (!drive) throw new NotFoundException(`Drive id: ${id} not found`);
    return drive;
  }
}

// @Injectable()
// export class DriveReposiotry extends Repository<Drive>{
//   constructor(private data: DataSource){
//     super(Drive,data.createEntityManager())
//   }
//     async findOneIfExist(id: string): Promise<Drive> {
//     const drive = await this.findOne({ where:{id} });
//     if (!drive) throw new NotFoundException(`Drive id: ${id} not found`);
//     return drive;
//   }
// }

