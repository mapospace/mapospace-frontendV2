"use client";

import React, { useRef } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(...registerables, FunnelController, TrapezoidElement, ChartDataLabels);

const FunnelChart = ({ funnelData }) => {
    const chartRef = useRef(null);

    const getGradient = (ctx, color1, color2) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };

    const  colorShades = [
        ["#ff6b6b", "#ff8e72"],     // Vivid Red → Coral
        ["#ff9f68", "#fbc687"],     // Orange → Soft Gold
        ["#fcd34d", "#fde68a"],     // Yellow → Pale Yellow
        ["#a78bfa", "#c4b5fd"],     // Violet → Light Purple
        ["#7dd3fc", "#bae6fd"],     // Sky Blue → Ice Blue
      ];

    const data = {
        labels: funnelData.map((value) => value.stage || "Undefined"),
        datasets: [
            {
                label: "Conversion Funnel",
                data: funnelData.map((value) => value.count || 0),
                backgroundColor: (ctx) => {
                    const { ctx: chartCtx } = ctx.chart;
                    return colorShades.map(([start, end]) => getGradient(chartCtx, start, end));
                },
                hoverBackgroundColor: colorShades.map(([start, end]) => end),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        layout: {
            padding: {
                left: 0,
                right: 100,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: "#0f172a",
                titleColor: "#fff",
                bodyColor: "#e2e8f0",
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                padding: 10,
                cornerRadius: 6,
            },
            datalabels: {
                color: "#ffffff",
                font: { weight: "600", size: 14 },
                align: "end",
                anchor: "end",
                backgroundColor: "#334155",
                borderRadius: 8,
                padding: 6,
                formatter: (value, context) => {
                    return `Stage: ${context.chart.data.labels[context.dataIndex]}\nCount: ${value}`;
                },
            },
        },
        scales: {
            y: {
                reverse: false,
                ticks: {
                    color: "#334155",
                    font: { weight: "500" },
                },
            },
        },
    };

    return (
        <div className="w-full mt-6 h-[60vh]">
            <Chart ref={chartRef} type="funnel" data={data} options={options} />
        </div>
    );
};

export default FunnelChart;
