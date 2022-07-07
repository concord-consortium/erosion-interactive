import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import MeshPanaluu from "./mesh-panaluu";
import Warbear from "./Warbear";

import "./immersive.scss";

interface IProps {
  selectedBeach?: string
}

export const Immersive = (props: IProps) => {
  const {selectedBeach} = props;
  // const {location, direction} = props;
  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        {/*position of camera will be location*/}
        <Canvas camera={ {fov:100, position: [0, 3,-10], near: 0.1}}>
          {/* direction === shore ? <ShoreViewControls/> : <LandViewControls/> */}
          <ambientLight />
          {/* <pointLight position={[10, 10, 10]} /> */}
          <MeshPanaluu position={[0,0,0]} rotation={[0,0,0]}/>
          {selectedBeach === "Alaska" && <Warbear position={[0,0,0]}/>}
        </Canvas>
      </Suspense>
    </div>
  );
};
