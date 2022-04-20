import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph({ sourceName, xAxisLabels, datasets }) {
  const options = {
    responsive: true,
    spanGaps: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle:true,
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          //legend styling
        }
      },
      title: {
        display: true,
        text: sourceName,
      },
    },
  };

  const data = {
    labels: xAxisLabels,
    datasets: datasets,
  };





  return <Line options={options} data={data} />;
}
