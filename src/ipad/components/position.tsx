import React, { useState } from "react";
import { CellKeys, Points, Transects } from "../../common/constants";
import beachBackground from "../assets/position-map-background.png";
import "./position.scss";

interface IPositionProps {
  selectedBeach?: string;
  selectedLocation: string;
  direction: string;
  handleSetSelectedLocation: (e: any) => void;
  handleSetDirection: (d: string) => void;
}

export const Position = (props: IPositionProps) => {
  const {selectedLocation, direction, handleSetSelectedLocation, handleSetDirection} = props;

  const isSelected = (transectLabel: string) => {
    if (transectLabel === selectedLocation){
      return "selected";
    } else {
      return "";
    }
  }

  const handleClick: (e: any) => void = e => {
    const location = e.target.value;
    handleSetSelectedLocation(location);
  }

  const handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    const selectedDirection = e.target.value;
    handleSetDirection(selectedDirection);
  }

  return (
    <div className="position-container">
      <div className="direction">
        You are facing:
        <select value={direction || "DEFAULT"} onChange={handleSelect}>
          <option value="DEFAULT" disabled>Choose a direction...</option>
          <option value="shoreline">Seaward</option>
          <option value="land">Landward</option>
        </select>
      </div>
      <div className="position-chart">
        <div className="ocean"/>
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
                            disabled={transect !== "A"}
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
    </div>
  )
}