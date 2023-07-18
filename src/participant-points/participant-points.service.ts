import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { ParticipantPointDto } from './dto/participant-point.dto';
import { ParticipantPoint } from './entities/participant-point.entity';

@Injectable()
export class ParticipantPointsService {
  private _logger = new Logger('ActivityTypeService');

  constructor(
    @InjectRepository(ParticipantPoint)
    private _participantPointRepository: Repository<ParticipantPoint>
  ) {}

  async create(
    createParticipantPointDto: ParticipantPointDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createParticipantPointDto.StepId) {
      throw new BadRequestException('Invalid step id.');
    } else if (!createParticipantPointDto.ParticipantId) {
      throw new BadRequestException('Invalid participant id.');
    } else if (!createParticipantPointDto.SessionId) {
      throw new BadRequestException('Invalid session id.');
    }

    const existingRecord = await this.findOne(
      createParticipantPointDto.ParticipantId,
      createParticipantPointDto.StepId
    );

    if (existingRecord) {
      this.update(createParticipantPointDto, true, existingRecord);
    }

    const participantsPoint = this._participantPointRepository.create({
      StepId: createParticipantPointDto.StepId,
      ParticipantId: createParticipantPointDto.ParticipantId,
      SessionId: createParticipantPointDto.SessionId,
      Points: createParticipantPointDto.Points,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._participantPointRepository.insert(participantsPoint);
    return participantsPoint._id;
  }

  async findAll(
    participantId: string,
    sessionId: string
  ): Promise<ParticipantPoint[]> {
    this._logger.log('findAll: start findAll');
    const listOfPoints = await this._participantPointRepository.find({
      where: {
        ParticipantId: participantId,
        SessionId: sessionId,
        IsActive: true,
      },
    });
    if (!listOfPoints || listOfPoints.length == 0) {
      throw new NotFoundException(
        `No points recorded with participant - ${participantId} and session - ${sessionId}.`
      );
    }
    return listOfPoints;
  }

  async findOne(
    participantId: string,
    stepId: string
  ): Promise<ParticipantPoint> {
    this._logger.log('findOne: start findOne');
    return await this._participantPointRepository.findOne({
      where: { ParticipantId: participantId, StepId: stepId, IsActive: true },
    });
  }

  async update(
    updateParticipantPointDto: ParticipantPointDto,
    existingCheck: boolean = false,
    existingRecord?: ParticipantPoint
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    if (!existingCheck) {
      existingRecord = await this.findOne(
        updateParticipantPointDto.ParticipantId,
        updateParticipantPointDto.StepId
      );
      if (!existingRecord) {
        throw new NotFoundException(
          `No points recorded with participant - ${updateParticipantPointDto.ParticipantId} and step - ${updateParticipantPointDto.StepId}.`
        );
      }
    }

    await this._participantPointRepository.update(existingRecord._id, {
      Points: updateParticipantPointDto.Points ?? existingRecord.Points,
      ModifiedOn: new Date(),
    });
    return existingRecord._id;
  }

  async remove(participantPointsId: ObjectId) {
    this._logger.log('remove: start remove');
    const existingRecord = await this._participantPointRepository.findOne({
      where: { _id: new ObjectId(participantPointsId) },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `No points recorded with participant id ${participantPointsId}.`
      );
    }
    await this._participantPointRepository.remove(existingRecord);
    return participantPointsId;
  }
}
