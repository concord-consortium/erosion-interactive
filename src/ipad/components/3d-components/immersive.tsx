import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import MeshPanaluu from "./mesh-panaluu";
import Water from "./water";
import { Rulers } from "./rulers";
import { LandViewControls, ShoreViewControls } from "./overlay-controls";
import { CameraController } from "./camera-controller";
import { CellKeys } from "../../../common/constants";
import { getSelectedLocationData } from "../../../common/cell-keys-to-ipad";

import "./immersive.scss";

interface IProps {
  selectedBeach?: string;
  location: string;
  direction: string;
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
  const {selectedBeach, direction, location} = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rulerRef = useRef<THREE.Mesh>(null);

  const [selectedPointInfo, setSelectedPointInfo] = useState<ISelectedPointInformation>(defaultState);
  const [nextRulerInfo, setNextRulerInfo] = useState<ISelectedPointInformation>(defaultState);
  const [defaultCameraZ, setDefaultCameraZ] = useState<number>(0);

  useEffect(() => {
    setSelectedPointInfo(getSelectedLocationData(location));
  }, [location])


  useEffect(() => {
    if (direction === "seaward") {
      const nextRulerLocation = CellKeys[CellKeys.indexOf(location) + 1];
      setNextRulerInfo(getSelectedLocationData(nextRulerLocation));
    } else {
      const nextRulerLocation = CellKeys[CellKeys.indexOf(location) - 1];
      setNextRulerInfo(getSelectedLocationData(nextRulerLocation));
    }
  }, [location, direction])

  useEffect(() => {
    if (direction === "seaward") {
      const cameraZ = selectedPointInfo.z + 1;
      setDefaultCameraZ(cameraZ);
    } else {
      const cameraZ = selectedPointInfo.z - 1;
      setDefaultCameraZ(cameraZ);
    }
  }, [direction, selectedPointInfo])

  const handleCameraMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {x} = selectedPointInfo;
    const camera = cameraRef.current;
    camera?.position.set(x, Number(e.target.value), defaultCameraZ);
    camera?.updateProjectionMatrix();
  }

  const handleRulerMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {y, z} = selectedPointInfo;
    const ruler = rulerRef.current!;
    ruler?.position.set(Number(e.target.value), y + .5, z);
  }

  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        <Canvas>
          <ambientLight />
          <PerspectiveCamera
            ref={cameraRef}
            fov={50}
            position={[selectedPointInfo.x, selectedPointInfo.y + .5, defaultCameraZ]}
            near={.01}
            far={1000}
            makeDefault
          />
          <CameraController
            gridLocation={selectedPointInfo}
            direction={direction}
          />
          <Rulers
            direction={direction}
            primaryRulerLocation={selectedPointInfo}
            secondaryRulerLocation={nextRulerInfo}
            reference={rulerRef}
          />
          <MeshPanaluu/>
          <Water/>
        </Canvas>
        <div className="controls-overlay">
            {
              direction === "seaward" ?
                <ShoreViewControls handleChange={handleCameraMovement} selectedPointInfo={selectedPointInfo}/> :
                <LandViewControls selectedPointInfo={selectedPointInfo} handleChange={handleRulerMovement}/>
            }
        </div>
      </Suspense>
    </div>
  );
};
