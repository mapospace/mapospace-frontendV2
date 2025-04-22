"use client"

import React, { useState, useEffect } from "react"
import { Line as ChartJSLine, Bar as ChartJSBar, Doughnut as ChartJSDoughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
    ArcElement,
    Tooltip as ChartTooltip,
    Legend as ChartLegend
} from 'chart.js'
import { FaChartBar, FaChartLine, FaChartPie, FaInfoCircle } from "react-icons/fa"
import getColorForValue from "@/utils/get-color-for-value"

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, ArcElement, ChartTooltip, ChartLegend)

const colors = [
    "#d1c5fa", "#E9A5F1", "#FED2E2", "#a48bf6", "#9577f4",
    "#8664f3", "#7751f1", "#c2b1f9", "#8F87F1", "#b39ef7",
    "#C7D9DD", "#ADB2D4", "#FFFECE", "#80CBC4", "#D99D81",
    "#A6F1E0", "#B4EBE6", "#73C7C7", "#C7DB9C", "#EFDCAB"
]

function AIChartRenderer({ results }) {
    const [mounted, setMounted] = useState(false)
    const [selectedChart, setSelectedChart] = useState('bar')
    const [animationComplete, setAnimationComplete] = useState(false)

    useEffect(() => {
        setMounted(true)
        const timer = setTimeout(() => setAnimationComplete(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    if (!mounted) return null

    // Safety check for empty data
    if (!results || !Array.isArray(results) || results.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-base">
                <p className="text-gray-500">No data available to display</p>
            </div>
        )
    }

    const chart = results[0] // We'll work with the first chart for now
    const formattedData = chart.data && chart.data.map(item => ({
        name: item.label || 'Unknown',
        value: typeof item.value === 'number' ? item.value : parseFloat(item.value) || 0,
        percentage: item.percentage,
        message: item.message
    }))

    // Calculate summary data
    if (!formattedData) {
        return;
    }

    const totalValue = formattedData.reduce((sum, item) => sum + item.value, 0)
    const averageValue = totalValue / formattedData.length
    const highest = formattedData.reduce((max, item) => Math.max(max, item.value), 0)
    const lowest = formattedData.reduce((min, item) => Math.min(min, item.value), Infinity)
    const highestItem = formattedData.find(item => item.value === highest)
    const lowestItem = formattedData.find(item => item.value === lowest)

    const renderChart = () => {
        if (selectedChart === 'pie') {
            return renderPieChart(formattedData)
        }

        if (selectedChart === 'bar') {
            const values = formattedData.map(item => item.value)
            const maxValue = Math.max(...values);
            const chartData = {
                labels: formattedData.map(item => item.name),
                datasets: [{
                    label: 'Value',
                    data: formattedData.map(item => item.value),
                    backgroundColor: formattedData.map(item => getColorForValue(item.value, maxValue, colors))
                }]
            }

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { display: false } }
                },
                plugins: {
                    legend: {
                        position: "bottom"
                    },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                return `${tooltipItems[0].label}`
                            },
                            label: function (tooltipItem) {
                                return `Amount: ${tooltipItem.raw.toLocaleString()}`
                            }
                        }
                    },
                    datalabels: {
                        display: false,
                    },
                }
            }

            return (
                <div style={{ height: '320px' }}>
                    <ChartJSBar data={chartData} options={options} />
                </div>
            )
        }

        if (selectedChart === 'line') {
            const values = formattedData.map(item => item.value)
            const maxValue = Math.max(...values);
            const chartData = {
                labels: formattedData.map(item => item.name),
                datasets: [{
                    label: 'Value',
                    data: formattedData.map(item => item.value),
                    borderColor: '#683ef0',
                    backgroundColor: formattedData.map(item => getColorForValue(item.value, maxValue, colors)),
                    tension: 0.4,
                    fill: false,
                }]
            }

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false }, ticks: { display: true } },
                    y: { grid: { display: false }, ticks: { display: true } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                return `${tooltipItems[0].label}`
                            },
                            label: function (tooltipItem) {
                                return `Amount: ${tooltipItem.raw.toLocaleString()}`
                            }
                        }
                    },
                    datalabels: {
                        display: false,
                    },
                }
            }

            return (
                <div style={{ height: '320px' }}>
                    <ChartJSLine data={chartData} options={options} />
                </div>
            )
        }
    }

    const renderPieChart = (data) => {
        const chartData = {
            labels: data.map(item => item.name),
            datasets: [{
                data: data.map(item => item.value),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                },
                datalabels: {
                    display: false,
                },
            },
        }

        return (
            <div className="w-full h-[400px] flex flex-col">
                <ChartJSDoughnut data={chartData} options={options} />
            </div>
        )
    }

    return (
        <div className={`bg-white rounded-xl shadow-sm border  space-y-6 transition-all duration-300 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
            {/* Chart Type Selector */}
            <div className="flex border-b border-gray-200  pt-s">
                <button
                    onClick={() => setSelectedChart('bar')}
                    className={`flex items-center gap-2 px-6 py-3 text-f-l font-medium border-b-2 transition-all duration-200 relative -mb-[2px] ${selectedChart === 'bar'
                        ? 'text-secondary-900 border-secondary-900'
                        : 'text-gray-500 border-transparent hover:text-secondary-900 hover:border-secondary-300'
                        }`}
                >
                    <FaChartBar className={`${selectedChart === 'bar' ? 'text-secondary-900' : 'text-gray-400'} transition-colors duration-200`} />
                    Bar
                </button>
                <button
                    onClick={() => setSelectedChart('line')}
                    className={`flex items-center gap-2 px-6 py-3 text-f-l  font-medium border-b-2 transition-all duration-200 relative -mb-[2px] ${selectedChart === 'line'
                        ? 'text-secondary-900 border-secondary-900'
                        : 'text-gray-500 border-transparent hover:text-secondary-900 hover:border-secondary-300'
                        }`}
                >
                    <FaChartLine className={`${selectedChart === 'line' ? 'text-secondary-900' : 'text-gray-400'} transition-colors duration-200`} />
                    Line
                </button>
                <button
                    onClick={() => setSelectedChart('pie')}
                    className={`flex items-center gap-2 px-6 py-3 text-f-l  font-medium border-b-2 transition-all duration-200 relative -mb-[2px] ${selectedChart === 'pie'
                        ? 'text-secondary-900 border-secondary-900'
                        : 'text-gray-500 border-transparent hover:text-secondary-900 hover:border-secondary-300'
                        }`}
                >
                    <FaChartPie className={`${selectedChart === 'pie' ? 'text-secondary-900' : 'text-gray-400'} transition-colors duration-200`} />
                    Pie
                </button>
            </div>

            {/* Chart */}
            <div className=" p-xl">
                {renderChart()}
            </div>

            {/* Data Summary */}
            <div className="mt-8 space-y-6 text-neutral-1200 p-xl">
                <div className="flex items-center gap-2 text-gray-700 border-b pb-3">
                    <FaInfoCircle className="text-blue-500" />
                    <h3 className="text-lg font-semibold">Data Summary</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">Total Value</div>
                        <div className="text-2xl font-semibold text-gray-900">{totalValue.toLocaleString()}</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">Average Value</div>
                        <div className="text-2xl font-semibold text-gray-900">{averageValue.toLocaleString()}</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">Data Points</div>
                        <div className="text-2xl font-semibold text-gray-900">{formattedData.length}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">Highest</div>
                        <div className="text-xl font-semibold text-gray-900">
                            {highestItem?.name}: {highest.toLocaleString()}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">Lowest</div>
                        <div className="text-xl font-semibold text-gray-900">
                            {lowestItem?.name}: {lowest.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* User Totals */}
                <div className="space-y-4 pt-2">
                    <div className="text-sm font-medium text-gray-700 border-b pb-3">User Totals</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {formattedData.map((item, index) => (
                            <div key={index} className="space-y-1">
                                <div className="text-sm text-gray-500">{item.name}</div>
                                <div className="text-lg font-semibold text-gray-900">{item.value.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Insights */}
                <div className="space-y-4 pt-2">
                    <div className="text-sm font-medium text-gray-700 border-b pb-3">Data Insights</div>
                    <ul className="space-y-3 text-sm text-gray-600">
                        {formattedData.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{item.message}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AIChartRenderer
