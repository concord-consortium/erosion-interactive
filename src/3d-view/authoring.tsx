import * as React from "react";
import { IAuthoringInitInteractive, useAuthoredState } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "../common/types";

interface Props {
  initMessage: IAuthoringInitInteractive<IAuthoredState>;
}


export const AuthoringComponent: React.FC<Props> = ({initMessage}) => {
  // const { authoredState, setAuthoredState } = useAuthoredState<IAuthoredState>();

  // const handleFirebaseAppChange: (event: React.ChangeEvent<HTMLInputElement>) => void = e => {
  //   setAuthoredState({ firebaseApp: e.target.value });
  // };

  return (
    <div className="padded">
      {/* <fieldset>
        <legend>Authoring Options</legend>
        <label>
          Firebase App:&nbsp;
          <input type="text"
            value={authoredState?.firebaseApp}
            onChange={handleFirebaseAppChange} />
        </label>
      </fieldset> */}
    </div>
  );
};
