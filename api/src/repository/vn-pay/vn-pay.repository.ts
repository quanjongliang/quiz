import { CustomRepository } from '@/decorator';
import { VnPay } from '@/entity';
import { EntityRepository, Repository } from 'typeorm';

// @EntityRepository(VnPay)
@CustomRepository(VnPay)
export class VnPayRepository extends Repository<VnPay> {
 
}
