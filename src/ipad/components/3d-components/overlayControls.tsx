import React, { useEffect, useState } from "react";

interface IControlProps {
  handleChange: (e: any) => void;
}

interface ILandControlProps {
  handleChange: (e: any) => void;
  gridLocation: {x: number, y: number}
}

export const ShoreViewControls = (props: IControlProps) => {
  return (
      <div className="slider-container shoreline">
        <input onChange={props.handleChange} defaultValue="2" type="range" min="1" max="4" className="slider" step="0.10" id="myRange"/>
      </div>
  )
}

export const LandViewControls = (props: ILandControlProps) => {
  const {handleChange, gridLocation} = props;
  const [xValue, setXValue] = useState<number>(gridLocation.x);

  useEffect(() => {
    setXValue(gridLocation.x);
  }, [gridLocation])

  const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setXValue(Number(e.target.value));
    handleChange(e);
  }

  return (
    <div className="slider-container land">
        <input onChange={handleInput} type="range" value={xValue} min={gridLocation.x - 1} max={gridLocation.x + 1} className="slider" step="0.10" id="myLandRange"/>
    </div>
  )
}