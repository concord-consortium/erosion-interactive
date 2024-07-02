import React from 'react';

interface IControlProps {
  currentPosition: number;
  min: number;
  max: number;
  handleChange: (e: any) => void;
  step: number;
  direction: string;
}

export const SliderControls = (props: IControlProps) => {
  const {handleChange, currentPosition, min, max, direction} = props;

  const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    handleChange(e);
  }

  return (
      <div className={`slider-container ${direction}`}>
        <input
          type="range"
          onChange={handleInput}
          value={currentPosition}
          min={min}
          max={max}
          className="slider"
          step="0.01"
          id={`my${direction}Range`}
        />
      </div>
  );
};
