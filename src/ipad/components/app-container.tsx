import React, { useEffect, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { Immersive } from "./3d-components/immersive";
import { Position } from "./position";
import { Tabs } from "./tabs";
import { NavigationBar } from "./navigation-bar";
import { FullScreenIcon } from "./icons/full-screen";
import { getFirestore,  setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { IErosionDoc, ITerrainVert } from "../../common/types";
import { useLimitedCollection } from "../../common/hooks/use-limited-collection";
import { getAvailableAvatarID } from "./icons/icon-helpers";

import "./app-container.scss";
import { useDocument } from "react-firebase-hooks/firestore";

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
  const [snapshot, loading, error] = useDocument(doc(fireStore, documentPath));

  const [selectedTab, setSelectedTab] = useState<string>("position");
  const [screenMode, setScreenMode] = useState<string>("default");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [otherUsers, setOtherUsers] = useState<Array<IErosionDoc>>([])
  const [direction, setDirection] = useState<string>("");

  useEffect(() => {
    const currentUserLocation = snapshot?.data()?.location;
    if (currentUserLocation) {setSelectedLocation(currentUserLocation);}
  }, [snapshot])

  useEffect(() => {
    const currentUserAvatar = docs.filter((d) => {
      return d.avatar !== undefined && Number(d.id) === Number(userID);
    });
    if (!currentUserAvatar?.length){
      const assignedAvatars = docs.map((d) => d.avatar);
      const avatar = getAvailableAvatarID(assignedAvatars);
      updateDoc(doc(fireStore, documentPath), {avatar})
    }
  }, [snapshot])

  useEffect(() => {
    const otherUserDocs = docs.filter((d) => {
      return d.location !== undefined && Number(d.id) !== Number(userID);
    })
    setOtherUsers(otherUserDocs as any);
  }, [docs, userID]);

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
    updateDoc(doc(fireStore, documentPath), {location});
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
          snapshot={snapshot}
          selectedLocation={selectedLocation}
          direction={direction}
          otherUsers={otherUsers}
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