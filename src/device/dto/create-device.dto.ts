import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({
    example: '649bbb617ae387e6a751c5e2',
    description:
      'Device type id of this device',
  })
  DeviceTypeId: string;

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
