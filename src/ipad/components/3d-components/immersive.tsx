import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import MeshPanaluu from "./mesh-panaluu";
import Water from "./water";
import { Rulers } from "./rulers";
import { LandViewControls, ShoreViewControls } from "./overlay-controls";
import { CameraController } from "./camera-controller";
import { getRandomX, getSelectedLocationData } from "../../../common/cell-keys-to-ipad";
import { IErosionDoc } from "../../../common/types";
import { deleteField, doc, Firestore, updateDoc } from "firebase/firestore";

import "./immersive.scss";

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
  const {direction, location, partnerLocation, docs, documentPath, fireStore} = props;
  const selectedLocationData = getSelectedLocationData(location);

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rulerRef = useRef<THREE.Mesh>(null);

  const [currentLocation, setCurrentLocation] = useState<ISelectedPointInformation>(defaultState);
  const [nextRulerInfo, setNextRulerInfo] = useState<ISelectedPointInformation>(defaultState);
  const [defaultCameraZ, setDefaultCameraZ] = useState<number>(0);

  useEffect(() => {
    if (direction === "landward") {
      const randomX = getRandomX(selectedLocationData.x)
      setCurrentLocation({x: randomX, y: selectedLocationData.y, z: selectedLocationData.z})
    } else {
      setCurrentLocation(selectedLocationData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, direction]);

  useEffect(() => {
    const partnerDoc = docs.filter((d) => d.location === partnerLocation)[0];
    if (partnerDoc && 'locationXYZ' in partnerDoc && partnerDoc.locationXYZ){
      setNextRulerInfo(partnerDoc.locationXYZ);
    } else {
      setNextRulerInfo(getSelectedLocationData(partnerLocation));
    }
  }, [location, direction, partnerLocation, docs]);

  useEffect(() => {
    return () => {
      updateDoc(doc(fireStore, documentPath), {locationXYZ: deleteField()})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const cameraZ = direction === "seaward" ? currentLocation.z + 1 : currentLocation.z - 1;
    setDefaultCameraZ(cameraZ);
  }, [direction, currentLocation])

  const handleCameraMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {x} = currentLocation;
    const camera = cameraRef.current;
    camera?.position.set(x, Number(e.target.value), defaultCameraZ);
    camera?.updateProjectionMatrix();
  }

  const handleRulerMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {y, z} = currentLocation;
    const ruler = rulerRef.current!;

    const newX = Number(e.target.value);
    ruler?.position.set(newX, y, z);

    updateDoc(doc(fireStore, documentPath), {locationXYZ: {x: newX, y, z}});
  }

  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        <Canvas>
          <color attach="background" args={["#D4F2FD"]} />
          <ambientLight />
          <PerspectiveCamera
            ref={cameraRef}
            fov={50}
            position={[selectedLocationData.x, selectedLocationData.y + .5, defaultCameraZ]}
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
            reference={rulerRef}
          />
          <MeshPanaluu/>
          <Water/>
        </Canvas>
        <div className="controls-overlay">
            {
              direction === "seaward" ?
                <ShoreViewControls handleChange={handleCameraMovement} currentLocation={currentLocation}/> :
                <LandViewControls selectedLocationData={selectedLocationData} handleChange={handleRulerMovement}/>
            }
        </div>
      </Suspense>
    </div>
  );
};
