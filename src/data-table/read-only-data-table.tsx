import * as React from "react";
import { ErosionData } from "../common/types";
import { Transects, Points } from "../common/constants";
import "./read-only-data-table.scss";

export const ReadOnlyDataTable = (params: {data: ErosionData}) => {
  const {data} = params;
  const zeroPad = (num:number, places:number, pad: string) => String(num).padStart(places, pad);
  const CellForKey = (p: {id: string}) => {
    const {id } = p;
    const value = data[id] ? zeroPad(data[id]!, 3, '0') :  "-";
    return (
      <td key={id}>
        {/* <span className="key">{id}</span>: &nbsp; */}
        <span className="value">{value}</span>
      </td>
    )
  }

  const rows = Points.map((p) => (
    <tr key={p}>
      {
        Transects.map((t) => {
          const key=`${t}${p}`;
          return <CellForKey id={key} key={key}/>;
        })
      }
    </tr>
  ));
  return (<table className="data-table">{rows}</table>)
};
