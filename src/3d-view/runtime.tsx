import * as React from "react";
const { useEffect, useState, useMemo } = React;
import { IRuntimeInitInteractive, getFirebaseJwt, useInteractiveState } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState, IInteractiveState } from "../common/types";
import { ThreeDView } from "./components/three-d-view";
import { firebaseApp } from "../common/connect-to-firestore";
import { useErosionFirebaseDoc } from "../common/hooks/use-erosion-firebase-doc";

interface Props {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export const RuntimeComponent: React.FC<Props> = ({initMessage}) => {
  const [rawFirebaseJwt, setRawFirebaseJWT] = useState<string>();
  const { interactiveState, setInteractiveState } = useInteractiveState<IInteractiveState>();
  const { authoredState } = initMessage;
 const {collectionPath, documentPath } = useErosionFirebaseDoc(authoredState);


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

  useEffect( () => {
    if(documentPath && collectionPath) {
      setInteractiveState({collectionPath,documentPath});
    }
    // TODO: NP: Not sure how to avoid infinite re-render with setInteractiveState
    // listed as an effect hook dep here, which eslint would like me to do.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionPath, documentPath]);

  return (
    <div className="padded">
      {collectionPath && <ThreeDView app={firebaseApp} collectionPath={collectionPath}/>}
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
