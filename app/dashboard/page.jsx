'use client'
import H3Map from '@/components/Maps/H3Map'
import { API_ENDPOINTS } from '@/utils/api-endpoints'
import AuthServices from '@/utils/axios-api'
import React, { useEffect, useState } from 'react'
import { LiaChartLineSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdWifiTethering } from "react-icons/md";
import Image from 'next/image'
import CardBg1 from '@/public/card/Card1.png'
import { useRouter } from 'next/navigation'
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const page = () => {
    const router = useRouter()
    const [ranges, SetRanges] = useState([])
    const [currentRange, setCurrentRange] = useState(null);
    const [h3Data, setH3Data] = useState([]);

    const eventSplitData = {
        labels: ['CTA', 'Element'],
        datasets: [
            {
                data: [65, 35],
                backgroundColor: ['#9F8CFF', '#A0EACF'],
                borderWidth: 0,
            },
        ],
    };

    const osUsageData = {
        labels: ['Android', 'iOS', 'Web'],
        datasets: [
            {
                data: [60, 35, 5],
                backgroundColor: ['#4D9DE0', '#FF6B6B', '#FFD166'],
                borderWidth: 0,
            },
        ],
    };

    const userBarData = {
        labels: ['User 1', 'User 2', 'User 3', 'User 4'],
        datasets: [
            {
                label: 'Users',
                data: [4000, 3000, 5000, 2780],
                backgroundColor: '#6C4EE3',
                borderRadius: 4,
                barPercentage: 0.5,
                categoryPercentage: 1.0,
            },
        ],
    };

    const barOptions = {
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                ticks: { display: false },
                grid: { display: false },
            },
            y: {
                ticks: { color: '#333', font: { size: 14 } },
                grid: { display: false },
            },
        },
    };

    useEffect(() => {
        const Ranges = generateCustomDateRanges();
        console.log("Ranges", Ranges)
        SetRanges(Ranges);
        setCurrentRange(Ranges[0])
    }, [])

    useEffect(() => {
        if (currentRange != null) {
            h3ClustingHandler()
        }
    }, [currentRange])

    const selectedRangeHandler = (data) => {
        setCurrentRange(data)
    }

    function generateCustomDateRanges() {
        const dateRanges = [];
        const currentDate = new Date();

        // Helper function to format date as YYYY-MM-DD
        const formatDate = (date) => date.toISOString();

        // Last Month
        let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last month", id: 1 });

        // Last 3 Months
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last 3 months", id: 2 });

        // Last 6 Months
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last 6 months", id: 3 });

        // Last Year
        startDate = new Date(currentDate.getFullYear() - 1, 0, 1); // Jan 1st of last year
        endDate = new Date(currentDate.getFullYear() - 1, 11, 31); // Dec 31st of last year
        dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last year", id: 4 });

        return dateRanges;
    }

    const h3ClustingHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.H3Clusting, {
                "startDate": currentRange.startDate,
                "endDate": currentRange.endDate, "h3Resolution": 7
            });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("h3ClustingHandler", response?.data, currentRange.startDate);
            setH3Data(response.data)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    return (
        <div className='text-black py-9xl px-xl bg-white'>
            <div className='flex'>
                <div className='flex bg-neutral-200 rounded-bs p-xs text-f-m font-normal gap-xs'>
                    {ranges.length > 0 && ranges.map((range) => (
                        <div className={`px-xl py-xs cursor-pointer hover:bg-neutral-300 rounded-bs  ${range.id == currentRange.id && 'bg-white hover:bg-white'}`} key={range.id} onClick={() => { selectedRangeHandler(range) }}>{range.title}</div>
                    ))}
                </div>
            </div>
            <div className=" grid  grid-cols-2 gap-xl font-sans    mt-xl">
                <div className="col-span-1 p-xl bg-white rounded-bs border">
                    <h2 className="text-f-l font-bold">TOTAL events in this Month</h2>
                    <p className="text-gray-500">All events across all platforms</p>
                    <p className="text-f-6xl font-bold text-secondary-900 mt-2">3.2m</p>
                    <p className="text-green-600 font-medium mt-1">+12% from last month</p>
                </div>
                <div className="col-span-1 p-xl bg-white rounded-bs border">
                    <h2 className="text-f-l font-bold">Total unique users in this month</h2>
                    <p className="text-gray-500">Active users across all platforms</p>
                    <p className="text-f-6xl font-bold text-secondary-900 mt-2">1 mn.</p>
                    <p className="text-green-600 font-medium mt-1">+8% from last month</p>
                </div>

            </div>
            <div className="grid  grid-cols-3 gap-xl font-sans    mt-xl">
                <div className="p-xl bg-white rounded-bs border">
                    <h2 className="text-f-l font-bold">Event count split by event type</h2>
                    <p className="text-gray-500">Distribution of events by category</p>
                    <div className='p-l w-full h-[300px]  flex justify-center'>

                        <Doughnut data={eventSplitData} />
                    </div>
                </div>
                <div className="p-xl bg-white rounded-bs border">
                    <h2 className="text-f-l font-bold">Unique users in this month</h2>
                    <p className="text-gray-500">User growth over time</p>
                    <div className='p-l w-full h-[300px]  flex justify-center'>

                        <Bar data={userBarData} options={barOptions} />
                    </div>
                </div>
                <div className="p-xl bg-white rounded-bs border">
                    <h2 className="text-f-l font-bold">Usage split by OS</h2>
                    <p className="text-gray-500">Unique users by platform</p>
                    <div className='p-l w-full h-[300px] flex justify-center'>

                        <Doughnut data={osUsageData} />
                    </div>
                </div>
            </div>
            <div className='rounded-bs border p-xl  mt-xl'>
                <div className='w-full h-[100vh] relative '>
                    <H3Map h3Data={h3Data} type="product" />
                </div>
                <div className="grid  grid-cols-4 gap-xl font-sans    mt-xl">

                    <div className='col-span-1  bg-white bg-opacity-80 rounded-bs  text-black py-s px-xl flex items-center  gap-l  border p-xl'>
                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-xl font-semibold text-black flex gap-s items-center'>
                                <MdWifiTethering />
                                <div> Total Regions</div>
                            </div>
                            <div className='text-f-6xl font-semibold text-secondary-900'>7842631</div>
                        </div>
                    </div>

                    <div className='col-span-1  bg-white bg-opacity-80 rounded-bs  text-black py-s px-xl flex items-center  gap-l  border p-xl'>
                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-xl font-semibold text-black flex gap-s items-center'>
                                <MdWifiTethering />
                                <div>Highest Region</div>
                            </div>
                            <div className='text-f-6xl font-semibold text-secondary-900'>52631</div>
                        </div>
                    </div>
                    <div className='col-span-1  bg-white bg-opacity-80 rounded-bs  text-black py-s px-xl flex items-center  gap-l  border p-xl'>
                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-xl font-semibold text-black flex gap-s items-center'>
                                <MdWifiTethering />
                                <div>Average Sales / Region</div>
                            </div>
                            <div className='text-f-6xl font-semibold text-secondary-900'>1242631</div>
                        </div>
                    </div>
                    <div className='col-span-1  bg-white bg-opacity-80 rounded-bs  text-black  flex items-center  gap-l border p-xl'>

                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-xl font-semibold text-black flex gap-s items-center'>
                                <MdWifiTethering />
                                <div> Growth Rate</div>
                            </div>
                            <div className='text-f-6xl font-semibold text-secondary-900'>2631</div>
                        </div>
                    </div>



                </div>
            </div>


        </div>
    )
}

export default page