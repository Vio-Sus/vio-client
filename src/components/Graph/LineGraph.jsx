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
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.selected ? '#004384' : '#000000')};
  font-weight: ${(props) => (props.selected ? '500' : '300')};
  &:hover {
    color: #489ced;
`;

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




  return datasets ? (
    <Line options={options} data={data} />
  ) : (
    <>
      There are no entries made for this source. <StyledLink to="/newEntry">Add some entries.</StyledLink>
    </>
  );
}
