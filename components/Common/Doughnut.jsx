'use client'
import React, { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Select from "react-select";

Chart.register(ArcElement, Tooltip, Legend);

const dataValues = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" }
];
const colors = [
    "#e74c3c", "#f39c12", "#f1c40f", "#1abc9c", "#3498db",
    "#9b59b6", "#2ecc71", "#34495e", "#16a085", "#27ae60",
    "#2980b9", "#8e44ad", "#2c3e50", "#c0392b", "#d35400",
    "#e67e22", "#e74c3c", "#f39c12", "#f1c40f", "#1abc9c",
    "#3498db", "#9b59b6", "#2ecc71", "#34495e", "#16a085",
    "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#c0392b",
    "#d35400", "#e67e22", "#ecf0f1", "#bdc3c7", "#95a5a6",
    "#7f8c8d", "#ff5733", "#c70039", "#900c3f", "#581845",
    "#6a0572", "#9400d3", "#4a235a", "#154360", "#0e6655",
    "#145a32", "#512e5f", "#76448a", "#2471a3", "#0b5345"
]

const DoughnutChart = ({ labels, values, labelName, period, productListDoughtnutPeriod, setSelectedPeriod }) => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [selectedOption, setSelectedOption] = useState(dataValues[0]);
    const secondCheck = productListDoughtnutPeriod.map((data) => { return { value: data, label: data } })
    const [selectedSecondOption, setSelectedSecondOption] = useState(secondCheck[0]);

    useEffect(() => {
        period(selectedOption.value)
        setSelectedSecondOption(0)
    }, [selectedOption])

    // useEffect(() => {

    // }, [selectedSecondOption])


    useEffect(() => {
        if (!values || values.length === 0) return;

        const datasets = Array.isArray(values[0])
            ? values.map(value => ({
                label: labelName,
                data: value,
                borderColor: '#fff',
                backgroundColor: colors,
                tension: 0.4,
                fill: true,
            }))
            : [{
                label: labelName,
                data: values,
                borderColor: '#fff',
                backgroundColor: colors,
                tension: 0.4,
                fill: true,
            }];

        setData({ labels, datasets });
    }, [labels, values]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="bg-white shadow-md flex-1 flex flex-col h-full border rounded-lg">
            <div className='flex justify-between px-xl py-s'>
                <h3 className="text-f-l font-semibold text-neutral-1200  ">
                    {labelName}
                </h3>
                <div className='flex gap-s'>
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
                    {productListDoughtnutPeriod.length > 0 && <Select
                        options={secondCheck}
                        value={selectedSecondOption}
                        onChange={(selected) => {
                            setSelectedSecondOption(selected)
                            setSelectedPeriod(selected.value)
                        }}
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
                    />}
                </div>
            </div>

            <div className="w-full flex-1 flex items-center justify-center p-xl ">
                <div className="w-full h-full">
                    {data?.datasets?.length > 0 && <Doughnut data={data} options={options} />}
                </div>
            </div>
        </div>
    );
};

export default DoughnutChart;
