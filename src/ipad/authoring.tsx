import * as React from "react";
import { IAuthoringInitInteractive, useAuthoredState } from "@concord-consortium/lara-interactive-api";
import { useState } from "react";

export interface IAuthoredState {
  selectedBeach: string;
  firebaseApp?: string;
}

interface Props {
  initMessage: IAuthoringInitInteractive<IAuthoredState>;
}


export const AuthoringComponent: React.FC<Props> = ({initMessage}) => {
  const { authoredState, setAuthoredState } = useAuthoredState<IAuthoredState>();
  const [beach, setBeach] = useState<string>("PLACEHOLDER");

  React.useEffect(() => {
    if (authoredState?.selectedBeach) {
      setBeach(authoredState.selectedBeach);
    }
  }, [authoredState])

  const handleBeachSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    setBeach(e.target.value);
    setAuthoredState({ selectedBeach: e.target.value });
  };

  return (
    <div className="padded">

      <fieldset>
        <legend>Authoring Options</legend>
        <label>
          Beach setting:&nbsp;
          <select value={beach} onChange={handleBeachSelection}>
            <option disabled value="PLACEHOLDER">Select a location</option>
            <option value="hawaii">Hawaii</option>
            <option value="alaska">Alaska</option>
          </select>
        </label>
      </fieldset>
    </div>
  );
};
