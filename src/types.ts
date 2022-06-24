interface ILinkedInteractive {
  id: string;
  label: string;
}
export interface IAuthoredState {
  dataUrl?: string;
  linkedInteractive?: ILinkedInteractive;
  firebaseApp?: string;
}
