import React, { useState } from "react";
import "./transcept-table.scss";

const transcepts = ["A", "B", "C", "D"];
const points = [1, 2, 3, 4, 5, 6, 7];

export const TransceptTable = () => {
  const [selectedTranscept, setSelectedTranscept] = useState<string>();
  const [transceptData, setTransceptData] = useState<Array<number>>();

  const handleSelectTranscept = (e: any) => {
    setSelectedTranscept(e.target.value);
  };

  const handleInput = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <div className="transcept-table">
      <div className="selector" onChange={handleSelectTranscept}>
        <select>
          <option hidden selected disabled>Select a transcept</option>
          {transcepts.map((t) => {
            return <option key={t} value={t}>{`Transcept ${t}`}</option>;
          })}
        </select>
      </div>
      {points.map((p) => {
        return (
          <div key={p} className="point-input">
            <label>{`Point ${p}:`}</label>
            <input type="text" id={`${p}`} onChange={handleInput}></input>
          </div>
        );
      })}
    </div>
  );
};
