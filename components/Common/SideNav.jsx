import React, { useState } from 'react'
import { GoHomeFill } from "react-icons/go";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { MdOutlineViewInAr } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';


const SideNav = ({ routeHandler }) => {
    const param = usePathname();
    const [openType, setOpenType] = useState('home');
    return (
        <div className='fixed left-0  h-[calc(100vh)] top-0 z-10  flex '>
            <div className=' h-full  w-[60px] p-s  flex flex-col items-center border-r border-gray-300 bg-neutral-100 justify-between pt-6xl'>
                <div >
                    <div className='relative  flex items-center justify-center py-m border-b border-gray-400 group ' onClick={() => {
                        routeHandler('/dashboard');
                        setOpenType("home")
                    }}>
                        <GoHomeFill className={clsx('w-7 h-7 text-gray-400 hover:text-secondary-900 cursor-pointer', (openType == "home" && "text-secondary-900"))} />
                        <p className='absolute text-white py-xs px-l hidden group-hover:block bg-secondary-500 rounded-lg left-9 bottom-3 text-f-s'>Home</p>
                    </div>
                    <div className='  flex items-center justify-center py-m border-b border-gray-400 flex-col '>
                        <div className='relative  flex items-center justify-center py-m  group' onClick={() => {
                            openType == "sales" ? setOpenType(null) : setOpenType("sales")
                        }}>
                            <BsFillBarChartLineFill className={clsx('w-7 h-7 text-gray-400 hover:text-secondary-900 cursor-pointer', (openType == "sales" && "text-secondary-900"))} />
                            <p className='absolute  py-xs px-l hidden group-hover:block bg-secondary-500  text-white rounded-lg left-9 bottom-3  text-f-s'>Sales</p>
                        </div>
                        <div className='relative  flex items-center justify-center py-m  group' onClick={() => { routeHandler('/dashboard/sales?category=total_sales') }}>

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
            <div className={clsx('bg-neutral-100 w-[200px]  border-r pt-6xl "block"', (openType == null || openType == "home") && "hidden")} >
                {openType == "sales" && <TotalSale setOpenType={setOpenType} />}
            </div>
        </div >
    )
}

export default SideNav;


const TotalSale = ({ setOpenType }) => {
    const router = useRouter()

    const chnageRouteHandler = (endpoint) => {
        router.push(endpoint);
        setOpenType(null)
    }
    return <div className='w-full text-black'>
        <div className=' py-m px-l text-f-xl border-b border-neutral-300 font-semibold'>
            Sale
        </div>
        <div className=' border-b border-neutral-300'>
            <div className='text-f-l font-normal m-s p-s cursor-pointer hover:bg-neutral-300 rounded-md' onClick={() => { chnageRouteHandler('/dashboard/sales?category=total_sale') }}>Total Sale</div>
            <div className='text-f-l font-normal p-s m-s cursor-pointer hover:bg-neutral-300 rounded-md' onClick={() => { chnageRouteHandler('/dashboard/sales?category=orders') }}>Orders</div>
            <div className='text-f-l font-normal p-s m-s cursor-pointer hover:bg-neutral-300 rounded-md' onClick={() => { chnageRouteHandler('/dashboard/sales?category=products') }}>Products</div>
            <div className='text-f-l font-normal p-s m-s cursor-pointer hover:bg-neutral-300 rounded-md' onClick={() => { chnageRouteHandler('/dashboard/sales?category=categories') }}>Categories</div>
            <div className='text-f-l font-normal p-s m-s cursor-pointer hover:bg-neutral-300 rounded-md' onClick={() => { chnageRouteHandler('/dashboard/sales?category=sub_categorie') }}>Sub Categories</div>
            <div className='text-f-l font-normal p-s m-s cursor-pointer hover:bg-neutral-300 rounded-md' onClick={() => { chnageRouteHandler('/dashboard/sales?category=payments') }}>Payments</div>
        </div>

    </div>
}