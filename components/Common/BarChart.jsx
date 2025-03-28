'use client'
import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';
import Select from "react-select";
import getColorForValue from '@/utils/get-color-for-value';

ChartJS.register(CategoryScale, BarElement, Tooltip, Legend);

const dataValues = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" }
];

const BarChart = ({ labels, values, height, labelName, period, showPeriod = true, description }) => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [selectedOption, setSelectedOption] = useState(dataValues[0]);

    useEffect(() => {
        showPeriod && period(selectedOption.value)
    }, [selectedOption])


    useEffect(() => {
        if (!values || values.length === 0) return;

        // Ensure `values` is a nested array (for multiple datasets) or wrap it if it's a single dataset.
        const formattedValues = Array.isArray(values[0]) ? values : [values];
        // const maxValue = Math.max(...formattedValues[0]);
        // const coolorData = formattedValues[0].map(value => getColorForValue(value, maxValue));
        // console.log("coolorData", coolorData, maxValue, formattedValues[0])
        const datasets = formattedValues.map((value, index) => (
            {
                label: index === 0 ? labelName : `Dataset ${index + 1}`,
                data: value,
                backgroundColor: index % 2 == 0 ? 'rgba(104, 62, 240, 1)' : 'rgba(104, 62, 240, 1)',
            }
        ));

        setData({ labels, datasets });
    }, [labels, values]);

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } }
        },
        plugins: {
            legend: {
                position: "bottom"
            },
            tooltip: {
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
            },
            datalabels: {
                display: false,
            },
        }
    };

    return (
        <div className="bg-white  flex-1 flex flex-col h-full border rounded-bs">
            <div className='flex justify-between px-xl pb-s pt-l text-f-l text-neutral-1200 gap-xl'>
                <div className='flex flex-col'>
                    <h3 className="text-f-l font-semibold text-neutral-1200  ">
                        {labelName}
                    </h3>
                    <p className='text-f-m text-neutral-600'>{description}</p>
                </div>
                {showPeriod && <div className='w-[130px]' >
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


                </div>}
            </div>
            <div className="w-full flex-1 flex items-center justify-center p-xl ">
                <div className="w-full h-full">
                    {data?.datasets?.length > 0 && <Bar data={data} options={barOptions} />}
                </div>
            </div>
        </div>
    );
};

export default BarChart;
