import React, { useEffect, useState } from "react";
import { Immersive } from "./3d-components/immersive";
import { Position } from "./position";
import { Tabs } from "./tabs";
import { NavigationBar } from "./navigation-bar";
import { FullScreenIcon } from "./icons/full-screen";

import "./app-container.scss";

interface IContainerProps {
  selectedBeach?: string;
}

export const AppContainer = (props: IContainerProps) => {
  const selectedBeach = props.selectedBeach;

  const [selectedTab, setSelectedTab] = useState<string>("measurement");

  const handleClick: (event: React.ChangeEvent<HTMLButtonElement>) => void = e => {
    setSelectedTab(e.target.value);
  };

  const [screenMode, setScreenMode] = useState<string>("default");

  useEffect(() => {
    if (screenMode === "fullScreen") {
      document.querySelector("#immersive-container")?.requestFullscreen();
    } else {
      // close full screen
    }
  })

  const handleFullScreen = () => {
    setScreenMode("fullScreen");
  };

  const handleExitFullScreen = () => {
    setScreenMode("default");
  }

  return (
    <div className={"app-container"}>
      <Tabs handleClick={handleClick}/>
      <div className={`window-view ${selectedTab}`}>
        {selectedTab === "position" ?
        <Position selectedBeach={selectedBeach}/> :
        <div id="immersive-container">
          {screenMode === "fullScreen" && <NavigationBar handleExit={handleExitFullScreen}/>}
          <Immersive selectedBeach={selectedBeach}/>
        </div>}
        <button className="fullscreen" onClick={handleFullScreen}><FullScreenIcon/></button>
      </div>
    </div>
  )
}