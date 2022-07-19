import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Transects } from "../../common/constants";
import { IErosionDoc } from "../../common/types";
import { Avatar } from "./avatar";
import "./position.scss";

interface IPositionProps {
  selectedBeach?: string;
  snapshot: DocumentSnapshot<DocumentData> | undefined;
  selectedLocation: string;
  otherUsers: Array<IErosionDoc>;
  direction: string;
  handleSetSelectedLocation: (e: any) => void;
  handleSetDirection: (d: string) => void;
}

const Points = [7, 6, 5, 4, 3, 2, 1]

export const Position = (props: IPositionProps) => {
  const {snapshot, selectedLocation, otherUsers, direction, handleSetSelectedLocation, handleSetDirection} = props;

  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userLocations, setUserLocations] = useState<Array<string>>([]);

  useEffect(() => {
    const currentUserAvatar: string = snapshot?.data()?.avatar;
    if (currentUserAvatar){
      setUserAvatar(currentUserAvatar);
    }
  }, [snapshot]);

  useEffect(() => {
    const currentUserID = snapshot?.data()?.id;
    const locations = otherUsers.filter((d) => d.id !== currentUserID).map((d) => d.location||"");
    setUserLocations(locations);
  }, [otherUsers, snapshot])


  const isSelected = (transectLabel: string) => {
    if (transectLabel === selectedLocation){
      return "selected";
    } else {
      return "";
    }
  }

  const isOccupied = ((transectLabel: string) => {
    return userLocations.includes(transectLabel) ? "occupied" : "";
  })

  const handleClick: (e: any) => void = e => {
    const location = e.target.value;
    handleSetSelectedLocation(location);
  }

  const handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void = e => {
    const selectedDirection = e.target.value;
    handleSetDirection(selectedDirection);
  }

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

  return (
    <div className="position-container">
      <div className="direction">
        You are facing:
        <select disabled={!selectedLocation} value={direction || "DEFAULT"} onChange={handleSelect}>
          <option value="DEFAULT" disabled>Choose a direction...</option>
          <option disabled={selectedLocation[1] === "7"} value="seaward">Seaward</option>
          <option disabled={selectedLocation[1] === "1"} value="landward">Landward</option>
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
                            className={`point-button ${isSelected(pointLabel)} ${isOccupied(pointLabel)}`}
                            value={pointLabel}
                            disabled={isDisabled(transect, point)}
                            key={pointLabel}
                            onClick={handleClick}>
                              {pointLabel}
                          </button>
                          {userLocations.includes(pointLabel) && <Avatar avatar={otherUsers.filter((doc) => doc.location === pointLabel)[0].avatar!}/>}
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