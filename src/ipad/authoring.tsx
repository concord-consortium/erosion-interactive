import * as React from "react";
import { IAuthoringInitInteractive, useAuthoredState } from "@concord-consortium/lara-interactive-api";

export interface IAuthoredState {
  selectedBeach: string;
}

interface Props {
  initMessage: IAuthoringInitInteractive<IAuthoredState>;
}


export const AuthoringComponent: React.FC<Props> = ({initMessage}) => {
  const { authoredState, setAuthoredState } = useAuthoredState<IAuthoredState>();

  const handleBeachSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    setAuthoredState({ selectedBeach: e.target.value });
  };


  return (
    <div className="padded">
      <fieldset>
        <legend>Authoring Init Message</legend>
        <div className="padded monospace pre">{JSON.stringify(initMessage, null, 2)}</div>
      </fieldset>

      <fieldset>
        <legend>Authoring Options</legend>
        <label>
          Beach setting:&nbsp;
          <select defaultValue={authoredState?.selectedBeach || "PLACEHOLDER"} onChange={handleBeachSelection}>
            <option disabled value="PLACEHOLDER">Select a location</option>
            <option>Hawaii</option>
            <option>Alaska</option>
          </select>
        </label>
      </fieldset>
    </div>
  );
};
