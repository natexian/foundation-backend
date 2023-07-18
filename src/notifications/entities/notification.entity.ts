import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Notifications')
export class Notification extends Base {
  @Column()
  StepId: string;

  @Column()
  Message: string;
}
