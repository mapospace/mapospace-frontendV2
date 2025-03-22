'use client';

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

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HistogramChart = ({ data, bins, setBins, label }) => {
    const [endValue, setEndValue] = useState("");
    const [startValue, setStartValue] = useState("0");
    const [ranges, setRanges] = useState([]);
    const [showRangeMeter, setShowRangeMeter] = useState(false);

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

    const rangeHandler = () => {
        if (Number(endValue) < Number(startValue)) return;
        const newRange = { start: startValue, end: endValue };
        setRanges([...ranges, newRange]);
        setStartValue(endValue);
        setEndValue(0);
    };

    const applyHandler = () => {
        const breaks = [0, ...ranges.map((range) => Number(range.end))];
        setBins(breaks);
        setShowRangeMeter(false);
    };

    const chartData = {
        labels: bins.slice(1).map((upperBound, i) => `${bins[i]} - ${upperBound}`),
        datasets: [
            {
                label: "Frequency",
                data: binCounts,
                backgroundColor: "#6b48ff", // primary.500
                borderRadius: 6,
                barThickness: 30,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Histogram", color: "#403d73", font: { size: 18 } },
        },
        scales: {
            x: {
                title: { display: true, text: "Ranges", color: "#5d5a8f" },
                ticks: { color: "#5d5a8f" },
                grid: { display: false },
            },
            y: {
                title: { display: true, text: "Count", color: "#5d5a8f" },
                ticks: { color: "#5d5a8f" },
                beginAtZero: true,
                grid: { display: false },
            },
        },
    };

    return (
        <>
            <div className="px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 flex justify-between items-center">
                <h3 className="text-f-l font-semibold text-neutral-1100">{label}</h3>
                <div className="text-f-m font-normal relative">
                    <button
                        className="py-xs px-s border border-neutral-400 rounded-bs text-neutral-800 hover:bg-neutral-100"
                        onClick={() => setShowRangeMeter(prev => !prev)}
                    >
                        Add Range +
                    </button>

                    {showRangeMeter && (
                        <div className="w-[300px] absolute top-10 right-0 bg-white border border-neutral-300 rounded-bs p-s shadow-lg z-50">
                            <div className="flex w-full gap-s items-center">
                                <div className="flex-1 border border-neutral-400 rounded-md py-xs px-s bg-neutral-100">
                                    {startValue}
                                </div>
                                <input
                                    type="number"
                                    value={endValue}
                                    onChange={handleChange}
                                    min={Number(startValue) + 1}
                                    className="border border-neutral-500 py-xs w-full rounded-md flex-1 px-s text-center text-f-s"
                                    placeholder="End > Start"
                                />
                                <RiAddBoxFill
                                    className="w-6 h-6 text-primary-500 cursor-pointer"
                                    onClick={rangeHandler}
                                />
                            </div>

                            {ranges.length > 0 && (
                                <div className="py-s px-m">
                                    <div className="flex justify-between text-f-s font-medium text-neutral-800">
                                        <span>Ranges</span>
                                        <button
                                            onClick={() => setRanges([])}
                                            className="text-secondary-500 hover:underline"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <div className="border border-neutral-300 mt-xs rounded-bs overflow-hidden">
                                        <div className="flex bg-neutral-100 text-center text-f-s font-medium border-b border-neutral-300">
                                            <div className="w-1/2 py-xs border-r border-neutral-300">Start</div>
                                            <div className="w-1/2 py-xs">End</div>
                                        </div>
                                        <div className="max-h-[100px] overflow-y-auto text-center text-f-s">
                                            {ranges.map((range, idx) => (
                                                <div key={idx} className="flex border-t border-neutral-200">
                                                    <div className="w-1/2 py-xs border-r border-neutral-200">{range.start}</div>
                                                    <div className="w-1/2 py-xs">{range.end}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-s flex justify-end gap-s">
                                        <button
                                            className="bg-neutral-300 text-neutral-900 text-f-s py-xs px-s rounded-bs"
                                            onClick={() => setShowRangeMeter(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-primary-500 text-white text-f-s py-xs px-s rounded-bs"
                                            onClick={applyHandler}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-xl pt-s h-full">
                <Bar data={chartData} options={options} />
            </div>
        </>
    );
};

export default HistogramChart;
