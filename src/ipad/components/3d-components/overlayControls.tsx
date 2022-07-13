import React from "react";

interface IControlProps {
  handleChange: (e: any) => void;
}

export const ShoreViewControls = (props: IControlProps) => {
  return (
      <div className="slider-container">
        <input onChange={props.handleChange} type="range" min="1" max="100" className="slider" id="myRange"/>
      </div>
  )
}

export const LandViewControls = (props: IControlProps) => {
  return (
    <div className="slider-container">
        <input onChange={props.handleChange} type="range" min="1" max="100" className="slider" id="myRange"/>
    </div>
  )
}