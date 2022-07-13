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
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const {selectedBeach, direction, location} = props;
  const [gridLocation, setGridLocation] = useState<any>({x: 0, y: 0});
  const [rotation, setRotation] = useState<any>([0, 0, 0]);

  useEffect(() => {
    setGridLocation(translateCellKeyToGridPosition(location));
  }, [location])

  useEffect(() => {
    setRotation(getRotationFromDirection(direction));
  }, [direction]);

  const getRotationFromDirection = (dir: string) => {
    if (dir === "shoreline") {
      return [0, 0, 0];
    } else {
      return [0, 0, 0];
    }
  }

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const camera = cameraRef.current;
    camera?.position.set(15, Number(e.target.value), -10);
    camera?.updateProjectionMatrix();
  }

  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        {/*position & rotation of camera will be determined by props*/}
        <Canvas>
          <PerspectiveCamera ref={cameraRef} makeDefault fov={100} position={[15, 2, -10]} near={.1}/>
          <CameraController gridLocation={gridLocation} direction={direction}/>
          <axesHelper args={[100]} />
          {/*position of ruler will also be determined by props*/}
          <Ruler direction={direction} position={[15, 2, -9]}/>
          <Ruler direction={direction} position={[15, 2, -5.66]}/>
          {/* if direction is facing land, ruler will be wrapped in transform controls
            <TransformControls>
              <Ruler/>
            </TransformControls>
          */}
          <ambientLight />
          <MeshPanaluu position={[0,0,0]} rotation={[0,0,0]}/>
        </Canvas>
        <div className="controls-overlay">
            {
              direction === "shoreline" ?
                <ShoreViewControls handleChange={handleChange}/> :
                <LandViewControls handleChange={handleChange}/>
            }
        </div>
      </Suspense>

    </div>

  );
};
