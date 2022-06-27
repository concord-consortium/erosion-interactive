import React, { useState } from "react";
import "./transect-table.scss";

interface ITransectData {
  [key: string]: number
}

const transects = ["A", "B", "C", "D"];
const points = [1, 2, 3, 4, 5, 6, 7];

export const TransectTable = () => {
  const [selectedTransect, setSelectedTransect] = useState<string>();
  const [transectData, setTransectData] = useState<ITransectData>({});

  const handleSelectTransect = (e: any) => {
    setSelectedTransect(e.target.value);
  };

  const handleInput = (e: any) => {
    const pointID = e.target.getAttribute("id");
    const pointValue = Number(e.target.value);

    const newTransectData = {...transectData};
    newTransectData[pointID] = pointValue;

    setTransectData(newTransectData);
  };

  return (
    <div className="transect-table">
      <div className="selector" onChange={handleSelectTransect}>
        <select>
          <option hidden selected disabled>Select a transect</option>
          {transects.map((t) => {
            return <option key={t} value={t}>{`Transect ${t}`}</option>;
          })}
        </select>
      </div>
      {selectedTransect && points.map((p) => {
        return (
          <div key={p} className="point-input">
            <label>{`P${p}:`}</label>
            <input type="number" step="0.01" id={selectedTransect + p} onChange={handleInput}></input>
          </div>
        );
      })}
      <div className="debugging">TransecttData: {JSON.stringify(transectData)}</div>
    </div>
  );
};
