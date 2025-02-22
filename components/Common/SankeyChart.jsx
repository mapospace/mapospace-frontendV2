"use client";

import React, { useMemo } from "react";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(SankeyController, Flow, Tooltip, Legend);

// Predefined color palette
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
];

const SankeyChart = ({ data }) => {
    // Assign colors sequentially to unique nodes
    const colorMap = useMemo(() => {
        const uniqueNodes = new Set();
        data.forEach(({ from, to }) => {
            uniqueNodes.add(from);
            uniqueNodes.add(to);
        });

        const nodesArray = Array.from(uniqueNodes);
        const assignedColors = {};

        nodesArray.forEach((node, index) => {
            assignedColors[node] = colors[index % colors.length]; // Cycle through colors
        });

        return assignedColors;
    }, [data]); // Runs only when `data` changes

    const chartData = {
        datasets: [
            {
                label: "Total Sales Distribution",
                data: [...data],
                colorFrom: (ctx) => colorMap[ctx.dataset.data[ctx.dataIndex].from] || "#000000",
                colorTo: (ctx) => colorMap[ctx.dataset.data[ctx.dataIndex].to] || "#000000",
                colorMode: "source", // Solid colors instead of gradient
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full h-full mx-auto">
            <Chart type="sankey" data={chartData} options={options} />
        </div>
    );
};

export default SankeyChart;
