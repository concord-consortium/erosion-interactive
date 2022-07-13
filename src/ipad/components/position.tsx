import React, { useState } from "react";
import { CellKeys, Points, Transects } from "../../common/constants";
import beachBackground from "../assets/position-map-background.png";
import "./position.scss";

interface IPositionProps {
  selectedBeach?: string;
  handleSetSelectedLocation: (e: any) => void;
  handleSetDirection: (direction: string) => void;
}

export const Position = (props: IPositionProps) => {
  const {selectedBeach, handleSetSelectedLocation, handleSetDirection} = props;
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const getDirectionFacing = () => {
    return "shoreline";
  }

  const isSelected = (transectLabel: string) => {
    if (transectLabel === selectedLocation){
      return "selected";
    } else {
      return "";
    }
  }

  const handleClick: (e: any) => void = e => {
    const direction = getDirectionFacing();
    const location = e.target.value;

    setSelectedLocation(location);

    handleSetSelectedLocation(location);
    handleSetDirection(direction);
  }

  return (
    <div className="position-chart">
      <img className="beach-background" src={beachBackground}/>
      <div className="transects-overlay">
        <table className="transect-table">
          <tbody>
            {Points.map((point) => {
              return (
                <tr key={point}>
                  {Transects.map((transect) => {
                    const pointLabel = `${transect}${point}`;
                    return (
                      <td key={pointLabel}>
                        <button
                          className={`point-button ${isSelected(pointLabel)}`}
                          value={pointLabel}
                          key={pointLabel}
                          onClick={handleClick}>
                            {pointLabel}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              )
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}