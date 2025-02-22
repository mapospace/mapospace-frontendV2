'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HeatmapChart = ({ data }) => {
    const [chartState, setChartState] = useState({
        series: data,
        options: {
            chart: {
                height: 300,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                heatmap: {
                    colorScale: {
                        inverse: true,
                    },
                },
            },
            colors: [
                '#F3B415', '#F27036', '#663F59', '#6A6E94', '#4E88B4', '#00A7C6',
                '#18D8D8', '#A9D794', '#46AF78', '#A93F55', '#8C5E58', '#2176FF',
                '#33A1FD', '#7A918D', '#BAFF29'
            ],
            xaxis: {
                type: 'category',
                categories: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12', 'W13', 'W14', 'W15'],
            },
            // title: {
            //     text: 'Color Scales flipped Vertically',
            // },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartState.options} series={chartState.series} type="heatmap" height={300} />
            </div>
        </div>
    );
};

export default HeatmapChart;
