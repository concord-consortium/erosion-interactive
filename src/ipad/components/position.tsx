import React from "react";
import { CellKeys } from "../../common/constants";

interface IPositionProps {
  selectedBeach?: string;
  handleSetSelectedLocation: (e: any) => void;
  handleSetDirection: (direction: string) => void;
}

export const Position = (props: IPositionProps) => {
  const {selectedBeach, handleSetSelectedLocation, handleSetDirection} = props;

  const getDirectionFacing = () => {
    return "shoreline";
  }

  const handleClick: (e: any) => void = e => {
    const direction = getDirectionFacing();
    const location = e.target.value;

    handleSetSelectedLocation(location);
    handleSetDirection(direction);
  }

  return (
    <div className="position-chart">
      <img className="beach-background"/>
      <div className="transects-overlay">
        {CellKeys.map((cell: string) => {
          return <button key={cell} value={cell} onClick={handleClick}>{cell}</button>
        })}
      </div>
      Selected Beach: {props.selectedBeach}
    </div>
  )
}