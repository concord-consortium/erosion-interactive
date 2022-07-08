import React from "react";
import { MeasureIcon } from "./icons/measure";
import { PositionIcon } from "./icons/position";

import "./tabs.scss";

interface IProps {
  handleClick: (e: any) => void;
}

export const Tabs = (props: IProps) => {
  return (
    <div className="tabs-container">
      <button value="position" className={"tab position"} onClick={props.handleClick}>
        <span className="vertical">Select Position</span>
        <PositionIcon/>
      </button>
      <button value="measurement" className={"tab measurement"} onClick={props.handleClick}>
        <span className="vertical" onClick={props.handleClick}>Measure</span>
        <MeasureIcon/>
      </button>
    </div>
  )
}