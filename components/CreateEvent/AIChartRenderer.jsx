"use client"

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';

// Consistent color palette
const COLORS = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#ffc658",
    "#ff8042",
    "#ff6361",
    "#bc5090",
    "#58508d",
    "#003f5c",
];

const tooltipStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "none",
};

const AIChartRenderer = ({ results, isLoading }) => {
    const [mounted, setMounted] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setAnimationComplete(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!results?.length) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                No data available to display
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {results.map((chart, index) => {
                // Format data for recharts
                const formattedData = chart.data.map(item => ({
                    name: item.label || 'Unknown',
                    value: typeof item.value === 'number' ? item.value : parseFloat(item.value) || 0,
                    percentage: item.percentage,
                    message: item.message,
                    date: item.timestamp ? new Date(item.timestamp) : null
                }));

                const isTimeSeries = formattedData.some(item => item.date);

                if (chart.type === 'bar') {
                    return (
                        <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                            <h2 className="text-xl font-bold p-4 border-b">
                                Bar Chart
                            </h2>
                            <div className="h-[500px] p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart 
                                        data={formattedData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fill: "#888", fontSize: 11 }}
                                            tickLine={{ stroke: "#888" }}
                                            angle={-45}
                                            textAnchor="end"
                                            height={100}
                                            interval={0}
                                        />
                                        <YAxis 
                                            tick={{ fill: "#888", fontSize: 12 }}
                                            tickLine={{ stroke: "#888" }}
                                        />
                                        <Tooltip
                                            contentStyle={tooltipStyle}
                                            formatter={(value, name, props) => {
                                                const item = formattedData[props?.payload?.index];
                                                return [
                                                    <React.Fragment key={`${name}-${value}`}>
                                                        <div>
                                                            <strong>Value:</strong> {value.toLocaleString()}
                                                        </div>
                                                        {item?.percentage != null && (
                                                            <div>
                                                                <strong>Percentage:</strong> {item.percentage.toFixed(2)}%
                                                            </div>
                                                        )}
                                                        {item?.message && (
                                                            <div className="text-xs mt-1 text-gray-600">{item.message}</div>
                                                        )}
                                                    </React.Fragment>,
                                                    "Amount"
                                                ];
                                            }}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="value"
                                            radius={[4, 4, 0, 0]}
                                            animationDuration={1000}
                                            animationBegin={0}
                                            animationEasing="ease-out"
                                            isAnimationActive={!animationComplete}
                                        >
                                            {formattedData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={`hsl(${240 + index * 20}, 70%, 60%)`}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    );
                }

                if (chart.type === 'line') {
                    return (
                        <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                            <h2 className="text-xl font-bold p-4 border-b">
                                Line Chart
                            </h2>
                            <div className="h-[500px] p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={formattedData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                        <XAxis
                                            dataKey={isTimeSeries ? "date" : "name"}
                                            type={isTimeSeries ? "date" : "category"}
                                            scale={isTimeSeries ? "time" : "auto"}
                                            tick={{ fill: "#888", fontSize: 12 }}
                                            tickLine={{ stroke: "#888" }}
                                            tickFormatter={(value) => {
                                                if (value instanceof Date) {
                                                    return value.toLocaleDateString("en-US", { 
                                                        month: "short", 
                                                        day: "numeric" 
                                                    });
                                                }
                                                return value;
                                            }}
                                            interval="preserveStartEnd"
                                            minTickGap={10}
                                        />
                                        <YAxis
                                            tick={{ fill: "#888", fontSize: 12 }}
                                            tickLine={{ stroke: "#888" }}
                                        />
                                        <Tooltip
                                            contentStyle={tooltipStyle}
                                            labelFormatter={(label) => {
                                                if (label instanceof Date) {
                                                    return label.toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric"
                                                    });
                                                }
                                                return label;
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#8884d8"
                                            strokeWidth={3}
                                            dot={{ r: 4, strokeWidth: 2 }}
                                            activeDot={{ r: 6, strokeWidth: 0, fill: "#8884d8" }}
                                            animationDuration={1500}
                                            animationBegin={0}
                                            animationEasing="ease-out"
                                            isAnimationActive={!animationComplete}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    );
                }

                if (chart.type === 'pie') {
                    return (
                        <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                            <h2 className="text-xl font-bold p-4 border-b">
                                Pie Chart
                            </h2>
                            <div className="h-[500px] p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={formattedData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={120}
                                            innerRadius={60}
                                            fill="#8884d8"
                                            dataKey="value"
                                            animationDuration={1000}
                                            animationBegin={0}
                                            animationEasing="ease-out"
                                            label={({ name, percent }) => {
                                                const item = formattedData.find(item => item.name === name);
                                                const percentage = item?.percentage != null 
                                                    ? item.percentage 
                                                    : percent * 100;
                                                return `${name}: ${percentage.toFixed(1)}%`;
                                            }}
                                        >
                                            {formattedData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={COLORS[index % COLORS.length]} 
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={tooltipStyle}
                                            formatter={(value, name, props) => {
                                                const item = formattedData[props?.payload?.index];
                                                return [
                                                    <React.Fragment key={`${name}-${value}`}>
                                                        <div>
                                                            <strong>Value:</strong> {value.toLocaleString()}
                                                        </div>
                                                        {item?.percentage != null && (
                                                            <div>
                                                                <strong>Percentage:</strong> {item.percentage.toFixed(2)}%
                                                            </div>
                                                        )}
                                                        {item?.message && (
                                                            <div className="text-xs mt-1 text-gray-600">{item.message}</div>
                                                        )}
                                                    </React.Fragment>,
                                                    "Amount"
                                                ];
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
};

AIChartRenderer.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['bar', 'pie', 'line']).isRequired,
        message: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            percentage: PropTypes.number,
            message: PropTypes.string,
            timestamp: PropTypes.string,
        })).isRequired,
    })),
    isLoading: PropTypes.bool,
};

AIChartRenderer.defaultProps = {
    results: [],
    isLoading: false,
};

export default React.memo(AIChartRenderer);
