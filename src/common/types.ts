import { IRuntimeInitInteractive } from "@concord-consortium/lara-interactive-api";

export interface IAuthoredState {
  firebaseApp?: string;
}

export interface AuthoringApiProps {
  setOutput: (output: any) => void;
  setError: (error: any) => void;
}


