"use client";

import React, { useMemo } from "react";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(SankeyController, Flow, Tooltip, Legend);

// Predefined color palette
const colors = [
    "#FF6B6B", // Coral Red
    "#FFB347", // Soft Orange
    "#FFD93D", // Golden Yellow
    "#6BCB77", // Fresh Green
    "#4D96FF", // Soft Blue
    "#9D4EDD", // Violet Purple
    "#F38BA0", // Rose Pink
    "#00C2CB", // Aqua Cyan
    "#845EC2", // Indigo
    "#2C73D2", // Royal Blue
    "#008E9B", // Deep Teal
    "#59C9A5", // Mint Green
    "#5C5470", // Slate Gray
    "#FFA351", // Melon Orange
    "#AFD275", // Avocado Green
    "#FFC75F", // Sunny Yellow
    "#FF8066", // Peach Red
    "#B39CD0", // Lilac
    "#6A0572", // Deep Purple
    "#247BA0", // Ocean Blue
    "#70C1B3", // Soft Mint
    "#FF165D", // Raspberry
    "#F6AE2D", // Honey
    "#86BBD8", // Sky Blue
    "#33658A", // Midnight Blue
    "#2F4858", // Graphite
    "#5EAAA8", // Misty Aqua
    "#A28089", // Dusty Rose
    "#F7A9A8", // Baby Pink
    "#D7263D", // Strong Red
    "#3F88C5", // Electric Blue
    "#FFBA08", // Saffron
    "#6A994E", // Forest Green
    "#386641", // Olive Green
    "#D9BF77", // Sand
    "#BC6C25", // Earthy Brown
    "#6F1D1B", // Maroon Brown
    "#BB3E03", // Rust Orange
    "#9B2226", // Blood Red
    "#AE2012", // Brick Red
    "#B5838D", // Mauve
    "#FF99C8", // Pastel Pink
    "#FCF6BD", // Light Cream
    "#D0F4DE", // Pale Mint
    "#A9DEF9", // Light Blue
    "#E4C1F9", // Lavender
    "#9BF6FF", // Baby Blue
    "#B5E48C", // Spring Green
    "#FDE4CF"  // Pale Peach
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
        plugins: {

            datalabels: {
                display: false,
            },
        }
    };

    return (
        <div className="w-full h-full mx-auto">
            <Chart type="sankey" data={chartData} options={options} />
        </div>
    );
};

export default SankeyChart;
