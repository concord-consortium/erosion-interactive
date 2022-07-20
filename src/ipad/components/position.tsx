import React from "react";
import { DirectionSelector } from "./direction-selector";
import { PartnerSelector } from "./partner-selector";
import "./position.scss";
import { TransectTable } from "./transect-table";

interface IPositionProps {
  selectedBeach?: string;
  selectedLocation: string;
  partnerLocation?: string;
  userLocations: Array<string>;
  direction: string;
  handleSetSelectedLocation: (e: any) => void;
  handleSetPartner: (e: any) => void;
  handleSetDirection: (d: string) => void;
}

const Points = [7, 6, 5, 4, 3, 2, 1]

export const Position = (props: IPositionProps) => {
  const {selectedLocation, userLocations, direction, partnerLocation, handleSetSelectedLocation, handleSetPartner, handleSetDirection} = props;

  return (
    <div className="position-container">
      <div className="direction">
        <DirectionSelector
          selectedLocation={selectedLocation}
          direction={direction}
          handleSetDirection={handleSetDirection}
        />
        <PartnerSelector
          selectedLocation={selectedLocation}
          partnerLocation={partnerLocation}
          userLocations={userLocations}
          handleSetPartner={handleSetPartner}
        />
      </div>
      <div className="position-chart">
        <div className="ocean"/>
        <div className="transects-overlay">
          <TransectTable
            selectedLocation={selectedLocation}
            direction={direction}
            userLocations={userLocations}
            handleSetSelectedLocation={handleSetSelectedLocation}
          />
        </div>
      </div>
    </div>
  )
}
