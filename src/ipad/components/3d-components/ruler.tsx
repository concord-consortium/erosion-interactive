import React from "react";

interface IRulerProps {
  position: [x: number, y: number, z: number];
  direction: string;
}

export const Ruler = (props: IRulerProps) => {
  const {position, direction} = props;

  // direction props will determine texture applied (ruler view or plain stick)

  return (
    <mesh position={position}>
      <boxGeometry args={[.5, 6, .01]}/>
      <meshStandardMaterial color={"green"}/>
    </mesh>
  )
}