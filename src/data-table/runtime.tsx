import * as React from "react";

import { IRuntimeInitInteractive } from "@concord-consortium/lara-interactive-api";
import { firebaseApp } from "../common/connect-to-firestore";
import { IAuthoredState, IInteractiveState } from "../common/types";
import { useErosionFirebaseDoc } from "../common/hooks/use-erosion-firebase-doc";
import { FirebaseEditForm } from "./components/firestore-update-form";

import "./runtime.scss";

interface IRuntimeProps {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export const RuntimeComponent = (props: IRuntimeProps) => {
  const { initMessage } = props;
  const { authoredState } = initMessage;
  const {platformUserId, collectionPath, loading, error, documentPath } = useErosionFirebaseDoc(authoredState);

  if (loading) {
    return (<div> <p>Authenticating ...</p> </div> );
  }

  if (error) {
    return (<div>Error!</div>);
  }

  if (documentPath && collectionPath && platformUserId) {
    return (
      <div className={"main"}>
        <p>Current User: {platformUserId}</p>
        <FirebaseEditForm
          app={firebaseApp}
          platformUserId={platformUserId}
          collectionPath={collectionPath}
          docPath={documentPath}
        />
      </div>
    );
  }

  return (
    <div>
      You are not logged in.
    </div>
  );
};
