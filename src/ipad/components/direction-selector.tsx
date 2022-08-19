import React from "react";

interface IDirectionProps {
  selectedLocation?: string;
  direction: string;
  handleSetDirection: (e: any) => void;
}

export const DirectionSelector = (props: IDirectionProps) => {
  const {selectedLocation, direction, handleSetDirection} = props;

  const handleSelectDirection: (e: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    const selectedDirection = e.target.value;
    handleSetDirection(selectedDirection);
  }

  return (
    <div className="direction">
      <div className="title">Choose Your Direction</div>
      <div className="content">
        You are facing:
        <select disabled={!selectedLocation} value={direction || "DEFAULT"} onChange={handleSelectDirection}>
          <option value="DEFAULT" disabled>Choose a direction...</option>
          <option disabled={selectedLocation?.[1] === "7"} value="seaward">towards the sea</option>
          <option disabled={selectedLocation?.[1] === "1"} value="landward">towards land</option>
        </select>
      </div>
    </div>
  )
}