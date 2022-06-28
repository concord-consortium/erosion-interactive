import React, { useEffect, useState } from "react";

import "./bar-graph.scss";

interface IBarGraphProps {
  transectData: Partial<ITransectDataPoint>;
  selectedTransect: string|undefined;
}
interface ITransectDataPoint {
  [key: string]: number|undefined;
}

export const BarGraph = (props: IBarGraphProps) => {
  const {transectData, selectedTransect} = props;

  const [selectedTransectData, setSelectedTransectData] = useState<Array<ITransectDataPoint>>();

  useEffect(() => {
    const onlySelectedTransectData = [];
    for (const key in transectData){
      if (key[0] === selectedTransect){
        const newObj: ITransectDataPoint = {};
        newObj[key] = transectData[key];
        onlySelectedTransectData.push(newObj);
      }
      setSelectedTransectData(onlySelectedTransectData);
    }
  }, [selectedTransect, transectData]);

  return (
    <div className="bar-graph-container">
      <div>
        TRANSECT DATA {JSON.stringify(selectedTransectData)}
      </div>
    </div>
  )
};
