import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceTypeService } from './device-type.service';
import { DeviceTypeController } from './device-type.controller';
import { DeviceType } from './entities/device-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceType])],
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService],
  exports: [DeviceTypeService]
})
export class DeviceTypeModule {}
