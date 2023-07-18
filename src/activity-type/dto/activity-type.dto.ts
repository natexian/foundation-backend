import { ApiProperty } from '@nestjs/swagger';

export class ActivityTypeDto {
  @ApiProperty({
    example: 'Updated',
    description:
      'Type of event that may occur when user interacts with the system',
  })
  ActivityTypeName: string;
}
