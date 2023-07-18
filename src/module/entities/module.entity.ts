import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity, ObjectId } from 'typeorm';
import { Args, Content, Pools, Topic } from '../interfaces/module.interface';
import { CreateModuleDto } from '../dto/create-module.dto';

@Entity('Modules')
export class ModuleEntity extends Base implements CreateModuleDto {
  @Column({ nullable: false })
  StepId: string;

  @Column({ nullable: false })
  ModuleTypeId: string;

  @Column({ nullable: true })
  Label?: string;

  @Column({ nullable: true })
  Step?: string;

  @Column({ nullable: true })
  Sequences?: string[];

  @Column({ nullable: true })
  Text?: string;

  @Column({ nullable: true })
  Track?: string;

  @Column({ nullable: true })
  Url?: string;

  @Column({ nullable: true })
  Stop?: boolean;

  @Column({ nullable: true })
  Title?: string;

  @Column({ nullable: true })
  Autoplay?: boolean;

  @Column({ nullable: true })
  Loop?: boolean;

  @Column({ nullable: true })
  Volume?: number;

  @Column({ nullable: true })
  ShowCurrentSession?: boolean;

  @Column({ nullable: true })
  Color?: string;

  @Column({ nullable: true })
  Logo?: boolean;

  @Column({ nullable: true })
  AutoNextOnEnd?: boolean;

  @Column({ nullable: true })
  Dim?: boolean;

  @Column({ nullable: true })
  AutoStart?: boolean;

  @Column({ nullable: true })
  Duration?: string;

  @Column({ nullable: true })
  Value?: string;

  @Column({ nullable: true })
  WithGroupId?: boolean;

  @Column({ nullable: true })
  Args?: Args;

  @Column({ nullable: true })
  PersistId?: string;

  @Column({ nullable: true })
  Assignment?: boolean;

  @Column({ nullable: true })
  Variant?: string;

  @Column({ nullable: true })
  Badge?: string;

  @Column({ nullable: true })
  Topics?: Topic[];

  @Column({ nullable: true })
  Pools?: Pools;

  @Column({ nullable: true })
  EventPrefix?: string;

  @Column({ nullable: true })
  UnderstoodKey?: string;

  @Column({ nullable: true })
  ShowMediaControls?: boolean;

  @Column({ nullable: true })
  SeriesPropertyName?: string;

  @Column({ nullable: true })
  Content?: Content;

  @Column({ nullable: true })
  NonMoversOnly?: boolean;

  @Column({ nullable: true })
  Groups?: string;

  Targets: string[] = [];
}
