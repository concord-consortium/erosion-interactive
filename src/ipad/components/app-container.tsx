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

const SHORELINE = "shoreline";
const LAND = "land";

export const AppContainer = (props: IContainerProps) => {
  const selectedBeach = props.selectedBeach;

  const [selectedTab, setSelectedTab] = useState<string>("position");
  const [screenMode, setScreenMode] = useState<string>("default");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [direction, setDirection] = useState<string>("");

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
    console.log("e.target.value from clicking on tab", e.target.value);
    console.log(e.target.value, selectedTab);
    setSelectedTab(e.target.value);
  };

  const handleSelectedLocation: (location: string) => void = location => {
    setSelectedLocation(location);
  }

  const handleSetDirection: (d: string) => void = d => {
    setDirection(d);
  }

  return (
    <div id="container" className={"app-container"}>
      {screenMode === "fullScreen" && <NavigationBar handleExit={handleFullScreen}/>}
      <Tabs selectedLocation={selectedLocation} selectedDirection={direction} handleClick={handleClick}/>
      <div className={`window-view ${selectedTab}`}>
        {selectedTab === "position" ?
        <Position
          selectedBeach={selectedBeach}
          selectedLocation={selectedLocation}
          direction={direction}
          handleSetSelectedLocation={handleSelectedLocation}
          handleSetDirection={handleSetDirection}
        /> :
        <Immersive
          location={selectedLocation}
          direction={direction}
          selectedBeach={selectedBeach}
        />}
        {screenMode === "default" &&
          <button className="fullscreen" onClick={handleFullScreen}>
            <FullScreenIcon/>
          </button>}
      </div>
    </div>
  )
}