import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModuleTargetsService } from './module-targets.service';
import { ModuleTargetsController } from './module-targets.controller';
import { ModuleTarget } from './entities/module-target.entity';
import { ModuleEntity } from '../module/entities/module.entity';
import { Target } from '../target/entities/target.entity';
import { ModuleModule } from '../module/module.module';
import { TargetModule } from '../target/target.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleTarget, ModuleEntity, Target]), forwardRef(() => ModuleModule), TargetModule],
  controllers: [ModuleTargetsController],
  providers: [ModuleTargetsService],
  exports: [ModuleTargetsService]
})
export class ModuleTargetsModule {}
