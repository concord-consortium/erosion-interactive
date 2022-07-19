import React, { useEffect, useState } from "react";
import { IRuntimeInitInteractive, getFirebaseJwt, useInteractiveState } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "./authoring";
import { AppContainer } from "./components/app-container";
import { firebaseApp } from "../common/connect-to-firestore";
import { useErosionFirebaseDoc } from "../common/hooks/use-erosion-firebase-doc";
import { collection } from "firebase/firestore";

interface IInteractiveState {}

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
  }, [collectionPath, documentPath]);


  return (
    <>
    {collectionPath && documentPath &&
      <AppContainer
        app={firebaseApp}
        collectionPath={collectionPath}
        documentPath={documentPath}
        selectedBeach={authoredState?.selectedBeach}
      />
    }
    </>
  );
};
