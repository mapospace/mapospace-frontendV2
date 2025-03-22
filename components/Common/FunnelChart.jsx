"use client";

import React, { useRef, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(...registerables, FunnelController, TrapezoidElement, ChartDataLabels);

const FunnelChart = ({ funnelData }) => {
    const chartRef = useRef(null);

    // Function to create gradient effect
    const getGradient = (ctx, color1, color2) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };

    // Reverse gradient colors to go from DARK to LIGHT based on data values
    const colorShades = [

        ["#0136f8", "#1a4af9"],
        ["#345ef9", "#4d72fa"],
        ["#6786fb", "#809bfc"],
        ["#99affc", "#b3c3fd"],
        ["#ccd7fe", "#e6ebfe"],  // Lightest shade (Smallest Value)
    ]; // Reversing the array to go from DARK to LIGHT

    // Data for the funnel chart
    const data = {
        labels: funnelData.map((value) => { return value.stage ? value.stage : "Undefined" }), // Funnel Stages
        datasets: [
            {
                label: "Conversion Funnel",
                data: funnelData.map((value) => { return value.count ? value.count : 0 }), // Funnel values
                backgroundColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: chartCtx } = chart;
                    return colorShades.map(([start, end]) => getGradient(chartCtx, start, end));
                },
                hoverBackgroundColor: colorShades.map(([start, end]) => end), // Darker shade on hover
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        layout: {
            padding: {
                left: 0,
                right: 150,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            datalabels: {
                color: "#FFF",
                font: { weight: "bold", size: 16 },
                align: "end",
                anchor: "end",
                backgroundColor: "rgba(0,0,0,0.6)",
                borderRadius: 6,
                padding: 8,
                formatter: (value, context) => {
                    return `Stage : ${context.chart.data.labels[context.dataIndex]}\nCount : ${value}`;
                },
            },
        },
        scales: {
            y: {
                reverse: false,
            },
        },
    };

    return (
        <div className="w-full mt-6 h-[60vh] ">
            <Chart ref={chartRef} type="funnel" data={data} options={options} />
        </div>
    );
};

export default FunnelChart;
