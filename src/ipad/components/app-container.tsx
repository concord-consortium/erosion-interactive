import React, { useState } from "react";
import { Immersive } from "./immersive";
import { Position } from "./position";
import { Tabs } from "./tabs";

import "./app-container.scss";

interface IContainerProps {
  selectedBeach?: string;
}

export const AppContainer = (props: IContainerProps) => {
  const selectedBeach = props.selectedBeach;

  const [selectedTab, setSelectedTab] = useState<string>("measurement");

  const handleClick: (event: React.ChangeEvent<HTMLButtonElement>) => void = e => {
    setSelectedTab(e.target.value);
  }

  return (
    <div className={"app-container"}>
      <Tabs handleClick={handleClick}/>
      <div className={`window-view ${selectedTab}`}>
        {selectedTab === "position" ? <Position selectedBeach={selectedBeach}/> : <Immersive selectedBeach={selectedBeach}/>}
      </div>
    </div>
  )
}