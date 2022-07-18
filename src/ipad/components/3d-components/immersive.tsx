import React, { Ref, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import MeshPanaluu from "./mesh-panaluu";
import Ruler from "./ruler";
import { LandViewControls, ShoreViewControls } from "./overlayControls";
import { CameraController } from "./cameraController";
import { CellKeys} from "../../../common/constants";
import { getSelectedLocationData } from "../../../common/cell-keys-to-ipad";

import "./immersive.scss";

interface IProps {
  selectedBeach?: string;
  location: string;
  direction: string;
}

export interface ISelectedPointInformation {
  transectLocation: number,
  pointLocation: number,
  pointHeight: number
}

const defaultState: ISelectedPointInformation = {
  transectLocation: 0,
  pointLocation: 0,
  pointHeight: 0
}

export const Immersive = (props: IProps) => {
  const {selectedBeach, direction, location} = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rulerRef = useRef<THREE.Mesh>(null);

  const [selectedPointInfo, setSelectedPointInfo] = useState<ISelectedPointInformation>(defaultState);
  const [nextRulerInfo, setNextRulerInfo] = useState<ISelectedPointInformation>(defaultState);
  const [cameraLocation, setCameraLocation] = useState<number>(0);

  useEffect(() => {
    setSelectedPointInfo(getSelectedLocationData(location));
  }, [location])

  useEffect(() => {
    if (direction === "shoreline") {
      const nextRulerLocation = CellKeys[CellKeys.indexOf(location) + 1];
      setNextRulerInfo(getSelectedLocationData(nextRulerLocation));
    } else {
      const nextRulerLocation = CellKeys[CellKeys.indexOf(location) - 1];
      setNextRulerInfo(getSelectedLocationData(nextRulerLocation));
    }
  }, [location, direction])

  useEffect(() => {
    if (direction === "shoreline") {
      const cameraDirection = selectedPointInfo.pointLocation + .5;
      setCameraLocation(cameraDirection);
    } else {
      const cameraDirection = selectedPointInfo.pointLocation - .5;
      setCameraLocation(cameraDirection);
    }
  }, [direction, selectedPointInfo])

  const handleCameraMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {transectLocation} = selectedPointInfo;
    const camera = cameraRef.current;
    camera?.position.set(transectLocation, Number(e.target.value), cameraLocation);
    camera?.updateProjectionMatrix();
  }

  const handleRulerMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {pointLocation, pointHeight} = selectedPointInfo;
    const ruler = rulerRef.current;
    ruler?.position.set(Number(e.target.value), pointHeight + .5, pointLocation);
  }

  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        <Canvas>
          <PerspectiveCamera
            ref={cameraRef}
            fov={50}
            position={[selectedPointInfo.transectLocation, selectedPointInfo.pointHeight + 1, cameraLocation]}
            near={.01}
            far={1000}
            makeDefault
          />
          <CameraController
            gridLocation={selectedPointInfo}
            direction={direction}
          />
          <axesHelper args={[100]} />
          <Ruler
            reference={rulerRef}
            position={[selectedPointInfo.transectLocation, selectedPointInfo.pointHeight + .5, selectedPointInfo.pointLocation]}
          />
          <Ruler position={[nextRulerInfo.transectLocation, nextRulerInfo.pointHeight + .5, nextRulerInfo.pointLocation]}/>
          <ambientLight />
          <MeshPanaluu/>
        </Canvas>
        <div className="controls-overlay">
            {
              direction === "shoreline" ?
                <ShoreViewControls handleChange={handleCameraMovement} selectedPointInfo={selectedPointInfo}/> :
                <LandViewControls selectedPointInfo={selectedPointInfo} handleChange={handleRulerMovement}/>
            }
        </div>
      </Suspense>

    </div>

  );
};
