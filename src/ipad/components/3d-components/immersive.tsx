import React, { Suspense, useEffect, useState } from "react";
import { Canvas} from "@react-three/fiber";
import MeshPanaluu from "./mesh-panaluu";
import { Ruler } from "./ruler";
import { FirstPersonControls } from "@react-three/drei"

import { translateCellKeyToGridPosition } from "../../../common/cell-keys-to-ipad";

import "./immersive.scss";

interface IProps {
  selectedBeach?: string;
  location: string;
  direction: string;
}


export const Immersive = (props: IProps) => {
  const {selectedBeach, direction, location} = props;

  const [gridLocation, setGridLocation] = useState<any>();

  useEffect(() => {
    setGridLocation(translateCellKeyToGridPosition(location));
  }, [location])

  const [rotation, setRotation] = useState<any>([0, 0, 0]);

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

  const renderShoreViewControls = () => {
    return (
      <div className="shore-view-controls">
        {/* code for a slider thing that controls camera goes here*/}
      </div>
    )
  };

  const renderLandViewControls = () => {
    return (
      <div className="shore-view-controls">
        {/* code for a slider thing that controls ruler goes here*/}
      </div>
    )
  }

  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        {/*position & rotation of camera will be passed down as props*/}
        <Canvas camera={{fov:100, position: [gridLocation.x, 1, gridLocation.y], rotation: [rotation[0], rotation[1], rotation[2]], near: 0.1}}>
          <FirstPersonControls
            activeLook={false}
            autoForward={false}
          />
          <axesHelper args={[100]} />
          <Ruler position={[-15, 10, -10]}/>
          <ambientLight />
          <MeshPanaluu position={[0,0,0]} rotation={[0,0,0]}/>
        </Canvas>
        <div className="controls-overlay">
          { direction === "shore" ? renderShoreViewControls() : renderLandViewControls()}
        </div>
      </Suspense>
    </div>
  );
};
