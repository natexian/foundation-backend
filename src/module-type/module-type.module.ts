import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModuleTypeService } from './module-type.service';
import { ModuleTypeController } from './module-type.controller';
import { ModuleType } from './entities/module-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleType])],
  controllers: [ModuleTypeController],
  providers: [ModuleTypeService],
})
export class ModuleTypeModule {}
