import { CustomRepository } from '@/decorator';
import { Cloundinary } from '@/entity';
import { EntityRepository, Repository } from 'typeorm';

// @EntityRepository(Cloundinary)
@CustomRepository(Cloundinary)
export class CloundinaryReposiotry extends Repository<Cloundinary> {}
