import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { DeviceType } from '../device-type/entities/device-type.entity';
import { DeviceTypeService } from '../device-type/device-type.service';

@Injectable()
export class DeviceService {
  private _logger = new Logger('ActivityTypeService');

  constructor(
    @InjectRepository(Device)
    private _deviceRepository: Repository<Device>,
    @InjectRepository(DeviceType)
    private _deviceTypeRepository: Repository<DeviceType>
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createDeviceDto.DeviceName) {
      throw new BadRequestException('Invalid device name.');
    } else if (!createDeviceDto.DeviceCode) {
      throw new BadRequestException('Invalid device code.');
    } else if (!createDeviceDto.DeviceTypeId) {
      throw new BadRequestException('Invalid device type id.');
    }

    const device = this._deviceRepository.create({
      DeviceeName: createDeviceDto.DeviceName,
      DeviceCode: createDeviceDto.DeviceCode,
      DeviceTypeId: createDeviceDto.DeviceTypeId,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._deviceRepository.insert(device);
    return device._id;
  }

  async findAll(): Promise<Device[]> {
    this._logger.log('findAll: start findAll');
    return await this._deviceRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(deviceId: ObjectId): Promise<Device> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._deviceRepository.findOne({
      where: { _id: new ObjectId(deviceId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(`Device with ${deviceId} does not exist.`);
    }

    const deviceTypeRecord = await new DeviceTypeService(
      this._deviceTypeRepository
    ).findOne(new ObjectId(existingRecord.DeviceTypeId));

    if (deviceTypeRecord) {
      existingRecord.DeviceType = deviceTypeRecord;
    }

    return existingRecord;
  }

  async update(
    id: ObjectId,
    updateDeviceDto: UpdateDeviceDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._deviceRepository.update(id, {
      DeviceeName: updateDeviceDto.DeviceName ?? existingRecord.DeviceeName,
      DeviceCode: updateDeviceDto.DeviceCode ?? existingRecord.DeviceCode,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._deviceRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
