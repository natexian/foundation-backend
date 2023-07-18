import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { ParticipantGroup } from './entities/participant-group.entity';
import { ParticipantGroupDto } from './dto/participant-group.dto';
import { Participant } from '../participant/entities/participant.entity';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class ParticipantGroupService {
  private _logger = new Logger('ActivityTypeService');

  constructor(
    @InjectRepository(ParticipantGroup)
    private _participantGroupRepository: Repository<ParticipantGroup>,
    @InjectRepository(Participant)
    private _participantRepository: Repository<Participant>,
    private _participantService: ParticipantService
  ) {}

  async create(participantGroupDto: ParticipantGroupDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!participantGroupDto.Name) {
      throw new BadRequestException('Invalid Participant Group name.');
    }
    const participantGroup = this._participantGroupRepository.create({
      Name: participantGroupDto.Name,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._participantGroupRepository.insert(participantGroup);
    return participantGroup._id;
  }

  async findAll(): Promise<ParticipantGroup[]> {
    this._logger.log('findAll: start findAll');
    return await this._participantGroupRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(participantGroupId: string): Promise<ParticipantGroup> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._participantGroupRepository.findOne({
      where: { _id: new ObjectId(participantGroupId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `ParticipantGroup ${participantGroupId} does not exist.`
      );
    }
    return existingRecord;
  }

  async findParticipants(participantGroupId: string): Promise<Participant[]> {
    this._logger.log('findParticipants: start findOne');
    const existingRecord = await this._participantRepository.find({
      where: { 
        GroupId: participantGroupId, 
        IsActive: true 
      },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Participants with GroupId ${participantGroupId} does not exist.`
      );
    }
    return existingRecord;
  }

  async update(
    id: string,
    participantGroupDto: ParticipantGroupDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._participantGroupRepository.update(id, {
      Name:
      participantGroupDto.Name ??
        existingRecord.Name,
      ModifiedOn: new Date(),
    });
    return new ObjectId(id);
  }

  async remove(id: string) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._participantGroupRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }

  async anonymize(id: string) {
    const participants = await this.findParticipants(id);
    participants.forEach((participant, i) => {
      this._participantService.anonymize((participant._id).toString());
    });
  }
}
