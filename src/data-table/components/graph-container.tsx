import React, { useEffect, useState } from "react";
import { BarGraph } from "./bar-graph";

import "./graph-container.scss";

interface IGraphContainerProps {
  transectData: Partial<ITransectDataPoint>;
  selectedTransect: string|undefined;
}
interface ITransectDataPoint {
  [key: string]: number|null;
}

export const BarGraphContainer = (props: IGraphContainerProps) => {
  const {transectData, selectedTransect} = props;
  const [selectedTransectData, setSelectedTransectData] = useState<Array<ITransectDataPoint>>();

  useEffect(() => {
    const onlySelectedTransectData = [];
    for (const key in transectData){
      if (key[0] === selectedTransect){
        const newObj: ITransectDataPoint = {};
        newObj[key] = transectData[key]||null;
        onlySelectedTransectData.push(newObj);
      }
    }
    onlySelectedTransectData.sort((a: ITransectDataPoint, b: ITransectDataPoint) => Number(Object.keys(a)[0][1]) - Number(Object.keys(b)[0][1]));
    setSelectedTransectData(onlySelectedTransectData);
  }, [selectedTransect, transectData]);

  return (
    <div className="graph-container">
      { selectedTransect &&
        <BarGraph data={selectedTransectData}/>
      }
    </div>
  )
};
