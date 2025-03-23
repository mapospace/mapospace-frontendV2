'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HeatmapChart = ({ data }) => {
    const options = {
        chart: {
            type: 'heatmap',
            height: '100%',
            width: '100%',
            toolbar: {
                show: false,
            },
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
            '#33A1FD', '#7A918D', '#BAFF29',
        ],
        xaxis: {
            type: 'category',
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 300,
                    },
                    xaxis: {
                        labels: {
                            rotate: -45,
                        },
                    },
                },
            },
        ],
    };

    return (
        <div className="w-full h-full">
            <ReactApexChart
                options={options}
                series={data}
                type="heatmap"
                height="100%"
                width="100%"
            />
        </div>
    );
};

export default HeatmapChart;
