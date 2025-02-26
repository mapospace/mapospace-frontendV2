'use client'
import H3Map from '@/components/Maps/H3Map'
import { API_ENDPOINTS } from '@/utils/api-endpoints'
import AuthServices from '@/utils/axios-api'
import React, { useEffect, useState } from 'react'
import { LiaChartLineSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdWifiTethering } from "react-icons/md";

const page = () => {
    const [ranges, SetRanges] = useState([])
    const [currentRange, setCurrentRange] = useState(null);
    const [h3Data, setH3Data] = useState([])

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
        <div className='text-black py-10xl px-xl bg-white'>
            <div className='flex'>
                <div className='flex bg-neutral-200 rounded-bs p-xs text-f-m font-normal gap-xs'>
                    {ranges.length > 0 && ranges.map((range) => (
                        <div className={`px-xl py-xs cursor-pointer hover:bg-neutral-300 rounded-bs  ${range.id == currentRange.id && 'bg-white hover:bg-white'}`} key={range.id} onClick={() => { selectedRangeHandler(range) }}>{range.title}</div>
                    ))}
                </div>
            </div>
            <div className='flex gap-xl mt-xl'>
                <div className='flex-1 bg-white bg-opacity-80 rounded-bs border text-black py-s px-xl flex  flex-col leading-[45px]'>
                    <div className='text-f-2xl flex justify-between items-center'>
                        <div className='text-f-l'>Total Sales</div>
                        <LiaChartLineSolid />
                    </div>
                    <div className='text-f-6xl font-semibold '>542631</div>
                    <div className='text-neutral-600 font-f-l'>+20.1% from previous period</div>
                </div>
                <div className='flex-1 bg-white bg-opacity-80 rounded-bs border text-black py-s px-xl flex  flex-col leading-[45px]'>
                    <div className='text-f-2xl flex justify-between items-center'>
                        <div className='text-f-l'>Total Sales</div>
                        <MdWifiTethering />
                    </div>
                    <div className='text-f-6xl font-semibold '>542631</div>
                    <div className='text-neutral-600 font-f-l'>+20.1% from previous period</div>
                </div>
                <div className='flex-1 bg-white bg-opacity-80 rounded-bs border text-black py-s px-xl flex  flex-col leading-[45px]'>
                    <div className='text-f-2xl flex justify-between items-center'>
                        <div className='text-f-l'>Active Regions</div>
                        <HiOutlineUserGroup />
                    </div>
                    <div className='text-f-6xl font-semibold '>542631</div>
                    <div className='text-neutral-600 font-f-l'>+20.1% from previous period</div>
                </div>


            </div>
            <div className='rounded-bs border p-xl  mt-xl'>
                <div className='w-full h-[100vh] relative '>
                    <H3Map h3Data={h3Data} />
                </div>
                <div className='flex gap-xl mt-xl '>

                    <div className='flex-1 bg-white bg-opacity-80 rounded-bs  text-black py-s px-xl flex items-center  gap-l'>
                        <MdWifiTethering />
                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-m text-neutral-600'>Total Regions</div>
                            <div className='text-f-2xl font-semibold '>542631</div>
                        </div>
                    </div>

                    <div className='flex-1 bg-white bg-opacity-80 rounded-bs  text-black py-s px-xl flex items-center  gap-l'>
                        <MdWifiTethering />
                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-m text-neutral-600'>Highest Region</div>
                            <div className='text-f-2xl font-semibold '>542631</div>
                        </div>
                    </div>
                    <div className='flex-1 bg-white bg-opacity-80 rounded-bs  text-black py-s px-xl flex items-center  gap-l'>
                        <MdWifiTethering />
                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-m text-neutral-600'>Average Sales/Region</div>
                            <div className='text-f-2xl font-semibold '>542631</div>
                        </div>
                    </div>
                    <div className='flex-1 bg-white bg-opacity-80 rounded-bs  text-black py-s px-xl flex items-center  gap-l'>
                        <MdWifiTethering />
                        <div className='text-f-2xl flex flex-col justify-between items-start'>
                            <div className='text-f-m text-neutral-600'>Growth Rate</div>
                            <div className='text-f-2xl font-semibold '>542631</div>
                        </div>
                    </div>



                </div>
            </div>


        </div>
    )
}

export default page