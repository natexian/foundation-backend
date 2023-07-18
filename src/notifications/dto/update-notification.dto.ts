import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto {
  @ApiProperty({
    example: `You've been awarded a new badge`,
    description: 'Notification message to display to the user',
  })
  Message: string;
}
