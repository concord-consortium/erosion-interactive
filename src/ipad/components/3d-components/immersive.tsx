import React, { InputHTMLAttributes, Suspense, useEffect, useState } from "react";
import { Canvas} from "@react-three/fiber";
import MeshPanaluu from "./mesh-panaluu";
import { Ruler } from "./ruler";
import { FirstPersonControls } from "@react-three/drei"

import { translateCellKeyToGridPosition } from "../../../common/cell-keys-to-ipad";

import "./immersive.scss";
import { ShoreViewControls } from "./shoreViewControls";

interface IProps {
  selectedBeach?: string;
  location: string;
  direction: string;
}


export const Immersive = (props: IProps) => {
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
    console.log(e.target.value);
  }

  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        {/*position & rotation of camera will be determined by props*/}
        <Canvas camera={{fov:100, position: [15, 0, -10], near: 0.1}}>
          <axesHelper args={[100]} />
          <Ruler position={[-15, 10, -10]}/>
          <ambientLight />
          <MeshPanaluu position={[0,0,0]} rotation={[0,0,0]}/>
        </Canvas>
      </Suspense>
      <div className="controls-overlay">
        <ShoreViewControls handleChange={handleChange}/>
      </div>
    </div>

  );
};
