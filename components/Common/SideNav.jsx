import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { MdOutlineViewInAr } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const SideNav = ({ routeHandler }) => {
    const param = usePathname();
    return (
        <div className='fixed left-0 w-[60px] h-[calc(100vh)] top-0 z-10 border-r border-gray-300 bg-gray-100 p-s flex gap-l'>
            <div className=' h-full  w-full   flex flex-col items-center justify-between pt-6xl'>
                <div>
                    <div className='relative  flex items-center justify-center py-m border-b border-gray-400 group ' onClick={() => { routeHandler('/dashboard') }}>
                        <GoHomeFill className={clsx('w-7 h-7 text-gray-400 hover:text-secondary-900 cursor-pointer', (param == '/dashboard' && "text-secondary-900"))} />
                        <p className='absolute text-white py-xs px-l hidden group-hover:block bg-secondary-500 rounded-lg left-9 bottom-3 text-f-s'>Home</p>
                    </div>
                    <div className='  flex items-center justify-center py-m border-b border-gray-400 flex-col '>
                        <div className='relative  flex items-center justify-center py-m  group' onClick={() => { routeHandler('/dashboard/sales') }}>
                            <BsFillBarChartLineFill className={clsx('w-7 h-7 text-gray-400 hover:text-secondary-900 cursor-pointer', (param == '/dashboard/sales' && "text-secondary-900"))} />
                            <p className='absolute  py-xs px-l hidden group-hover:block bg-secondary-500  text-white rounded-lg left-9 bottom-3  text-f-s'>Sales</p>
                        </div>
                        <div className='relative  flex items-center justify-center py-m  group'>

                            <MdOutlineViewInAr className={clsx('w-7 h-7 text-gray-400 hover:text-secondary-900 cursor-pointer', (param == '/dashboard/views' && "text-secondary-900"))} />
                            <p className='absolute text-white py-xs px-l hidden group-hover:block bg-secondary-500  rounded-lg left-9 bottom-3  text-f-s'>Views</p>
                        </div>

                    </div>
                </div>
                <div className='relative  flex items-center justify-center py-m border-t border-gray-400 group ' onClick={() => { routeHandler('/profile') }}>
                    <IoSettings className={clsx('w-7 h-7 text-gray-400 hover:text-secondary-900 cursor-pointer', (param.includes('/profile') && "text-secondary-900"))} />
                    <p className='absolute text-white py-xs px-l hidden group-hover:block bg-secondary-500 rounded-lg left-9 bottom-3 text-f-s'>Setting</p>
                </div>
            </div>
            {/* NTD */}
            <div className='bg-red-300 hidden'>
                dbdkjb
            </div>
        </div>
    )
}

export default SideNav;