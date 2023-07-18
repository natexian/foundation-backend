import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('DeviceTypes')
export class DeviceType extends Base {
  @Column()
  DeviceTypeName: string;

  @Column()
  DeviceTypeCode: string;
}
