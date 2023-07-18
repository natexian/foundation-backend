import { ApiProperty } from '@nestjs/swagger';

export class SessionDeviceDto {
  @ApiProperty({
    example: '649bc13fc422411a5f82d278',
    description: 'Id of the session to which current device is targeting',
  })
  SessionId: string;

  @ApiProperty({
    example: ['649bc13fc422411a5f82d277'],
    description: 'Id of the device from the current session',
  })
  DeviceId: string[];
}

