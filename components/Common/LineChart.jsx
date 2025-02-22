'use client'
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import Select from "react-select";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const dataValues = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" }
];

const LineChart = ({ labels, values, labelName, period }) => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [selectedOption, setSelectedOption] = useState(dataValues[0]);

    useEffect(() => {
        period(selectedOption.value)
    }, [selectedOption])


    useEffect(() => {
        if (!values || values.length === 0) return;

        const datasets = Array.isArray(values[0])
            ? values.map(value => ({
                label: labelName,
                data: value,
                borderColor: '#8a8af2',
                backgroundColor: '#8a8af2',
                tension: 0.4,
                fill: true,
            }))
            : [{
                label: labelName,
                data: values,
                borderColor: '#8a8af2',
                backgroundColor: '#8a8af2',
                tension: 0.4,
                fill: true,
            }];

        setData({ labels, datasets });
    }, [labels, values]);

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ensure the chart stretches to fill its container
        scales: {
            x: { grid: { display: false }, ticks: { display: true } },
            y: { grid: { display: false }, ticks: { display: true } }
        },
        plugins: {
            legend: { display: false }, tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        // Prepend "Date: " before the date value
                        return `Date: ${tooltipItems[0].label}`;
                    },
                    label: function (tooltipItem) {
                        // Custom label text
                        return `Total Orders: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    return (
        <div className="bg-white shadow-md flex-1 flex flex-col h-full border rounded-lg">
            <div className='flex justify-between px-xl py-s'>
                <h3 className="text-f-l font-semibold text-neutral-1200  ">
                    {labelName}
                </h3>
                <div >
                    <Select
                        options={dataValues}
                        value={selectedOption}
                        onChange={(selected) => setSelectedOption(selected)}
                        isSearchable={false}
                        className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black text-f-s"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: 'unset',  // Remove default min-height
                                height: 'auto',
                                padding: "2px",
                                margin: 0,
                                border: '1px solid #4d4d4d',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                padding: '2px', // Ensure no extra padding
                                margin: 0,
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                padding: '2px',
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                padding: '0px', // Removes space around the dropdown arrow
                                margin: 0,
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                padding: 0,
                                margin: 0,
                            }),
                        }}
                    />


                </div>
            </div>

            <div className="w-full flex-1 flex items-center justify-center p-xl ">
                <div className="w-full h-full">
                    {data?.datasets?.length > 0 && <Line data={data} options={options} />}
                </div>
            </div>
        </div>
    );
};

export default LineChart;
