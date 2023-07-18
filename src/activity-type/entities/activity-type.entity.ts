import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('ActivityTypes')
export class ActivityType extends Base {
  @Column()
  ActivityTypeName: string;
}
