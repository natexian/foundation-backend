import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('ParticipantPoints')
export class ParticipantPoint extends Base {
  @Column()
  StepId: string;

  @Column()
  ParticipantId: string;

  @Column()
  SessionId: string;

  @Column()
  Points: number;
}
