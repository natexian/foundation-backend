import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { Device } from './entities/device.entity';
import { DeviceType } from '../device-type/entities/device-type.entity';
import { DeviceTypeModule } from '../device-type/device-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceType]), DeviceTypeModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService]
})
export class DeviceModule {}
