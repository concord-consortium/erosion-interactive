import React from "react";
import { CellKeys } from "../../common/constants";

interface IPartnerProps {
  selectedLocation: string;
  partnerLocation?: string;
  userLocations: Array<string>
  handleSetPartner: (e: any) => void;
}

export const PartnerSelector = (props: IPartnerProps) => {
  const {selectedLocation, userLocations, partnerLocation, handleSetPartner} = props;

  const handleSelectPartner: (e: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    const location = e.target.value;
    handleSetPartner(location);
  }

  return (
    <div className="partner-selector">
      <div className="title">Choose Your Partner</div>
      <div className="content">
        You are partnered with:
          <select disabled={!selectedLocation} value={partnerLocation || "DEFAULT"} onChange={handleSelectPartner}>
            <option value="DEFAULT" disabled>{`Select your partner...`}</option>
            {CellKeys.filter((loc) => loc !== selectedLocation).map((userLocation) => {
              return (
                <option key={userLocation} value={userLocation}>{userLocation}</option>
              )
            })}
          </select>
      </div>
    </div>
  )
}