import React from "react";
import concordLogo from "../assets/concord-logo.png";

import "./navigation-bar.scss";

interface INavProps {
  screenMode: string;
  handleFullScreen: () => void;
  handleExit: () => void;
}

export const NavigationBar = (props: INavProps) => {
  const {screenMode, handleFullScreen, handleExit} = props;
  return (
    <div className="navbar">
      <img src={concordLogo} alt="Concord Consortium logo"/>
      <span>Precipitating Change: Coastal Erosion</span>
      { screenMode === "default" ?
      <button onClick={handleFullScreen}>Enter fullscreen</button> :
      <button onClick={handleExit}>Back to activity</button>
      }
    </div>
  )
}