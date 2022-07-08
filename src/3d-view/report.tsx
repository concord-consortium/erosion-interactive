import * as React from "react";
import { IReportInitInteractive } from "@concord-consortium/lara-interactive-api";
import { IInteractiveState, IAuthoredState } from "../common/types";
import { ThreeDView } from "./components/three-d-view";
import { firebaseApp } from "../common/connect-to-firestore";
interface Props {
  initMessage: IReportInitInteractive<IInteractiveState, IAuthoredState>;
}

export const ReportComponent: React.FC<Props> = ({initMessage}) => {
  const { interactiveState} = initMessage;
  const { collectionPath } = interactiveState;
  if(collectionPath) {
    return <ThreeDView app={firebaseApp} collectionPath={collectionPath}></ThreeDView>
  }
  return (
    <div className="padded">
      <fieldset>
        <legend>Report Init Message</legend>
        <div className="padded monospace pre">{JSON.stringify(initMessage, null, 2)}</div>
      </fieldset>
    </div>
  );
};
