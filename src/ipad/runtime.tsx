import * as React from "react";
import { IRuntimeInitInteractive } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "./authoring";
import { AppContainer } from "./components/app-container";

interface IInteractiveState {}

interface Props {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export const RuntimeComponent: React.FC<Props> = ({initMessage}) => {
  const { authoredState } = initMessage;

  return (
      <AppContainer
        selectedBeach={authoredState?.selectedBeach}
      />
  );
};
