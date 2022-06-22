interface ILinkedInteractive {
  id: string;
  name: string;
}
export interface IAuthoredState {
  dataUrl?: string;
  linkedInteractive?: ILinkedInteractive;
  firebaseApp?: string;
}

export interface Interactive {
  "id": string;
  "pageId": number;
  "name": string;
  "section": string;
  "url": string;
  "thumbnailUrl": string|null;
  "supportsSnapshots": boolean;
}