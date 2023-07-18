import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Locale } from '../locale/entities/locale.entity';
import { Step } from '../step/entities/step.entity';
import { StepGroup } from '../step-group/entities/step-group.entity';
import { ModuleEntity } from '../module/entities/module.entity';
import { ModuleTarget } from '../module-targets/entities/module-target.entity';
import { Target } from '../target/entities/target.entity';
import { Note } from '../notes/entities/note.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { LocaleModule } from '../locale/locale.module';
import { StepModule } from '../step/step.module';
import { StepGroupModule } from '../step-group/step-group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Session,
      Locale,
      Step,
      StepGroup,
      ModuleEntity,
      ModuleTarget,
      Target,
      Note,
      Notification,
    ]),
    LocaleModule,
    StepModule,
    StepGroupModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
