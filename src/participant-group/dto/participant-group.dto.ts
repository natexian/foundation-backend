import { ApiProperty } from '@nestjs/swagger';

export class ParticipantGroupDto {
  @ApiProperty({
    example: 'Fishermen',
    description:
      'Name of the participant group',
  })
  Name: string;
}
