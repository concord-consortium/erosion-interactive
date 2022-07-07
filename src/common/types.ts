import { IRuntimeInitInteractive } from "@concord-consortium/lara-interactive-api";


export interface IAuthoredState {
  firebaseApp?: string;
}

export interface IInteractiveState {}
export interface AuthoringApiProps {
  setOutput: (output: any) => void;
  setError: (error: any) => void;
}

export interface IRuntimeProps {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export type ErosionData = Record<string, number|null>;
export interface IErosionDoc {
  text?: string;
  transept?: string;
  platformUserId: string;
  data: ErosionData;
}

