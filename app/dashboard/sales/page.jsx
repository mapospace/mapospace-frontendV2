'use client';
import { FaMapLocationDot } from "react-icons/fa6";
import { IoBarChartSharp } from "react-icons/io5";
import { FaTable } from "react-icons/fa";
import Graphs from "@/components/Sales/Graphs";
import { useState } from "react";
import clsx from "clsx";
import MapContainer from "@/components/Maps/MapContainer";


const Dashboard = () => {
    const [currentType, setCurrentType] = useState(1);

    return (
        <div className="p-8 bg-gray-100 min-h-screen pt-10xl" >
            <div className='pb-m mb-xl border-b flex justify-between'>
                <div className='text-neutral-1300 font-semibold text-3xl'>Sales</div>
                <div className='text-neutral-1300 flex gap-xs bg-secondary-100 items-center p-xs rounded-sm justify-center'>
                    <button className={clsx('text-neutral-1300  py-xs px-s bg-purple-50 rounded-sm hover:bg-secondary-500 hover:text-white', currentType == 1 && 'bg-secondary-600 hover:bg-secondary-500 text-white')} onClick={() => { setCurrentType(1) }}><IoBarChartSharp className='w-xl h-xl ' /></button>
                    <button className={clsx('text-neutral-1300  py-xs px-s bg-purple-50 rounded-sm hover:bg-secondary-500 hover:text-white', currentType == 2 && 'bg-secondary-600 hover:bg-secondary-500 text-white')} onClick={() => { setCurrentType(2) }}><FaTable className='w-xl h-xl' /></button>
                    <button className={clsx('text-neutral-1300  py-xs px-s bg-purple-50 rounded-sm hover:bg-secondary-500 hover:text-white', currentType == 3 && 'bg-secondary-600 hover:bg-secondary-500 text-white')} onClick={() => { setCurrentType(3) }}> <FaMapLocationDot className='w-xl h-xl' /></button>

                </div>
            </div>
            {currentType == 1 ? <Graphs /> : currentType == 2 ? <div className="text-neutral-1000">No Data Found</div> : <div className="text-neutral-1000"><MapContainer /></div>}


        </div >
    );
};

export default Dashboard;
