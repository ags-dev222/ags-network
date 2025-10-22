import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ data, options, title, height = 300 }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    ...options,
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Pie data={data} options={defaultOptions} />
    </div>
  );
};
