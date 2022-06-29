import React from "react";

import "./data-table.scss"

const transects = ["A", "B", "C", "D"];
const points = [1, 2, 3, 4, 5, 6, 7];

interface IDataTableProps {
  handleSelectTransect: (e: any) => void;
  handleDataChange: (e: any) => void;
  data: Record<string,number|undefined>;
  selectedTransect: string|undefined;
}

export const DataTable = (props: IDataTableProps) => {
  const {selectedTransect, data} = props;
  return (
    <div className="data-table">
        <div className="selector">
          <select defaultValue={"DEFAULT"} onChange={props.handleSelectTransect}>
            <option value="DEFAULT" disabled>Choose a transect ...</option>
            {transects.map((t) => {
              return <option key={t} value={t}>{`Transect ${t}`}</option>;
            })}
          </select>
        </div>
        { selectedTransect &&
        <div className="input-table">
          <div className="legend">
            <span className="left">Point</span>
            <span className="right">Measurement</span>
          </div>
          {points.map((p) => {
            return (
              <div key={selectedTransect + p + "div"} className="point-input">
                <label>{`P${p}:`}</label>
                <input type="number" step="0.01" value={data[selectedTransect + p]} key={selectedTransect + p} id={selectedTransect + p} onChange={props.handleDataChange}></input>
              </div>
            );
          })}
        </div>
        }
    </div>
  )
};
