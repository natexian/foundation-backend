import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('ModuleTypes')
export class ModuleType extends Base {
  @Column()
  ModuleTypeName: string;
}
