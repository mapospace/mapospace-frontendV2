"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { RiAddBoxFill } from "react-icons/ri";
import { FaL } from "react-icons/fa6";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const HistogramChart = ({ data, bins, setBins }) => {
    const [endValue, setEndValue] = useState("");
    const [startValue, setStartValue] = useState("0");
    const [ranges, setRanges] = useState([]);
    const [showRangeMeter, setShowRangeMeter] = useState(false);

    //      const data = [10, 20, 50, 150, 250, 500, 2000, 5000, 12000, 18000, 19000]; // Sample data
    //   const bins = [0, 50, 100, 200, 500, 1000, 10000, 20000];
    // Function to count occurrences in each bin ranges
    const binCounts = bins.slice(1).map((upperBound, i) => {
        const lowerBound = bins[i];
        return data.filter((value) => value >= lowerBound && value < upperBound).length;
    });


    const handleChange = (e) => {
        const num = e.target.value;
        if (num === "" || (Number(num) > 0 && !num.includes("e"))) {
            setEndValue(num);
        }
    };

    const applyHandler = () => {
        let breaks = ranges.map((range) => { return Number(range.end) });
        breaks = [0, ...breaks];
        console.log(breaks)
        setBins(breaks)
        setShowRangeMeter(false)
    }

    // Chart Data
    const chartData = {
        labels: bins.slice(1).map((upperBound, i) => `${bins[i]} - ${upperBound}`),
        datasets: [
            {
                label: "Frequency",
                data: binCounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Histogram" },
        },
        scales: {
            x: { title: { display: true, text: "Ranges" } },
            y: { title: { display: true, text: "Count" }, beginAtZero: true },
        },
    };

    const rangeHandler = () => {
        if (Number(endValue) < Number(startValue)) return;
        const newRange = {
            start: startValue,
            end: endValue
        }
        console.log("rangeHandler", ranges, newRange)
        const newRanges = [...ranges, newRange]
        setRanges(newRanges)
        setStartValue(endValue)
        setEndValue(0)
    }

    return <>
        <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 flex justify-between items-center'>
            <h3 className="text-f-l font-semibold text-neutral-1200  ">Top Products By Quantity</h3>
            <div className='text-f-m font-normal relative'>
                <button className='py-xs px-s border rounded-md border-neutral-1200' onClick={() => { setShowRangeMeter(prev => !prev) }}>Add Range + </button>
                {showRangeMeter && <div className='w-[300px]  absolute top-10 right-0 bg-white bg-opacity-70 border  rounded-md p-s flex flex-col'>
                    <div className="flex w-full gap-s items-center">
                        <div className="flex-1 bg-white border border-neutral-500 rounded-md py-xs px-s">
                            {startValue}
                        </div>
                        <div className="flex-1 bg-yellow-50">
                            <input
                                type="number"
                                value={endValue}
                                onChange={handleChange}
                                min={Number(startValue) + 1}
                                className="border border-effect py-xs w-full rounded-md flex-1 px-s  text-center"
                                placeholder="Enter a number > 0"
                            />
                        </div>
                        <RiAddBoxFill className="w-8 text-secondary-900 h-8" onClick={rangeHandler} />

                    </div>
                    {ranges.length > 0 && <div className="py-s px-m">
                        <div className="flex text-f-m justify-between">
                            <div>Ranges</div>
                            <div className="text-secondary-900">Reset</div>
                        </div>
                        <div className="flex flex-col text-f-m  mx-l   mt-xs border border-neutral-600">
                            <div className="flex flex-1 justify-between bg-neutral-100  py-xs border-b border-neutral-600">
                                <div className="flex-1  text-center">Start</div>
                                <div className="flex-1  text-center">End</div>
                            </div>

                            <div className="max-h-[100px] overflow-y-scroll hide-scrollbar bg-white">
                                {ranges.map((range, index) => (
                                    <div className="flex flex-1 justify-between py-xs border-b border-neutral-600" key={index}>
                                        <div className="flex-1  text-center border-r border-neutral-600">{range.start}</div>
                                        <div className="flex-1  text-center">{range.end}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-s flex justify-end gap-s">
                            <button className="bg-secondary-900 text-f-s py-xs px-s text-white rounded-md" onClick={() => { setShowRangeMeter(false) }}>
                                Close
                            </button>
                            <button className="bg-secondary-900 text-f-s py-xs px-s text-white rounded-md" onClick={applyHandler}>
                                Apply
                            </button>
                        </div>


                    </div>}

                </div>}
            </div>

        </div >
        <div className='p-xl pt-s h-full '>
            <Bar data={chartData} options={options} />
        </div>

    </>;
};

export default HistogramChart;
