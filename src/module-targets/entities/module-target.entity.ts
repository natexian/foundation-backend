import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('ModuleTargets')
export class ModuleTarget extends Base {
  @Column()
  TargetId: string;
  
  @Column()
  ModuleId: string;
}
