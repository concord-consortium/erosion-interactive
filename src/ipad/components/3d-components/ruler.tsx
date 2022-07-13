import React from "react";

interface IRulerProps {
  position: [x: number, y: number, z: number];
  direction: string;
  reference?: React.RefObject<THREE.Mesh>|null;
}

export const Ruler = (props: IRulerProps) => {
  const {position, direction, reference} = props;

  // direction props will determine texture applied (ruler view or plain stick)

  return (
    <mesh position={position} ref={reference}>
      <boxGeometry args={[.25, 3, .01]}/>
      <meshStandardMaterial color={"brown"}/>
    </mesh>
  )
}