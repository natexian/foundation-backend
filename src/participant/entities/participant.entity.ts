import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Participants')
export class Participant extends Base {
  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  ProfilePictureURL: string;

  @Column()
  GroupId: string;

  @Column()
  LocaleId: string;
}
