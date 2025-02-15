'use client'
import { Bar, Line, Radar } from 'react-chartjs-2';
import React, { useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const Graphs = () => {
    const [timeRange, setTimeRange] = useState('Last 7 Days');

    const engagementData = {
        labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
        datasets: [{
            label: 'Engagement',
            data: [90, 101.04, 112.10, 12, 95, 124],
            borderColor: '#6000fd',
            backgroundColor: '#6000fd',
            tension: 0.4,
            fill: true,
        },
        {
            label: 'Value',
            data: [100, 11.04, 152.10, 2, 91, 150],
            borderColor: '#a066fe',
            backgroundColor: '#a066fe',
            tension: 0.4,
            fill: true,
        }]
    };

    const followersData = {
        labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
        datasets: [
            {
                label: 'New Followers',
                data: [2000, 5000, 9000, 12000, 15000, 21000],
                backgroundColor: '#6000fd',
            },
            {
                label: 'Unfollowed',
                data: [1000, 3000, 5000, 7000, 9000, 6000],
                backgroundColor: '#a066fe',
            }
        ]
    };

    const data = {
        labels: [
            'Eating',
            'Drinking',
            'Sleeping',
            'Designing',
            'Coding',
            'Cycling',
            'Running'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 20, 51, 56, 55, 40],
            fill: true,
            backgroundColor: '#6000fd',
            borderColor: '#6000fd',
            pointBackgroundColor: '#6000fd',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#6000fd'
        }, {
            label: 'My Second Dataset',
            data: [28, 48, 40, 19, 26, 27, 50],
            fill: true,
            backgroundColor: '#0136f8',
            borderColor: '#0136f8',
            pointBackgroundColor: '#0136f8',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#0136f8'
        }]
    };


    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };
    const radarOption = {
        responsive: true,
        elements: {
            line: {
                borderWidth: 3,
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-neutral-1200">Overall Sales Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-lg shadow-md  flex flex-col h-[500px] gap-s ">
                    <h3 className="text-lg font-semibold text-neutral-1000">Engagement</h3>
                    <div className='flex-1 h-[400px] flex items-center justify-center'>
                        <Radar data={data} options={radarOption} />
                    </div>

                </div>
                <div className="bg-white p-6 rounded-lg shadow-md  flex flex-col justify-between h-[500px] gap-s">
                    <h3 className="text-lg font-semibold text-neutral-1000">Engagement</h3>
                    <div className=' flex flex-1 items-center justify-center '>
                        <Bar data={followersData} options={barOptions} />
                    </div>

                </div>

            </div>
            <h2 className="text-xl font-bold my-6 text-neutral-1200">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[{ label: 'Invites Sent', value: 24, color: 'text-primary-800' },
                { label: 'Click Rate', value: '10.4%', color: 'text-pink-500' },
                { label: 'Reviews', value: 62, color: 'text-secondary-800' },
                { label: 'Response Rate', value: '10.0%', color: 'text-green-500' }].map((item, index) => (
                    <div key={index} className={`p-6  rounded-lg shadow-md bg-white text-center text-neutral-1000 min-h-[300px] flex flex-col justify-around `}>
                        <h3 className={`text-f-6xl font-bold ${item.color}`}>{item.value}</h3>
                        <div className='flex flex-col gap-xl'>
                            <p className="text-f-2xl text-gray-600">{item.label}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ut, voluptate veritatis perferendis repellendus quaerat non voluptatum. </p>
                        </div>

                    </div>
                ))}
            </div>
            <h2 className="text-xl font-bold my-6 text-neutral-1200">Data Overview</h2>
            <div className="grid grid-cols-1  gap-6  ">
                <div className="bg-white p-6 rounded-lg shadow-md  flex flex-col max-h-[500px] ">
                    <h3 className="text-lg font-semibold text-neutral-1000">Engagement</h3>
                    <div className='w-full  h-[400px]  flex items-center justify-center'>
                        <Line data={engagementData} options={{ maintainAspectRatio: false }} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Graphs