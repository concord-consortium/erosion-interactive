import * as React from "react";
import { IRuntimeInitInteractive } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "./authoring";
import { Immersive } from "./components/immersive";

interface IInteractiveState {}

interface Props {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export const RuntimeComponent: React.FC<Props> = ({initMessage}) => {
  const { authoredState } = initMessage;

  return (
      <Immersive
        selectedBeach={authoredState?.selectedBeach}
      />
  );
};
