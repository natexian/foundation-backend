import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Step } from './entities/step.entity';
import { StepDto } from './dto/step.dto';
import { StepGroupService } from '../step-group/step-group.service';
import { ModuleService } from '../module/module.service';
import { ModuleEntity } from '../module/entities/module.entity';
import { ModuleTarget } from '../module-targets/entities/module-target.entity';
import { Target } from '../target/entities/target.entity';
import { Note } from '../notes/entities/note.entity';
import { NotesService } from '../notes/notes.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from '../notifications/entities/notification.entity';

@Injectable()
export class StepService {
  constructor(
    private stepGroupService: StepGroupService,
    @InjectRepository(Step)
    private _stepRepository: Repository<Step>,
    @InjectRepository(ModuleEntity)
    private _moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(ModuleTarget)
    private _moduleTargetsRepository?: Repository<ModuleTarget>,
    @InjectRepository(Target)
    private _targetRepository?: Repository<Target>,
    @InjectRepository(Note)
    private _noteRepository?: Repository<Note>,
    @InjectRepository(Notification)
    private _notificationRepository?: Repository<Notification>,
  ) {}

  async create(createStepDto: StepDto) {
    if (!createStepDto.StepName) {
      throw new BadRequestException('Invalid Step Name.');
    } else if (!createStepDto.Title) {
      throw new BadRequestException('Invalid Title.');
    } else if (!createStepDto.Scene) {
      throw new BadRequestException('Invalid Scene.');
    } else if (!createStepDto.Act) {
      throw new BadRequestException('Invalid Act.');
    } else if (!createStepDto.StepGroupId) {
      throw new BadRequestException('Invalid StepGroupId.');
    } else if (!createStepDto.StepNumber) {
      throw new BadRequestException('Invalid StepNumber.');
    }
    const step = this._stepRepository.create({
      StepName: createStepDto.StepName,
      Title: createStepDto.Title,
      Scene: createStepDto.Scene,
      Act: createStepDto.Act,
      StepGroupId: createStepDto.StepGroupId,
      StepNumber: createStepDto.StepNumber,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._stepRepository.insert(step);
    return step._id;
  }

  async findAll(): Promise<Step[]> {
    return await this._stepRepository.find({
      where: {
        IsActive: true,
      },
      order: {
        StepGroupId: 'ASC',
        StepNumber: 'ASC',
      }
    });
  }

  async findOne(stepId: string): Promise<Step> {
    const existingRecord = await this._stepRepository.findOne({
      where: { _id: new ObjectId(stepId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(`Step with id ${stepId}, does not exist.`);
    }

    const modules = await new ModuleService(
      this._moduleRepository,
      this._moduleTargetsRepository,
      this._targetRepository
    ).findAllModulesForStep(existingRecord._id.toString());

    if (modules) {
      existingRecord.Modules = modules;
    }

    const notes = await new NotesService(
      this._noteRepository
    ).findAllNotesForStep(existingRecord._id);

    if (notes) {
      existingRecord.Notes = notes;
    }

    const notifications = await new NotificationsService(
      this._notificationRepository
    ).findAllNotificationsForStep(existingRecord._id);

    if (notifications) {
      existingRecord.Notifications = notifications;
    }

    return existingRecord;
  }

  async update(
    id: string,
    updateStepDto: StepDto
  ): Promise<ObjectId> {
    const existingRecord = await this.findOne(id);
    await this._stepRepository.update(id, {
      StepName: updateStepDto.StepName ?? existingRecord.StepName,
      Title: updateStepDto.Title ?? existingRecord.Title,
      Scene: updateStepDto.Scene ?? existingRecord.Scene,
      Act: updateStepDto.Act ?? existingRecord.Act,
      StepNumber: updateStepDto.StepNumber ?? existingRecord.StepNumber,
      StepGroupId: updateStepDto.StepGroupId ?? existingRecord.StepGroupId,
      ModifiedOn: new Date(),
    });
    return new ObjectId(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this._stepRepository.update(new ObjectId(id), {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return new ObjectId(id);
  }

  async findNext(stepId: string): Promise<Step> {
    const currentStep = await this.findOne(stepId);
    const groupSteps = await this.stepGroupService.findSteps(currentStep.StepGroupId);
    let currentStepIndex = groupSteps.findIndex((step) => {
      return step._id == new ObjectId(stepId);
    });
    if (!groupSteps[currentStepIndex + 1]) {
      throw new NotFoundException(
        `No Next Step Available.`
      );
    }
    return groupSteps[currentStepIndex + 1];
  }

  async findPrevious(stepId: string): Promise<Step> {
    const currentStep = await this.findOne(stepId);
    const groupSteps = await this.stepGroupService.findSteps(currentStep.StepGroupId);
    let currentStepIndex = groupSteps.findIndex((step) => {
      return step._id == new ObjectId(stepId);
    });
    if (!groupSteps[currentStepIndex - 1]) {
      throw new NotFoundException(
        `No Previous Step Available.`
      );
    }
    return groupSteps[currentStepIndex - 1];
  }

  //TODO: After modules has been implemented
  setup(){
  }

  //TODO: After socket has been implemented
  setupIdleClients(){
  }

  //TODO: After socket has been implemented
  onClientSetup(){
  }

  //TODO: After socket has been implemented
  onMaestroSetup(){
  }
}
