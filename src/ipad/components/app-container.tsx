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
  const [screenMode, setScreenMode] = useState<string>("default");

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleFullScreenChange = () => {
    if (document.fullscreenElement) {
      setScreenMode("fullScreen");
    } else {
      setScreenMode("default");
    }
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.querySelector("#container")?.requestFullscreen();
    }
  }

  const handleClick: (event: React.ChangeEvent<HTMLButtonElement>) => void = e => {
    setSelectedTab(e.target.value);
  };

  return (
    <div id="container" className={"app-container"}>
      {screenMode === "fullScreen" && <NavigationBar handleExit={handleFullScreen}/>}
      <Tabs handleClick={handleClick}/>
      <div className={`window-view ${selectedTab}`}>
        {selectedTab === "position" ?
        <Position selectedBeach={selectedBeach}/> :
        <Immersive selectedBeach={selectedBeach}/>}
        {screenMode === "default" &&
          <button className="fullscreen" onClick={handleFullScreen}>
            <FullScreenIcon/>
          </button>}
      </div>
    </div>
  )
}