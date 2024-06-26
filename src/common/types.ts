import { IRuntimeInitInteractive } from "@concord-consortium/lara-interactive-api";

export type Transect = string;

export interface IAuthoredState {
  firebaseApp?: string;
}


export interface IInteractiveState {
  lastTransect?: Transect;
  documentPath: string;
  collectionPath: string;
}

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
  transect?: string;
  id: string;
  location?: string;
  locationXYZ?: ITerrainVert;
  data: ErosionData;
  avatar?: string;
}

export interface ITerrainVert {
  x: number,
  y: number,
  z: number
}

export interface I3DIpadVert {
  x: number,
  y: number
}

export interface ITransectData {
  x: number,
  heights: Array<number>
}

export interface IBeachData {
  [transect: string]: ITransectData
}
