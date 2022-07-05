import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import MeshPanaluu from "./mesh-panaluu";
import "./immersive.scss";
import Warbear from "./Warbear";

interface IProps {
  selectedBeach?: string
}


const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(
    () => {
      // camera.rotateZ(Math.PI);
      const controls = new OrbitControls(camera, gl.domElement);
      controls.minDistance = 10;
      controls.maxDistance = 100;
      controls.enablePan = false;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};


export const Immersive = (props: IProps) => {
  const {selectedBeach} = props;
  const PleaseWait = () => <div>Please wait...</div>;

  return (
    <div id="immersive" className="canvas-container">
      <Suspense fallback={<PleaseWait/>}>
        <Canvas camera={ {fov:100, position: [0, 3,-10], near: 0.1}}>
          <CameraController />
          <ambientLight />
          {/* <pointLight position={[10, 10, 10]} /> */}
          <MeshPanaluu position={[0,0,0]} rotation={[0,0,0]}/>
          {selectedBeach === "Alaska" && <Warbear position={[0,0,0]}/>}
        </Canvas>
      </Suspense>
    </div>
  );
};
