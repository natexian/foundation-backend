import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { DeviceTypeDto } from './dto/device-type.dto';
import { DeviceType } from './entities/device-type.entity';

@Injectable()
export class DeviceTypeService {
  private _logger = new Logger('ActivityTypeService');

  constructor(
    @InjectRepository(DeviceType)
    private _deviceTypeRepository: Repository<DeviceType>
  ) {}

  async create(createDeviceTypeDto: DeviceTypeDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createDeviceTypeDto.DeviceTypeName) {
      throw new BadRequestException('Invalid device type name.');
    } else if (!createDeviceTypeDto.DeviceTypeCode) {
      throw new BadRequestException('Invalid device type code.');
    }

    const deviceType = this._deviceTypeRepository.create({
      DeviceTypeName: createDeviceTypeDto.DeviceTypeName,
      DeviceTypeCode: createDeviceTypeDto.DeviceTypeCode,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._deviceTypeRepository.insert(deviceType);
    return deviceType._id;
  }

  async findAll(): Promise<DeviceType[]> {
    this._logger.log('findAll: start findAll');
    return await this._deviceTypeRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(deviceTypeId: ObjectId): Promise<DeviceType> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._deviceTypeRepository.findOne({
      where: { _id: new ObjectId(deviceTypeId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Device type with ${deviceTypeId} does not exist.`
      );
    }
    return existingRecord;
  }

  async update(
    id: ObjectId,
    updateDeviceTypeDto: DeviceTypeDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._deviceTypeRepository.update(id, {
      DeviceTypeName:
        updateDeviceTypeDto.DeviceTypeName ?? existingRecord.DeviceTypeName,
      DeviceTypeCode:
        updateDeviceTypeDto.DeviceTypeCode ?? existingRecord.DeviceTypeCode,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._deviceTypeRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
