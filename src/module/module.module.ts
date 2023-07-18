import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { ModuleEntity } from './entities/module.entity';
import { ModuleTarget } from '../module-targets/entities/module-target.entity';
import { Target } from '../target/entities/target.entity';
import { ModuleTargetsModule } from '../module-targets/module-targets.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, ModuleTarget, Target]), ModuleTargetsModule],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [ModuleService]
})
export class ModuleModule {}
