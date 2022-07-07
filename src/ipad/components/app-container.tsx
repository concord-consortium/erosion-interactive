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
    if (screenMode === "fullScreen") {
      document.querySelector("#container")?.requestFullscreen();
    }
  }, [screenMode])

  const handleClick: (event: React.ChangeEvent<HTMLButtonElement>) => void = e => {
    setSelectedTab(e.target.value);
  };

  const handleFullScreen = () => {
    setScreenMode("fullScreen");
  };

  const handleExitFullScreen = () => {
    document.exitFullscreen();
    setScreenMode("default");
  }

  return (
    <div id="container" className={"app-container"}>
      <Tabs handleClick={handleClick}/>
      <div className={`window-view ${selectedTab}`}>
        <NavigationBar screenMode={screenMode} handleFullScreen={handleFullScreen} handleExit={handleExitFullScreen}/>
        {selectedTab === "position" ?
        <Position selectedBeach={selectedBeach}/> :
        <Immersive selectedBeach={selectedBeach}/>}
      </div>
    </div>
  )
}