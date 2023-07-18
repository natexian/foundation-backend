export interface Module {
  Type?: string;
  Label?: string;
  Step?: string;
  Sequences?: string[];
  Text?: string;
  Targets?: string[];
  Track?: string;
  Url?: string;
  Stop?: boolean;
  Title?: string;
  Autoplay?: boolean;
  Loop?: boolean;
  Volume?: number;
  ShowCurrentSession?: boolean;
  Color?: string;
  Logo?: boolean;
  AutoNextOnEnd?: boolean;
  Dim?: boolean;
  AutoStart?: boolean;
  Duration?: string;
  Value?: string;
  WithGroupId?: boolean;
  Args?: Args;
  PersistId?: string;
  Assignment?: boolean;
  Variant?: string;
  Badge?: string;
  Topics?: Topic[];
  Pools?: Pools;
  EventPrefix?: string;
  UnderstoodKey?: string;
  ShowMediaControls?: boolean;
  SeriesPropertyName?: string;
  Content?: Content;
  NonMoversOnly?: boolean;
  Groups?: string;
}

export interface Content {
  Title: string;
  Alternatives: Alternative[];
}

export interface Alternative {
  Title: string;
  Correct: string;
}

export interface Args {
  Title: string;
  Goods?: boolean;
}

export interface Topic {
  Id: string;
  Title: string;
}

export interface Pools {
  All: All;
  Even: string;
  Odd: string;
}
export interface All {
  From: string;
  To: string;
  TextKey: string;
  Type: string;
  RawCallDefinition: RawCallDefinition;
}

export interface RawCallDefinition {
  Id: string;
  Type: string;
  Nb: Nb;
  En: En;
  Caller: Caller;
}

export interface Nb {
  Audio: string;
  Description: string;
  Title: string;
  Name: string;
}

export interface En {
  Audio: string;
  Description: string;
  Title: string;
  Name: string;
}

export interface Caller {
  Nb: Nb;
  En: En;
  Image: string;
}

export interface ModuleTargets {
  TargetId: string;
  ModuleId?: string;
  TargetName?: string;
}