import { ApiProperty } from '@nestjs/swagger';

export class LocaleDto {
  @ApiProperty({
    example: 'English',
    description:
      'Name of the Language',
  })
  LanguageName: string;

  @ApiProperty({
    example: 'EN',
    description:
      'Code of the Language',
  })
  LanguageCode: string;

  @ApiProperty({
    example: '/data/locale/en.json',
    description:
      'FileName where text-mapping is stored for that language',
  })
  FileName: string;
}
