import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { SessionDeviceDto } from './dto/session-device.dto';
import { SessionDevice } from './entities/session-device.entity';
import { Device } from '../device/entities/device.entity';
import { DeviceType } from '../device-type/entities/device-type.entity';
import { DeviceService } from '../device/device.service';

@Injectable()
export class SessionDevicesService {
  private _logger = new Logger('SessionDevicesService');

  constructor(
    @InjectRepository(SessionDevice)
    private _sessionDevicesRepository: Repository<SessionDevice>,
    @InjectRepository(Device)
    private _deviceRepository: Repository<Device>,
    @InjectRepository(DeviceType)
    private _deviceTypeRepository: Repository<DeviceType>
  ) {}

  async create(createSessionDeviceDto: SessionDeviceDto) {
    this._logger.log('create: start create');

    if (!createSessionDeviceDto.SessionId) {
      throw new BadRequestException('Invalid session id.');
    } else if (createSessionDeviceDto.DeviceId.length == 0) {
      throw new BadRequestException('Invalid device id.');
    }

    createSessionDeviceDto.DeviceId.map(async (sessionDevice) => {
      const createdSessionDevice = this._sessionDevicesRepository.create({
        SessionId: createSessionDeviceDto.SessionId,
        DeviceId: sessionDevice,
        CreatedOn: new Date(),
        ModifiedOn: new Date(),
        IsActive: true,
      });
      await this._sessionDevicesRepository.insert(createdSessionDevice);
    });

    return 'Saved records successfully';
  }

  async findAllDevicesForSession(sessionId: string): Promise<Device[]> {
    this._logger.log(
      'findAllDevicesForSession: start findAllDevicesForSession'
    );
    const sessionDevices = await this._sessionDevicesRepository.find({
      where: {
        SessionId: sessionId,
        IsActive: true,
      },
    });
    return await this.processSessionDevices(sessionDevices);
  }

  async processSessionDevices(
    sessionDevices: SessionDevice[]
  ): Promise<Device[]> {
    this._logger.log('processSessionDevices: start processSessionDevices');

    const requests = [];
    sessionDevices.forEach((sessionDevice) => {
      requests.push(this.findOneDevice(sessionDevice.DeviceId));
    });

    return await Promise.all<Device[]>(requests).then(async (response) => {
      return response;
    });
  }

  async findOneDevice(deviceId: string): Promise<Device> {
    this._logger.log('findOneDevice: start findOneDevice');
    return await new DeviceService(
      this._deviceRepository,
      this._deviceTypeRepository
    ).findOne(new ObjectId(deviceId));
  }

  async remove(sessionId: string) {
    this._logger.log('remove: start remove');
    await this._sessionDevicesRepository.delete({
      SessionId: sessionId,
    });
    return sessionId;
  }
}
