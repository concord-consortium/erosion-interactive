import React, { useState } from "react";
import { Transects } from "../../common/constants";

const Points = [7, 6, 5, 4, 3, 2, 1]

interface ITransectTableProps {
  selectedLocation: string;
  direction: string;
  userLocations: Array<string>;
  handleSetSelectedLocation: (e: any) => void;
}

export const TransectTable = (props: ITransectTableProps) => {
  const {selectedLocation, userLocations, direction, handleSetSelectedLocation} = props;

  const isSelected = (location: string) => {
    if (selectedLocation === location) {
      return "selected";
    } else {
      return "";
    }
  }

  const isOccupied = ((location: string) => {
    return userLocations.includes(location) ? "occupied" : "";
  })

  const isDisabled = (transect: string, point: number) => {
    const transectLabel = transect + point;
    if (transect !== "A") {
      return true;
    } else if (userLocations?.includes(transectLabel)) {
      return true;
    } else if (point === 1 && direction === "landward") {
      return true;
    } else if (point === 7 && direction === "seaward") {
      return true;
    } else {
      return false;
    }
  }

  const handleClick: (e: any) => void = e => {
    const location = e.target.value;

    if (selectedLocation !== location) {
      handleSetSelectedLocation(location);
    } else {
      handleSetSelectedLocation("");
    }
  }

  return (
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
                      className={`point-button ${isSelected(pointLabel)} ${isOccupied(pointLabel)}`}
                      value={pointLabel}
                      disabled={isDisabled(transect, point)}
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
  )
}