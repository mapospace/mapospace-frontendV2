"use client";

import React from "react";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(SankeyController, Flow, Tooltip, Legend);

const SankeyChart = () => {
    const chartData = {
        datasets: [
            {
                label: "Total Sales Distribution",
                data: [
                    { from: "Total Sales", to: "Apparels", flow: 3945468.85 },
                    { from: "Apparels", to: "Round Neck T-Shirt", flow: 657907.24 },
                    { from: "Apparels", to: "Shorts", flow: 505157.14 },
                    { from: "Apparels", to: "Jacket", flow: 579053.37 },
                    { from: "Apparels", to: "V-Neck T-Shirt", flow: 752655.39 },
                    { from: "Apparels", to: "Polo T-Shirt", flow: 739721.22 },
                    { from: "Apparels", to: "Jeans", flow: 710974.49 },

                    { from: "Total Sales", to: "Electronics", flow: 3417536.26 },
                    { from: "Electronics", to: "Dell XPS 13", flow: 418896.66 },
                    { from: "Electronics", to: "Samsung Galaxy S22", flow: 598493.33 },
                    { from: "Electronics", to: "Xiaomi Redmi Note 12", flow: 380048.34 },
                    { from: "Electronics", to: "iPhone 14", flow: 664539.44 },
                    { from: "Electronics", to: "Lenovo ThinkPad X1", flow: 648848.76 },
                    { from: "Electronics", to: "MacBook Air", flow: 706709.73 },

                    { from: "Total Sales", to: "Home Appliances", flow: 3656921.05 },
                    { from: "Home Appliances", to: "Samsung Top Load", flow: 508128.99 },
                    { from: "Home Appliances", to: "LG Front Load", flow: 584876.17 },
                    { from: "Home Appliances", to: "Whirlpool Semi-Automatic", flow: 507891.35 },
                    { from: "Home Appliances", to: "Whirlpool Triple Door", flow: 544679.96 },
                    { from: "Home Appliances", to: "Samsung Double Door", flow: 770611.46 },
                    { from: "Home Appliances", to: "LG Single Door", flow: 740733.12 },
                ],
                colorFrom: (ctx) => "blue",
                colorTo: (ctx) => "green",
                colorMode: "gradient",
            },
        ],
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <Chart type="sankey" data={chartData} />
        </div>
    );
};

export default SankeyChart;
