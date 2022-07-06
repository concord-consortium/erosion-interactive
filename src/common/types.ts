export interface IAuthoredState {
  firebaseApp?: string;
}

export interface AuthoringApiProps {
  setOutput: (output: any) => void;
  setError: (error: any) => void;
}

export type ErosionData = Record<string, number|null>;
export interface IErosionDoc {
  text?: string;
  transept?: string;
  externalId: string;
  data: ErosionData;
}

