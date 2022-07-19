import React, { useEffect, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { Immersive } from "./3d-components/immersive";
import { Position } from "./position";
import { Tabs } from "./tabs";
import { NavigationBar } from "./navigation-bar";
import { FullScreenIcon } from "./icons/full-screen";
import { getFirestore,  setDoc, doc, getDoc } from 'firebase/firestore';
import { IErosionDoc, ITerrainVert } from "../../common/types";



import "./app-container.scss";
import { useLimitedCollection } from "../../common/hooks/use-limited-collection";

interface IContainerProps {
  app: FirebaseApp;
  userID: string;
  collectionPath: string;
  documentPath: string;
  selectedBeach?: string;
}

export const AppContainer = (props: IContainerProps) => {
  const {app, collectionPath, documentPath, userID} = props;

  const fireStore = getFirestore(app);
  const [docs] = useLimitedCollection<IErosionDoc>(app, collectionPath, [userID]);
  const [userLocations, setUserLocations] = useState<Array<string>>([])

  const [selectedTab, setSelectedTab] = useState<string>("position");
  const [screenMode, setScreenMode] = useState<string>("default");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [direction, setDirection] = useState<string>("");

  useEffect(() => {
    const locations = docs.filter((d) => d.location !== undefined).map((d) => d.location);
    setUserLocations(locations as any);
  },[docs]);

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

  const handleSelectedLocation: (location: string) => void = location => {
    setSelectedLocation(location);
    // write to firestore the user's selected location
    if (props.documentPath) {
      setDoc(doc(fireStore, props.documentPath), {location});
    }
  }

  const handleSetDirection: (d: string) => void = d => {
    setDirection(d);
  }

  return (
    <div id="container" className={"app-container"}>
      <div>
        {userLocations.map((loc) => <p key={loc}>{loc}</p>)}
      </div>
      {screenMode === "fullScreen" && <NavigationBar handleExit={handleFullScreen}/>}
      <Tabs selectedLocation={selectedLocation} selectedDirection={direction} handleClick={handleClick}/>
      <div className={`window-view ${selectedTab}`}>
        {selectedTab === "position" ?
        <Position
          selectedLocation={selectedLocation}
          direction={direction}
          userLocations={userLocations}
          handleSetSelectedLocation={handleSelectedLocation}
          handleSetDirection={handleSetDirection}
        /> :
        <Immersive
          location={selectedLocation}
          direction={direction}
        />}
        {screenMode === "default" &&
          <button className="fullscreen" onClick={handleFullScreen}>
            <FullScreenIcon/>
          </button>}
      </div>
    </div>
  )
}