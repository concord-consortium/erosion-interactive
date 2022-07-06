import React from "react";

interface IPositionProps {
  selectedBeach?: string;
}

export const Position = (props: IPositionProps) => {
  return (
    <div>
      Selected Beach: {props.selectedBeach}
    </div>
  )
}