import React, { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

interface ITransectDataPoint {
  [key: string]: number|null;
}

interface IBarGraphProps {
  data?: Array<ITransectDataPoint>
}

interface IChartData {
  labels: Array<string>;
  datasets: Array<IDataSet>;
}

interface IDataSet{
  label: string;
  data: Array<number>;
  backgroundColor: string;
}

export const BarGraph = (props: IBarGraphProps) => {
  const {data} = props;
  const [chartData, setChartData] = useState<IChartData>();

  useEffect(() => {
    if (data?.length) {
    setChartData({
        labels: data.map(transectPoint => Object.keys(transectPoint)[0]),
        datasets: [{
            label: "Height",
            data: data.map(transectPoint => transectPoint[Object.keys(transectPoint)[0]]!),
            backgroundColor: "#2ba5c1"
        }]
    })
  }
  }, [data])


  return (
    <div>
      {chartData &&
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Transect Data"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
      }
    </div>
  )
};
