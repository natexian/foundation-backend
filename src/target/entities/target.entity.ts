import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Targets')
export class Target extends Base {
  @Column()
  Name: string;
}
