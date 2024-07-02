import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Utgiagvik from "./utqiagvik";
import Waipio from "./waipio";
import Water from "./water";
import { Rulers } from "./rulers";
import { SliderControls } from "./overlay-controls";
import { CameraController } from "./camera-controller";
import { getSelectedLocationData } from "../../../common/cell-keys-to-ipad";
import { IErosionDoc } from "../../../common/types";
import { deleteField, doc, Firestore, updateDoc } from "firebase/firestore";

import "./immersive.scss";

const getRand = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

export const getRandomXForLandwardRuler = (num: number) => {
  const min = num - 2;
  const max = num + 2;
  // get random number that's less than num - 1 OR greater than num + 1
  const randomNum = Math.random() < 0.5 ? getRand(min, num - 1) : getRand(num + 1, max);
  // make sure it's divisible by .025 (step of the ruler)
  return Math.round(randomNum / .025) * .025;
}

interface IProps {
  docs: Array<IErosionDoc>;
  documentPath: string;
  fireStore: Firestore;
  selectedBeach?: string;
  location: string;
  direction: string;
  partnerLocation: string;
}

export interface ISelectedPointInformation {
  x: number,
  z: number,
  y: number
}

const defaultState: ISelectedPointInformation = {
  x: 0,
  z: 0,
  y: 0
}

export const Immersive = (props: IProps) => {
  const {direction, location, partnerLocation, docs, documentPath, fireStore, selectedBeach} = props;

  const [selectedLocationData, setSelectedLocationData] = useState<ISelectedPointInformation>(defaultState);
  const [currentLocation, setCurrentLocation] = useState<ISelectedPointInformation>(defaultState);
  const [nextRulerInfo, setNextRulerInfo] = useState<ISelectedPointInformation>(defaultState);
  const [cameraPosition, setCameraPosition] = useState<ISelectedPointInformation>(defaultState);

  useEffect(() => {
    updateDoc(doc(fireStore, documentPath), {locationXYZ: deleteField()})
    return () => {
      updateDoc(doc(fireStore, documentPath), {locationXYZ: deleteField()})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const data = getSelectedLocationData(location, selectedBeach);
    const {x, y, z} = data;
    if (direction === "seaward") {
      setCameraPosition({x, y: y + .95, z: z + 1});
      setCurrentLocation({x, y, z});
    } else {
      const randomX = getRandomXForLandwardRuler(x);
      setCameraPosition({x: randomX, y: y + 1, z: z - 2});
      setCurrentLocation({x: randomX, y, z});
    }
    setSelectedLocationData(data);
  }, [location, direction, selectedBeach]);

  useEffect(() => {
    updateDoc(doc(fireStore, documentPath), {locationXYZ: currentLocation});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  useEffect(() => {
    const partnerDoc = docs.filter((d) => d.location === partnerLocation)[0];
    if (partnerDoc && 'locationXYZ' in partnerDoc && partnerDoc.locationXYZ){
      setNextRulerInfo(partnerDoc.locationXYZ);
    } else {
      setNextRulerInfo(getSelectedLocationData(partnerLocation, selectedBeach));
    }
  }, [location, direction, partnerLocation, docs, selectedBeach]);

  const handleCameraMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setCameraPosition({...cameraPosition, y: Number(e.target.value)});
  };

  const handleRulerMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {y, z} = currentLocation;
    const newX = Number(e.target.value);
    updateDoc(doc(fireStore, documentPath), {locationXYZ: {x: newX, y, z}});
    setCurrentLocation({...currentLocation, x: newX});
    setCameraPosition({...cameraPosition, x: newX});
  }

  const PleaseWait = () => {
    return (
      <div>Please wait...</div>
    )
  };

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        <Canvas>
          <color attach="background" args={["#7fb2f6"]} />
          <ambientLight intensity={.25} color={"#ffffff"} position={[0, 100, -30]}/>
          <directionalLight intensity={1} position={[5, 100, -30]}/>
          <directionalLight intensity={1} position={[5, 100, 30]}/>
          <hemisphereLight intensity={1} color={"#00AAFF"} groundColor={"#494949"}/>
          <PerspectiveCamera
            fov={50}
            position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
            near={.01}
            far={1000}
            makeDefault
          />
          <CameraController
            gridLocation={selectedLocationData}
            direction={direction}
          />
          <Rulers
            direction={direction}
            primaryRulerLocation={currentLocation}
            secondaryRulerLocation={nextRulerInfo}
          />
          { props.selectedBeach === "hawaii" ? <Waipio /> : <Utgiagvik/>}
          <Water/>
        </Canvas>
        <div className="controls-overlay">
            {
              direction === "seaward" ?
                <SliderControls
                  handleChange={handleCameraMovement}
                  currentPosition={cameraPosition.y}
                  min={selectedLocationData.y + 0.1}
                  max={selectedLocationData.y + 2}
                  step={0.01}
                  direction={direction}
                /> :
                <SliderControls
                  handleChange={handleRulerMovement}
                  currentPosition={currentLocation.x}
                  min={selectedLocationData.x - 2}
                  max={selectedLocationData.x + 2}
                  step={0.025}
                  direction={direction}
                />
            }
        </div>
      </Suspense>
    </div>
  );
};
