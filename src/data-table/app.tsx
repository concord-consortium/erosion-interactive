import * as React from "react";
const { useEffect } = React;
// import ResizeObserver from "resize-observer-polyfill";

import { useInitMessage, setSupportedFeatures } from "@concord-consortium/lara-interactive-api";
// import { AuthoringComponent } from "./authoring";
// import { ReportComponent } from "./report";
import { RuntimeComponent } from "./runtime";
import { IAuthoredState } from "../common/types";

interface Props {}
interface IInteractiveState {}

export const AppComponent = (props:Props) => {
  const initMessage = useInitMessage<IInteractiveState, IAuthoredState>();

  // TODO: this should really be moved into a client hook file so it can be reused
  // useEffect(() => {
  //   if (initMessage) {
  //     const body = document.getElementsByTagName("BODY")[0];
  //     const updateHeight = () => {
  //       if (body?.clientHeight) {
  //         setHeight(body.clientHeight);
  //       }
  //     };
  //     const observer = new ResizeObserver(() => updateHeight());
  //     if (body) {
  //       observer.observe(body);
  //     }
  //     return () => observer.disconnect();
  //   }
  // }, [initMessage]);

  useEffect(() => {
    if (initMessage) {
      setSupportedFeatures({
        authoredState: true,
        interactiveState: true
      });
    }
  }, [initMessage]);

  if (!initMessage) {
    return (
      <div className="centered">
        <div className="progress">
          Loading...
        </div>
      </div>
    );
  }

  switch (initMessage.mode) {
    // case "authoring":
    //   return <AuthoringComponent initMessage={initMessage} />;
    // case "report":
    //   return <ReportComponent initMessage={initMessage} />;
    case "runtime":
      return <RuntimeComponent initMessage={initMessage} />;
    default:
      return <>Error: unknown mode: {initMessage.mode}</>;
  }
};
