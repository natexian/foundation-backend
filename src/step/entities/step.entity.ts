import { Column, Entity } from 'typeorm';

import { Base } from '../../common/common-entities/base.entity';
import { ModuleEntity } from '../..//module/entities/module.entity';
import { Note } from '../..//notes/entities/note.entity';
import { Notification } from '../../notifications/entities/notification.entity';

@Entity('Steps')
export class Step extends Base {
  @Column()
  StepName: string;

  @Column()
  Title: string;

  @Column()
  Scene: string;

  @Column()
  Act: string;

  @Column()
  StepNumber: number;

  @Column()
  StepGroupId: string;

  Modules?: ModuleEntity[];  
  
  Notes?: Note[] = [];
  
  Notifications?: Notification[] = [];
}
