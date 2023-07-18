import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeviceDto {
  @ApiProperty({
    example: 'Council Screen',
    description: 'Name of device which will be connected to the game',
  })
  DeviceName: string;

  @ApiProperty({
    example: 'COUNCIL_SCREEN',
    description: 'Device code is set to identify devices efficiently.',
  })
  DeviceCode: string;
}
