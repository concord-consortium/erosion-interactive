import * as React from "react";
const { useEffect, useState } = React;
import { IRuntimeInitInteractive, getFirebaseJwt } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "./types";
import { ThreeDView } from "./components/three-d-view";

interface IInteractiveState {}

interface Props {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

export const RuntimeComponent: React.FC<Props> = ({initMessage}) => {
  const [rawFirebaseJwt, setRawFirebaseJWT] = useState<string>();
  const { authoredState } = initMessage;
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
      <ThreeDView
        initMessage={initMessage}
      />
    </div>
  );
};
