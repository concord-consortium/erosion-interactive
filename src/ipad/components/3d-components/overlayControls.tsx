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
  const {pointHeight} = selectedPointInfo;

  const [cameraHeight, setCameraHeight] = useState<number>(pointHeight + 1);

  useEffect(() => {
    setCameraHeight(pointHeight + 1); // we want the camera to default to 1 unit higher than the z-index of the point
  }, [pointHeight])

  const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setCameraHeight(Number(e.target.value));
    handleChange(e);
  }

  return (
      <div className="slider-container shoreline">
        <input onChange={handleInput} value={cameraHeight} type="range" min={pointHeight} max={pointHeight + 2} className="slider" step="0.10" id="myRange"/>
      </div>
  )
}

export const LandViewControls = (props: ILandControlProps) => {
  const {handleChange, selectedPointInfo} = props;
  const {transectLocation} = selectedPointInfo;
  const [xValue, setXValue] = useState<number>(transectLocation);

  useEffect(() => {
    setXValue(transectLocation);
  }, [transectLocation])

  const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setXValue(Number(e.target.value));
    handleChange(e);
  }

  return (
    <div className="slider-container land">
        <input onChange={handleInput} type="range" value={xValue} min={transectLocation - 1} max={transectLocation + 1} className="slider" step="0.10" id="myLandRange"/>
    </div>
  )
}