import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Utgiagvik from "./utqiagvik";
import Waipio from "./waipio";
import Water from "./water";
import { LandViewControls, ShoreViewControls } from "./overlay-controls";
import { getRandomX, getSelectedLocationData } from "../../../common/cell-keys-to-ipad";
import { IErosionDoc } from "../../../common/types";
import { doc, Firestore, updateDoc } from "firebase/firestore";
import { DynamicComponents } from "./dynamic-components";
import { Sky } from "./sky";

import "./immersive.scss";

export interface IProps {
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
  const selectedLocationData = getSelectedLocationData(location, selectedBeach);

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rulerRef = useRef<THREE.Mesh>(null);

  const [currentLocation, setCurrentLocation] = useState<ISelectedPointInformation>(defaultState);
  const [seawardRulerLocation, setSeawardRulerLocation] = useState<ISelectedPointInformation>(defaultState);
  const [landwardRulerLocation, setLandwardRulerLocation] = useState<ISelectedPointInformation>(defaultState);
  const [defaultCameraZ, setDefaultCameraZ] = useState<number>(0);

  useEffect(() => {
    setCurrentLocation(selectedLocationData);
    if (direction === "landward") {
      const x = getRandomX(selectedLocationData.x);
      setLandwardRulerLocation({x, y: selectedLocationData.y, z: selectedLocationData.z})
    } else {
      setSeawardRulerLocation(selectedLocationData);
    }
  }, [location, direction]);

  useEffect(() => {
    const cameraZ = direction === "seaward" ? currentLocation.z + 1 : currentLocation.z - 1;
    setDefaultCameraZ(cameraZ);
  }, [direction, currentLocation])

  const updateRulerLocation = (xyz: ISelectedPointInformation, ruler: string) => {
    if (ruler === "landward") {
      setLandwardRulerLocation(xyz);
    } else {
      setSeawardRulerLocation(xyz);
    }
  }

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
          <ambientLight />
          {/* <Sky/> */}
          <directionalLight intensity={1} position={[5, 100, -120]}/>
          <DynamicComponents
            fireStore={fireStore}
            documentPath={documentPath}
            docs={docs}
            currentLocation={currentLocation}
            direction={direction}
            partnerLocation={partnerLocation}
            selectedBeach={selectedBeach}
            rulerRef={rulerRef}
            cameraRef={cameraRef}
            defaultCameraZ={defaultCameraZ}
            seawardRulerLocation={seawardRulerLocation}
            landwardRulerLocation={landwardRulerLocation}
            updateRulerLocation={updateRulerLocation}
          />
          { props.selectedBeach === "hawaii" ? <Waipio /> : <Utgiagvik/>}
          <Water/>
        </Canvas>
        <div className="controls-overlay">
            {
              direction === "seaward" ?
                <ShoreViewControls currentLocation={seawardRulerLocation} handleChange={handleCameraMovement}/> :
                <LandViewControls selectedLocationData={currentLocation} landwardRulerLocation={landwardRulerLocation} handleChange={handleRulerMovement}/>
            }
        </div>
      </Suspense>
    </div>
  );
};
