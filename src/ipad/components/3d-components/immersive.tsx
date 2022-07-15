import React, { Ref, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import MeshPanaluu from "./mesh-panaluu";
import Ruler from "./ruler";
import { LandViewControls, ShoreViewControls } from "./overlayControls";
import { CameraController } from "./cameraController";

import { getSelectedLocationData } from "../../../common/cell-keys-to-ipad";

import "./immersive.scss";
import { PerspectiveCamera } from "@react-three/drei";

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

  useEffect(() => {
    setSelectedPointInfo(getSelectedLocationData(location));

  }, [location])

  useEffect(() => {
    console.log("camera Ref", cameraRef.current);
  })

  const handleCameraMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {transectLocation, pointLocation} = selectedPointInfo;
    const camera = cameraRef.current;
    camera?.position.set(transectLocation, Number(e.target.value), pointLocation);
    camera?.updateProjectionMatrix();
    console.log("Camera", camera);
  }

  const handleRulerMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const {pointLocation} = selectedPointInfo;
    const ruler = rulerRef.current;
    ruler?.position.set(Number(e.target.value), 2, pointLocation - 1);
  }

  const PleaseWait = () => <div>Please wait...</div>;

  // camera={{fov:50, position:[0, 0, 0], rotation:[0, 0, 0], near: .01, far: 1000}}
  // position={[selectedPointInfo.transectLocation, 5, selectedPointInfo.pointLocation]}

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        <Canvas>
          <PerspectiveCamera
            ref={cameraRef}
            fov={50}
            position={[selectedPointInfo.transectLocation, selectedPointInfo.pointHeight + 1, selectedPointInfo.pointLocation]}
            near={.01}
            far={1000}
            makeDefault
          />
          <CameraController
            gridLocation={selectedPointInfo}
            direction={direction}
          />
          <axesHelper args={[100]} />
          {/* Ruler y-location will depend on whether facing land or beach */}
          <Ruler
            reference={rulerRef}
            position={[selectedPointInfo.transectLocation, selectedPointInfo.pointHeight + .5, selectedPointInfo.pointLocation + .5]}
          />
          <Ruler position={[selectedPointInfo.transectLocation, 3, selectedPointInfo.pointLocation + 2]}/>
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
