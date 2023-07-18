import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('Sessions')
export class Session {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  SessionName: string;

  @Column()
  StartedOn: Date;

  @Column()
  EndedOn: Date;

  @Column()
  IsActive: boolean;

  @Column()
  CurrentStepId: string;

  @Column()
  LanguageId: string;

  @Column()
  GameTime: number;
}
