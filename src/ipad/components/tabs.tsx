import React from "react";

import "./tabs.scss";

interface IProps {
  handleClick: (e: any) => void;
}

export const Tabs = (props: IProps) => {
  return (
    <div className="tabs-container">
      <button value="position" className={"tab position"} onClick={props.handleClick}>Position</button>
      <button value="measurement" className={"tab measurement"} onClick={props.handleClick}>Measurement</button>
    </div>
  )
}