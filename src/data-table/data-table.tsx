import React from "react";
import { ErosionData } from "../common/types";
import { Transects, Points } from "../common/constants";

 import "./data-table.scss"

type anyFunction = (e: any) => void;
interface IDataTableProps {
  handleSelectTransect?: (e: any) => void;
  handleDataChange?: (e: any) => void;
  data: ErosionData;
  selectedTransect: string|undefined;
}

const Transect = (props: {
  selected:string|undefined,
  handleSelect:anyFunction|undefined,
  transects: string[]}) => {
  const {selected, handleSelect, transects} = props;

  if(handleSelect !== undefined) {
    return(
      <div className="selector">
        <select defaultValue={"DEFAULT"} onChange={handleSelect}>
          <option value="DEFAULT" disabled>Choose a transect ...</option>
          {transects.map((t) => {
            return <option key={t} value={t}>{`Transect ${t}`}</option>;
          })}
        </select>
      </div>
    );
  }

  return(
    <div className="selector">
      <span>{`Transect ${selected}`}</span>
    </div>
  )
}

export const DataTable = (props: IDataTableProps) => {
  const {selectedTransect, data, handleDataChange, handleSelectTransect} = props;
  return (
    <div className="data-table">
        <Transect
          selected={selectedTransect}
          transects={Transects}
          handleSelect={handleSelectTransect}
        />
        { selectedTransect &&
        <div className="input-table">
          <div className="legend">
            <span className="left">Point</span>
            <span className="right">Measurement</span>
          </div>
          {Points.map((p) => {
            // Convert null values to undefined in the form.
            const key  = selectedTransect + p;
            const value = data[key] === null ? undefined : data[key]!;
            return (
              <div key={selectedTransect + p + "div"} className="point-input">
                <label>{`P${p}:`}</label>
                <input
                  type="number"
                  step="0.01"
                  value={value}
                  key={key}
                  id={key}
                  readOnly={handleDataChange === undefined}
                  onChange={handleDataChange}>
                </input>
              </div>
            );
          })}
        </div>
        }
    </div>
  )
};
