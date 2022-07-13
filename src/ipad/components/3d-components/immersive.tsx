import React, { Ref, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import MeshPanaluu from "./mesh-panaluu";
import { Ruler } from "./ruler";
import { LandViewControls, ShoreViewControls } from "./overlayControls";
import { CameraController } from "./cameraController";

import { translateCellKeyToGridPosition } from "../../../common/cell-keys-to-ipad";

import "./immersive.scss";
import { PerspectiveCamera } from "@react-three/drei";

interface IProps {
  selectedBeach?: string;
  location: string;
  direction: string;
}

export const Immersive = (props: IProps) => {
  const {selectedBeach, direction, location} = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rulerRef = useRef<THREE.Mesh>(null);

  const [gridLocation, setGridLocation] = useState<any>({x: 0, y: 0});

  useEffect(() => {
    setGridLocation(translateCellKeyToGridPosition(location));
  }, [location])

  const handleCameraMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const camera = cameraRef.current;
    camera?.position.set(gridLocation.x, Number(e.target.value), gridLocation.y);
    camera?.updateProjectionMatrix();
  }

  const handleRulerMovement: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const ruler = rulerRef.current;
    ruler?.position.set(Number(e.target.value), 2, gridLocation.y - 1);
  }

  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        <Canvas>
          <PerspectiveCamera ref={cameraRef} makeDefault fov={50} position={[gridLocation.x, 2, gridLocation.y]} near={.01} far={1000}/>
          <CameraController gridLocation={gridLocation} direction={direction}/>
          <axesHelper args={[100]} />
          {/* Ruler y-location will depend on whether facing land or beach */}
          <Ruler reference={rulerRef} direction={direction} position={[gridLocation.x, 2, gridLocation.y - 1]}/>
          {/* <Ruler direction={direction} position={[gridLocation.x, 2, gridLocation.y - 5]}/> */}
          <ambientLight />
          <MeshPanaluu position={[0,0,0]}/>
        </Canvas>
        <div className="controls-overlay">
            {
              direction === "shoreline" ?
                <ShoreViewControls handleChange={handleCameraMovement}/> :
                <LandViewControls gridLocation={gridLocation} handleChange={handleRulerMovement}/>
            }
        </div>
      </Suspense>

    </div>

  );
};
