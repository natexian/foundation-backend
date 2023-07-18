import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    example: '64896c0ebb2f3b50a0110728',
    description:
      'stepId of the current step where the interaction is occurring',
  })
  StepId: string;

  @ApiProperty({
    example: 'Note Description',
    description:
      'Description of the note to be shown to the maestro of the game',
  })
  Description: string;
}
