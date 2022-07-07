import * as React from "react";
const { useEffect, useState } = React;
import { IRuntimeInitInteractive, getFirebaseJwt } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "../common/types";
import { ThreeDView } from "./components/three-d-view";
import { useErosionFirebaseDoc } from "../common/hooks/use-erosion-firebase-doc";

interface IInteractiveState {}

interface Props {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export const RuntimeComponent: React.FC<Props> = ({initMessage}) => {
  const [rawFirebaseJwt, setRawFirebaseJWT] = useState<string>();
  const { authoredState } = initMessage;
  const { collectionPath } = useErosionFirebaseDoc(authoredState);

  useEffect(() => {
    if (authoredState?.firebaseApp) {
      getFirebaseJwt(authoredState.firebaseApp)
        .then(response => {
          setRawFirebaseJWT(response.token);
        })
        .catch(e => {
          setRawFirebaseJWT(`ERROR: ${e.toString()}`);
        });
    }
  }, [authoredState]);

  return (
    <div className="padded">
      <ThreeDView collectionPath={collectionPath}/>
      <fieldset>
        <legend>Runtime Init Message</legend>
        <div className="padded monospace pre">{JSON.stringify(initMessage, null, 2)}</div>
      </fieldset>
      <fieldset>
        <legend>FirebaseJWT Response</legend>
        <div className="padded monospace pre">{rawFirebaseJwt}</div>
      </fieldset>
    </div>
  );
};
