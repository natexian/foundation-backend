import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('StepGroups')
export class StepGroup extends Base {
  @Column()
  StepGroupName: string;
}
