import * as React from "react";
import { IReportInitInteractive } from "@concord-consortium/lara-interactive-api";

interface Props {
  initMessage: IReportInitInteractive;
}

export const ReportComponent: React.FC<Props> = ({initMessage}) => {
  return (
    <div className="padded">
      <fieldset>
        <legend>Report Init Message</legend>
        <div className="padded monospace pre">{JSON.stringify(initMessage, null, 2)}</div>
      </fieldset>
    </div>
  );
};
