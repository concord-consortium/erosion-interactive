import React, { useEffect, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore,  doc, setDoc } from 'firebase/firestore';
import { useLimitedCollection } from "../../common/hooks/use-limited-collection";
import { getSelectedLocationData } from "../../common/cell-keys-to-ipad";
import { IErosionDoc } from "../../common/types";
import { Immersive } from "./3d-components/immersive";
import { Position } from "./position";
import { Tabs } from "./tabs";
import { NavigationBar } from "./navigation-bar";
import { FullScreenIcon } from "./icons/full-screen";

import "./app-container.scss";

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
  const [docs] = useLimitedCollection<IErosionDoc>(app, collectionPath);

  const [selectedTab, setSelectedTab] = useState<string>("position");
  const [screenMode, setScreenMode] = useState<string>("default");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [partner, setPartner] = useState<string>("");
  const [userLocations, setUserLocations] = useState<Array<string>>([]);

  useEffect(() => {
    const otherUserLocations = docs.filter(d => Number(d.id) !== Number(userID)).map((d) => d.location||"");
    setUserLocations(otherUserLocations);
  }, [docs, userID])

  useEffect(() => {
    const userLocation = docs.filter(d => Number(d.id) === Number(userID)).map((d) => d.location||"");
    setSelectedLocation(userLocation[0]);
  }, [docs, userID])

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
    setDoc(doc(fireStore, documentPath), {location}, {merge: true})

    // if location is not empty string, get XYZ coordinates
    if (location.length) {
      const locationXYZ = getSelectedLocationData(location);
      setDoc(doc(fireStore, documentPath), {locationXYZ}, {merge: true});
    }
  }

  const handleSetPartner: (p: string) => void = p => {
    setPartner(p);
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
          selectedLocation={selectedLocation}
          partnerLocation={partner}
          direction={direction}
          userLocations={userLocations}
          handleSetSelectedLocation={handleSelectedLocation}
          handleSetPartner={handleSetPartner}
          handleSetDirection={handleSetDirection}
        /> :
        selectedLocation ?
        <Immersive
          fireStore={fireStore}
          docs={docs}
          documentPath={documentPath}
          location={selectedLocation}
          direction={direction}
          partnerLocation={partner}
        /> : <div>Select a location to proceed.</div>}
        {screenMode === "default" &&
          <button className="fullscreen" onClick={handleFullScreen}>
            <FullScreenIcon/>
          </button>}
      </div>
    </div>
  )
}