import { Base } from '../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Locales')
export class Locale extends Base {
  @Column()
  LanguageName: string;

  @Column()
  LanguageCode: string;

  @Column()
  FileName: string;
}
