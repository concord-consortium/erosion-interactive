import * as React from "react";
import { useState, useEffect } from "react";
import * as client from "@concord-consortium/lara-interactive-api";
import { IAuthoringInitInteractive, useAuthoredState } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState, Interactive } from "./types";

import "./authoring.scss";

interface Props {
  initMessage: IAuthoringInitInteractive<IAuthoredState>;
}

export interface AuthoringApiProps {
  setOutput: (output: any) => void;
  setError: (error: any) => void;
}

export const AuthoringComponent: React.FC<Props> = ({initMessage}) => {
  const [authoringApiError, setAuthoringApiError] = useState<any>();
  const [authoringApiOutput, setAuthoringApiOutput] = useState<any>();

  const [showURLInput, setShowURLInput ] = useState(false);
  const [showLinkedInteractiveInput, setShowLinkedInteractiveInput ] = useState<boolean>(false);

  const { authoredState, setAuthoredState } = useAuthoredState<IAuthoredState>();

  useEffect(() => {
    getInteractives();
  }, []);

  const getInteractives = async () => {
    const scope = "page";
    const supportsSnapshots = undefined;

    try {
      setAuthoringApiOutput(await client.getInteractiveList({scope, supportsSnapshots}));
      console.log(await client.getInteractiveList({scope, supportsSnapshots}));
    } catch (err) {
      setAuthoringApiError(err);
    }
  };

  const handleFirebaseAppChange: (event: React.ChangeEvent<HTMLInputElement>) => void = e => {
    setAuthoredState({ firebaseApp: e.target.value });
  };

  const handleURLChange: (event: React.ChangeEvent<HTMLInputElement>) => void = e => {
    setAuthoredState({dataUrl: e.target.value});
  };

  const handleUploadOptions: (event: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    if (e.target.value === "url"){
      setShowURLInput(true);
      setShowLinkedInteractiveInput(false);
    } else if (e.target.value === "linkedInteractive"){
      setShowLinkedInteractiveInput(true);
      setShowURLInput(false);
      setAuthoredState({dataUrl: undefined});
    }
  };

  const handleLinkedInteractiveChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    const indexOfOption = e.target.options.selectedIndex;
    const id = e.target.options[indexOfOption].getAttribute("id")!;
    const name = e.target.value;
    setAuthoredState({linkedInteractive: {id, name}});
  };

  const renderInterActiveList = () => {
    return (
      authoringApiOutput.interactives.map((interactive: Interactive) => {
        return (
          <option key={interactive.id} id={interactive.id} value={interactive.name}>{`${interactive.name} (ID: ${interactive.id})`}</option>
        );
      })
    );
  };

  return (
    <>
    <div className="authoring">
      <div>
        <label htmlFor="uploadOptions">Simulation will receive data from:&nbsp;</label>
        <select name="uploadOptions" onChange={handleUploadOptions}>
          <option hidden selected> -- select an option -- </option>
          <option value="url">URL</option>
          <option value="linkedInteractive">Linked Interactive</option>
        </select>
      </div>

      {showURLInput &&
        <div className="sub">
          <label htmlFor="url">URL:&nbsp;</label>
          <input type="url" onChange={handleURLChange} pattern="https://.*" />
        </div>
      }

      {showLinkedInteractiveInput &&
        <div className="sub">
          <label htmlFor="linkInteractiveOptions">Linked Interactives:&nbsp; </label>
          <select name="uploadOptions" onChange={handleLinkedInteractiveChange}>
            <option hidden selected> -- select an option -- </option>
            {renderInterActiveList()}
          </select>
        </div>
      }
    </div>
    <div className="padded">

      <fieldset>
        <legend>Authoring APIs</legend>

        {authoringApiError ? <div className="padded margined error">{authoringApiError.toString()}</div> : undefined}

        {authoringApiOutput
          ? <div className="padded margined monospace pre">{JSON.stringify(authoringApiOutput, null, 2)}</div>
          : undefined
        }
      </fieldset>

      <fieldset>
        <legend>Authoring Init Message</legend>
        <div className="padded monospace pre">{JSON.stringify(initMessage, null, 2)}</div>
      </fieldset>

      <fieldset>
        <legend>Authoring Options</legend>
        <label>
          Firebase App:&nbsp;
          <input type="text"
            value={authoredState?.firebaseApp}
            onChange={handleFirebaseAppChange} />
        </label>
      </fieldset>

    </div>
    </>
  );
};
