import * as React from "react";
import { useState, useEffect } from "react";
import * as client from "@concord-consortium/lara-interactive-api";
import { IAuthoringInitInteractive, useAuthoredState } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "./types";

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

  const [showURLInput, setShowURLInput ] = useState(false);
  const [showLinkedInteractiveInput, setShowLinkedInteractiveInput ] = useState<boolean>(false);

  const [ allInteractives, setAllInteractives ] = useState<Array<client.ILinkedInteractive>>([]);
  const [ linkedInteractive, setLinkedInteractive ] = useState<client.ILinkedInteractive>();

  const { authoredState, setAuthoredState } = useAuthoredState<IAuthoredState>();

  useEffect(() => {
    getInteractives();
  }, []);

  useEffect(() => {
    handleSetLinkedInteractives();
  }, [linkedInteractive]);

  // currently only getting interactives on same page
  const getInteractives = async () => {
    const scope = "page";
    const supportsSnapshots = undefined;

    try {
      const interActiveList = await client.getInteractiveList({scope, supportsSnapshots});
      setAllInteractives(
        interActiveList.interactives
          .filter(interactive => interactive.id !== initMessage.interactiveItemId)
          .map(interactive => {
            return {id: interactive.id, label: interactive.name};
          }));
    } catch (err) {
      setAuthoringApiError(err);
    }
  };

  const handleSetLinkedInteractives = async () => {
    const linkedInteractiveID = linkedInteractive?.id;
    try {
      client.setLinkedInteractives({linkedInteractives: allInteractives, linkedState: linkedInteractiveID});
      setAuthoredState({linkedInteractive});
    } catch (err) {
      setAuthoringApiError(err);
    }
  };

  const handleURLChange: (event: React.ChangeEvent<HTMLInputElement>) => void = e => {
    setAuthoredState({dataUrl: e.target.value});
  };

  const handleUploadOptions: (event: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    if (e.target.value === "url"){
      setShowURLInput(true);
      setShowLinkedInteractiveInput(false);
      setAuthoredState({linkedInteractive: undefined});
    } else {
      setShowLinkedInteractiveInput(true);
      setShowURLInput(false);
      setAuthoredState({dataUrl: undefined});
    }
  };

  const handleLinkedInteractiveChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    const indexOfOption = e.target.options.selectedIndex;
    const id = e.target.options[indexOfOption].getAttribute("id")!;
    const label = e.target.value;

    setLinkedInteractive({id, label});
  };

  const renderInteractiveList = () => {
    return (
      allInteractives.map((interactive: client.ILinkedInteractive) => {
        return (
          <option key={interactive.id} id={interactive.id} value={interactive.label}>{`${interactive.label} (ID: ${interactive.id})`}</option>
        );
      })
    );
  };

  return (
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
            {renderInteractiveList()}
          </select>
        </div>
      }

      {authoringApiError && <div>{JSON.stringify(authoringApiError)}</div>}
    </div>
  );
};
