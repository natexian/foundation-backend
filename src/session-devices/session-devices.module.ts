import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionDevicesService } from './session-devices.service';
import { SessionDevicesController } from './session-devices.controller';
import { SessionDevice } from './entities/session-device.entity';
import { Device } from '../device/entities/device.entity';
import { DeviceType } from '../device-type/entities/device-type.entity';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionDevice, Device, DeviceType]), DeviceModule],
  controllers: [SessionDevicesController],
  providers: [SessionDevicesService],
})
export class SessionDevicesModule {}
