import { ApiProperty } from '@nestjs/swagger';

export class ParticipantDto {
  @ApiProperty({
    example: 'John',
    description:
      'First Name of the Participant',
  })
  FirstName: string;

  @ApiProperty({
    example: 'Doe',
    description:
      'Last Name of the Participant',
  })
  LastName: string;

  @ApiProperty({
    example: 'https://www.norges-bank.no/globalassets/upload/images/pressebilder/hovedstyret-og-komiteen/small/oystein_borsum.jpg?mode=crop&width=780',
    description:
      'ProfilePictureURL of the Participant',
  })
  ProfilePictureURL: string;

  @ApiProperty({
    example: '',
    description:
      'GroupId of the Participant',
  })
  GroupId: string;

  @ApiProperty({
    example: '',
    description:
      'LocaleId of the Participant',
  })
  LocaleId: string;
}
