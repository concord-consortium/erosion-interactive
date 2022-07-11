import React, { Suspense } from "react";
import { Canvas} from "@react-three/fiber";
import MeshPanaluu from "./mesh-panaluu";
import { Ruler } from "./ruler";
import { FirstPersonControls } from "@react-three/drei"

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
        {/*position of camera will be location and will be passed down as props*/}
        <Canvas camera={{fov:100, position: [15, 1, 10], near: 0.1}}>
        <FirstPersonControls
          activeLook={false}
          autoForward={false}

        />
        <axesHelper args={[100]} />
          {/* direction === shore ? <ShoreViewControls/> : <LandViewControls/> */}
          <Ruler position={[-15, 10, -10]}/>
          <Ruler position={[-15, 10, -6.66]}/>
          <Ruler position={[-15, 10, -3.33]}/>
          <Ruler position={[-15, 10, 0]}/>
          <Ruler position={[-15, 10, 3.33]}/>
          <Ruler position={[-15, 10, 6.66]}/>
          <Ruler position={[-15, 10, 10]}/>

          <Ruler position={[-5, 10, -10]}/>
          <Ruler position={[-5, 10, -6.66]}/>
          <Ruler position={[-5, 10, -3.33]}/>
          <Ruler position={[-5, 10, 0]}/>
          <Ruler position={[-5, 10, 3.33]}/>
          <Ruler position={[-5, 10, 6.66]}/>
          <Ruler position={[-5, 10, 10]}/>

          <Ruler position={[5, 10, -10]}/>
          <Ruler position={[5, 10, -6.66]}/>
          <Ruler position={[5, 10, -3.33]}/>
          <Ruler position={[5, 10, 0]}/>
          <Ruler position={[5, 10, 3.33]}/>
          <Ruler position={[5, 10, 6.66]}/>
          <Ruler position={[5, 10, 10]}/>

          <Ruler position={[15, 10, -10]}/>
          <Ruler position={[15, 10, -6.66]}/>
          <Ruler position={[15, 10, -3.33]}/>
          <Ruler position={[15, 10, 0]}/>
          <Ruler position={[15, 10, 3.33]}/>
          <Ruler position={[15, 10, 6.66]}/>
          <Ruler position={[15, 10, 10]}/>
          <ambientLight />
          {/* <pointLight position={[10, 10, 10]} /> */}
          <MeshPanaluu position={[0,0,0]} rotation={[0,0,0]}/>
        </Canvas>
      </Suspense>
    </div>
  );
};
