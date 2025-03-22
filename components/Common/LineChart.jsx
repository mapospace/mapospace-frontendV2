'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const dataValues = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

const gradientPlugin = {
  id: 'lineGradient',
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    chart.data.datasets.forEach((dataset) => {
      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, '#6b48ff');  // primary-500
      gradient.addColorStop(1, '#cbbfff');  // primary-200
      dataset.backgroundColor = gradient;
    });
  },
};

const LineChart = ({ labels, values, labelName, period }) => {
  const [selectedOption, setSelectedOption] = useState(dataValues[0]);
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    period(selectedOption.value);
  }, [selectedOption]);

  useEffect(() => {
    if (!values || values.length === 0) return;
    const formattedValues = Array.isArray(values[0]) ? values : [values];

    const datasets = formattedValues.map((val) => ({
      label: labelName,
      data: val,
      borderColor: '#6b48ff',
      tension: 0.4,
      fill: true,
      pointRadius: 3,
      pointBackgroundColor: '#fff',
    }));

    setData({ labels, datasets });
  }, [labels, values]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#5d5a8f' } },
      y: { grid: { display: false }, ticks: { color: '#5d5a8f' } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => `Date: ${items[0].label}`,
          label: (item) => `Total Orders: ${item.raw}`,
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-blg flex flex-col h-full border border-neutral-300">
      <div className="flex justify-between items-center px-xl pb-s pt-l">
        <h3 className="text-f-l font-semibold text-neutral-1100">{labelName}</h3>
        <Select
          options={dataValues}
          value={selectedOption}
          onChange={setSelectedOption}
          isSearchable={false}
          className="text-f-s"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#f7f5ff',
              border: '1px solid #cbbfff',
              minHeight: 'unset',
              height: 'auto',
              padding: '2px 6px',
              fontSize: '12px',
            }),
          }}
        />
      </div>
      <div className="w-full flex-1 px-xl pb-xl">
        {data?.datasets?.length > 0 && (
          <Line data={data} options={options} plugins={[gradientPlugin]} />
        )}
      </div>
    </div>
  );
};

export default LineChart;
