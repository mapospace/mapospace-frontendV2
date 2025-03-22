'use client';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const dataValues = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

const gradientBarPlugin = {
  id: 'barGradient',
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    chart.data.datasets.forEach((dataset, index) => {
      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, '#977fff'); // primary-400
      gradient.addColorStop(1, '#f7f5ff'); // primary-50
      dataset.backgroundColor = gradient;
    });
  },
};

const BarChart = ({ labels, values, height, labelName, period, showPeriod = true }) => {
  const [selectedOption, setSelectedOption] = useState(dataValues[0]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    showPeriod && period(selectedOption.value);
  }, [selectedOption]);

  useEffect(() => {
    if (!labels || !values || values.length === 0) return;

    const formattedValues = Array.isArray(values[0]) ? values : [values];

    const datasets = formattedValues.map((val, idx) => ({
      label: idx === 0 ? labelName : `Dataset ${idx + 1}`,
      data: val,
      borderRadius: 6,
      barThickness: 20,
      backgroundColor: '#977fff', // fallback
    }));

    setChartData({ labels, datasets });
  }, [labels, values]);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#5d5a8f' } },
      y: { grid: { display: false }, ticks: { color: '#5d5a8f' } },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#403d73' },
      },
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
        {showPeriod && (
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
        )}
      </div>
      <div className="w-full flex-1 px-xl pb-xl">
        {chartData?.datasets?.length > 0 && (
          <Bar data={chartData} options={barOptions} plugins={[gradientBarPlugin]} />
        )}
      </div>
    </div>
  );
};

export default BarChart;
