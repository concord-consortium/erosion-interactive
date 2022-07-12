import * as React from "react";
import { ErosionData } from "../../common/types";
import { Transects, Points } from "../../common/constants";
import "./read-only-data-table.scss";

// For formatting numbers in the table
const zeroPad = (num:number, places:number, pad: string) => num.toFixed(2).padStart(places, pad);

export const ReadOnlyDataTable = (params: {data: ErosionData}) => {
  const { data } = params;

  const [ hidden, setHidden ] = React.useState(true);
  const CellForKey = (p: {id: string}) => {
    const {id } = p;
    const value = data[id] ? zeroPad(data[id]!, 3, '0') :  "-";
    return (
      <td key={id}>
        <span className="value">{value}</span>
      </td>
    )
  }

  const rows = Points.map((p) => (
    <tr key={p}>
      <th scope="row">{`P${p}`}</th>
      {
        Transects.map((t) => {
          const key=`${t}${p}`;
          return <CellForKey id={key} key={key}/>;
        })
      }
    </tr>
  ));
  const className = hidden ? "debug-section hidden" : "debugging-section";
  const showHide = hidden ? "show aggregate table" : "hide aggregate table";
  const clickAction = (e: any) => setHidden(!hidden);
  return (
    <div className="read-only-data-table">
      <div className="toggler" onClick={clickAction}>
        {showHide}
      </div>
      <div className={className}>
        <table>
          <thead>
            <tr>
              <th key="point"></th>
              {Transects.map( (t) => <th key={t} scope="col">{t}</th>) }
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  )
};
