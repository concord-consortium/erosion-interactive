import React from "react";
import { MeasureIcon } from "./icons/measure";
import { PositionIcon } from "./icons/position";

import "./tabs.scss";

interface IProps {
  selectedLocation: string;
  selectedDirection: string;
  handleClick: (e: any) => void;
}

export const Tabs = (props: IProps) => {
  const {selectedLocation, selectedDirection, handleClick} = props;
  const locationIsNotSelected = selectedLocation.length === 0;
  const directionIsNotSelected = selectedDirection.length === 0;


  return (
    <div className="tabs-container">
      <button value="position" className={"tab position"} onClick={handleClick}>
        <span className="vertical">Select Position</span>
        <PositionIcon/>
      </button>
      <button disabled={locationIsNotSelected || directionIsNotSelected} value="measurement" className={"tab measurement"} onClick={handleClick}>
        <span className="vertical">Measure</span>
        <MeasureIcon/>
      </button>
    </div>
  )
}