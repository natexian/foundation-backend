import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StepGroupService } from './step-group.service';
import { StepGroupController } from './step-group.controller';
import { StepGroup } from './entities/step-group.entity';
import { Step } from '../step/entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StepGroup, Step])],
  controllers: [StepGroupController],
  providers: [StepGroupService],
  exports: [StepGroupService],
})
export class StepGroupModule {}
