import React, { useEffect, useState } from "react";
import { IRuntimeInitInteractive, getFirebaseJwt, useInteractiveState } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "./authoring";
import { AppContainer } from "./components/app-container";
import { firebaseApp } from "../common/connect-to-firestore";
import { useErosionFirebaseDoc } from "../common/hooks/use-erosion-firebase-doc";

interface IInteractiveState {}

interface Props {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export const RuntimeComponent: React.FC<Props> = ({initMessage}) => {
  const [rawFirebaseJwt, setRawFirebaseJWT] = useState<string>();
  const { interactiveState, setInteractiveState } = useInteractiveState<IInteractiveState>();
  const { authoredState } = initMessage;
  const {platformUserId, collectionPath, documentPath } = useErosionFirebaseDoc(authoredState);


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
      setInteractiveState({collectionPath, documentPath});
    }
    // TODO: NP: Not sure how to avoid infinite re-render with setInteractiveState
    // listed as an effect hook dep here, which eslint would like me to do.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionPath, documentPath]);


  return (
    <>
    {collectionPath && documentPath && platformUserId &&
      <AppContainer
        app={firebaseApp}
        userID={platformUserId}
        collectionPath={collectionPath}
        documentPath={documentPath}
        selectedBeach={authoredState?.selectedBeach}
      />
    }
    </>
  );
};
