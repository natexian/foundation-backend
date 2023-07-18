import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Locale } from './entities/locale.entity';
import { LocaleDto } from './dto/locale.dto';
import fs from 'fs';

@Injectable()
export class LocaleService {
  private _logger = new Logger('LocaleService');

  constructor(
    @InjectRepository(Locale)
    private _localeRepository: Repository<Locale>
  ) {}

  async create(createLocaleDto: LocaleDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createLocaleDto.LanguageName) {
      throw new BadRequestException('Invalid language name.');
    } else if (!createLocaleDto.LanguageCode) {
      throw new BadRequestException('Invalid language code.');
    } else if (!createLocaleDto.FileName) {
      throw new BadRequestException('Invalid file name.');
    }
    const locale = this._localeRepository.create({
      LanguageName: createLocaleDto.LanguageName,
      LanguageCode: createLocaleDto.LanguageCode,
      FileName: createLocaleDto.FileName,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._localeRepository.insert(locale);
    return locale._id;
  }

  async findAll(): Promise<Locale[]> {
    this._logger.log('findAll: start findAll');
    return await this._localeRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(localeId: string): Promise<Locale> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._localeRepository.findOne({
      where: { _id: new ObjectId(localeId), IsActive: true },
    });
    if (!existingRecord) {
      this._logger.error(`Locale ${localeId} does not exist.`)
      throw new NotFoundException(
        `Locale ${localeId} does not exist.`
      );
    }
    return existingRecord;
  }

  async update(
    id: string,
    updateLocaleDto: LocaleDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._localeRepository.update(id, {
      LanguageName: updateLocaleDto.LanguageName ?? existingRecord.LanguageName,
      LanguageCode: updateLocaleDto.LanguageCode ?? existingRecord.LanguageName,
      FileName: updateLocaleDto.FileName ?? existingRecord.LanguageName,
      ModifiedOn: new Date(),
    });
    return new ObjectId(id);
  }

  async remove(id: string) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._localeRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }

  async loadData(id: string) {
    this._logger.log('loadData: start loadData');
    const localeInfo = await this.findOne(id);
    try {
      const fileData = fs.readFileSync(localeInfo.FileName, {
        encoding: 'utf8',
      });

      return JSON.parse(fileData);
    } catch (error) {
      this._logger.log(`Could not load locale information for ${id}`);
    }
  }
}
