import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('SessionDevices')
export class SessionDevice extends Base {
  @Column()
  SessionId: string;
  
  @Column()
  DeviceId: string;
}
