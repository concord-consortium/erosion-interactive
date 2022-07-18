import React, { useEffect, useState } from "react";
import { ISelectedPointInformation } from "./immersive";

interface IControlProps {
  selectedPointInfo: ISelectedPointInformation;
  handleChange: (e: any) => void;
}

interface ILandControlProps {
  handleChange: (e: any) => void;
  selectedPointInfo: ISelectedPointInformation;
}

export const ShoreViewControls = (props: IControlProps) => {
  const {handleChange, selectedPointInfo} = props;
  const {y} = selectedPointInfo;

  const [cameraHeight, setCameraHeight] = useState<number>(y + 1);

  useEffect(() => {
    setCameraHeight(y + 1); // we want the camera to default to 1 unit higher than the z-index of the point
  }, [y])

  const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setCameraHeight(Number(e.target.value));
    handleChange(e);
  }

  return (
      <div className="slider-container seaward">
        <input onChange={handleInput} value={cameraHeight} type="range" min={y} max={y + 2} className="slider" step="0.025" id="myRange"/>
      </div>
  )
}

export const LandViewControls = (props: ILandControlProps) => {
  const {handleChange, selectedPointInfo} = props;
  const {x} = selectedPointInfo;
  const [xValue, setXValue] = useState<number>(x);

  useEffect(() => {
    setXValue(x);
  }, [x])

  const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setXValue(Number(e.target.value));
    handleChange(e);
  }

  return (
    <div className="slider-container landward">
        <input onChange={handleInput} type="range" value={xValue} min={x - .5} max={x + .5} className="slider" step="0.025" id="myLandRange"/>
    </div>
  )
}