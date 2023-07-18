import { ApiProperty } from '@nestjs/swagger';

import {
  Args,
  Content,
  Pools,
  Topic,
} from '../interfaces/module.interface';
export class CreateModuleDto {
  @ApiProperty({
    example: '64896c0ebb2f3b50a0110728',
    description: 'Id of the step to which current module is a part of',
  })
  StepId: string;

  @ApiProperty({
    example: '64896c0ebb2f3b50a0110728',
    description: 'Id of the module type to which current module is a part of',
  })
  ModuleTypeId: string;

  @ApiProperty({
    example: `["64896c0ebb2f3b50a0110728"]`,
    description: 'Target screens for this particular module',
  })
  Targets?: string[];

  @ApiProperty({
    example: 'National leaderboard',
    description: 'Title given to a module',
  })
  Title?: string;

  @ApiProperty({
    example: 'Start',
    description: 'Label name given to a module',
  })
  Label?: string;

  @ApiProperty({
    example: 'S7300',
  })
  Sequences?: string[];

  @ApiProperty({
    example: 'Act 1',
  })
  Text?: string;

  @ApiProperty({
    example: 'music',
  })
  Track?: string;

  @ApiProperty({
    example: 'media/video/act-1/sam_tradebrief_{LOCALE}_canvas.mp4',
  })
  Url?: string;

  @ApiProperty({
    example: 'true',
  })
  Stop?: boolean;

  @ApiProperty({
    example: 'true',
  })
  Autoplay?: boolean;

  @ApiProperty({
    example: 'true',
  })
  Loop?: boolean;

  @ApiProperty({
    example: '0.2',
  })
  Volume?: number;

  @ApiProperty({
    example: 'true',
  })
  ShowCurrentSession?: boolean;

  @ApiProperty({
    example: 'green',
  })
  Color?: string;

  @ApiProperty({
    example: 'true',
  })
  Logo?: boolean;

  @ApiProperty({
    example: 'true',
  })
  AutoNextOnEnd?: boolean;

  @ApiProperty({
    example: 'true',
  })
  Dim?: boolean;

  @ApiProperty({
    example: 'true',
  })
  AutoStart?: boolean;

  @ApiProperty({
    example: '2m',
  })
  Duration?: string;

  @ApiProperty({
    example: 'new-role:show',
  })
  Value?: string;

  @ApiProperty({
    example: 'true',
  })
  WithGroupId?: boolean;

  @ApiProperty({
    example: `{
      "title": "t:group-screen.meet-by-council-table"
      "Goods": "true"
    }`,
  })
  Args?: Args;

  @ApiProperty({
    example: 'tradeGoods',
  })
  PersistId?: string;

  @ApiProperty({
    example: 'true',
  })
  Assignment?: boolean;

  @ApiProperty({
    example: 'fade-transparent',
  })
  Variant?: string;

  @ApiProperty({
    example: 'MARKETPLACE',
  })
  Badge?: string;

  @ApiProperty({
    example: `[
      {
        "id": "unit-of-account",
        "title": "t:horisont.step700.segments.revelation.topics.unit-of-account"
      },
    ]`,
  })
  Topics?: Topic[];

  @ApiProperty({
    example: `{
      "all": {
        "from": "council-room",
        "to": "group-room",
        "textKey": "act2GroupRoomFirstTime"
      }
    }`,
  })
  Pools?: Pools;

  @ApiProperty({
    example: 'capital-investment',
  })
  EventPrefix?: string;

  @ApiProperty({
    example: 'investmentsUnderstood',
  })
  UnderstoodKey?: string;

  @ApiProperty({
    example: 'true',
  })
  ShowMediaControls?: boolean;

  @ApiProperty({
    example: 'prospectPortfolio',
  })
  SeriesPropertyName?: string;

  @ApiProperty({
    example: `{
      "title": "t:horisont.step2700.segments.voting.title",
      "alternatives": [
        {
          "title": "t:horisont.step2700.segments.voting.alternatives.decrease.title",
          "correct": "true"
        },
        {
          "title": "t:horisont.step2700.segments.voting.alternatives.increase.title",
          "correct": "false"
        }
      ]
    }`,
  })
  Content?: Content;

  @ApiProperty({
    example: 'true',
  })
  NonMoversOnly?: boolean;

  @ApiProperty({
    example: 'even',
  })
  Groups?: string;
}
