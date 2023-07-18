import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

import { DeviceType } from '../../device-type/entities/device-type.entity';

@Entity('Devices')
export class Device extends Base {
  @Column()
  DeviceTypeId: string;

  @Column()
  DeviceeName: string;

  @Column()
  DeviceCode: string;

  DeviceType?: DeviceType;
}
