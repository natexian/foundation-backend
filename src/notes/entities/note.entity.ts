import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Notes')
export class Note extends Base {
  @Column()
  StepId: string;

  @Column()
  Description: string;
}
