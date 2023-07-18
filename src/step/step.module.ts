import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { StepGroup } from '../step-group/entities/step-group.entity';
import { ModuleEntity } from '../module/entities/module.entity';
import { ModuleTarget } from '../module-targets/entities/module-target.entity';
import { Target } from '../target/entities/target.entity';
import { Note } from '../notes/entities/note.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { ModuleModule } from '../module/module.module';
import { StepGroupModule } from '../step-group/step-group.module';
import { NotesModule } from '../notes/notes.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Step,
      StepGroup,
      ModuleEntity,
      ModuleTarget,
      Target,
      Note,
      Notification,
    ]),
    StepGroupModule,
    ModuleModule,
    NotesModule,
    NotificationsModule,
  ],
  controllers: [StepController],
  providers: [StepService],
  exports: [StepService],
})
export class StepModule {}
