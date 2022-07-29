import { AUTH_MESSAGE } from '@/core';
import { CustomRepository } from '@/decorator';
import { User } from '@/entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository, DataSource} from 'typeorm';

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//   async checkExistUser(id: string): Promise<User> {
//     const user = await this.findOne({ id });
//     if (!user) throw new NotFoundException(AUTH_MESSAGE.USER.NOT_FOUND);
//     return user;
//   }
// }

// @Injectable()
// export class UserRepository extends Repository<User>{
//   constructor(private data: DataSource){
//     super(User,data.createEntityManager())
//   }

//     async checkExistUser(id: string): Promise<User> {
//     const user = await this.findOne({where:{id,isDeleted:false}});
//     if (!user) throw new NotFoundException(AUTH_MESSAGE.USER.NOT_FOUND);
//     return user;
//   }
// }

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async checkExistUser(id: string): Promise<User> {
    const user = await this.findOne({ where:{id} });
    if (!user) throw new NotFoundException(AUTH_MESSAGE.USER.NOT_FOUND);
    return user;
  }
}

