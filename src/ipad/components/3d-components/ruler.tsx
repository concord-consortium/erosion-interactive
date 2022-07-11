import React from "react";

interface IRulerProps {
  position: [x: number, y: number, z: number];
}

export const Ruler = (props: IRulerProps) => {
  return (
    <mesh position={props.position}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={"green"}/>
    </mesh>
  )
}