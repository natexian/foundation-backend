import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('ParticipantGroups')
export class ParticipantGroup extends Base {
  @Column()
  Name: string;
}
