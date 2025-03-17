"use client";

import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";
import { Chart } from "react-chartjs-2";

// Register the necessary Chart.js components
ChartJS.register(...registerables, FunnelController, TrapezoidElement);

const FunnelChart = () => {
    const data = {
        labels: ["Visitors", "Signups", "Purchases"], // Funnel Stages
        datasets: [
            {
                label: "Conversion Funnel",
                data: [1000, 500, 150], // Funnel Data (Visitors → Signups → Purchases)
                backgroundColor: ["#0136f8", "#345ef9", "#6786fb"], // Colors for each stage
                hoverBackgroundColor: ["#1a4af9", "#4d72fa", "#809bfc"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y", // Ensures the funnel flows from top to bottom
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                reverse: false, // Flips the funnel from top to bottom
            },
        },
    };

    return (
        <div className="w-full  mx-auto  mt-xl h-[60vh]">
            <h2 className="text-center font-bold text-xl mb-4 text-neutral-1200">Funnel Chart</h2>
            <Chart type="funnel" data={data} options={options} />
        </div>
    );
};

export default FunnelChart;
