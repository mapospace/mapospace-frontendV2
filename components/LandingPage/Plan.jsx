import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Plan = () => {
    return (
        <div className='text-black max-w-7xl mx-auto px-10 my-24' >
            <div className='text-[48px] font-semibold'>Choose a plan that fits your needs            </div>
            <div className='flex flex-col gap-6 lg:flex-row my-6'>
                <PlanList />
                <PlanList />
                <PlanList />
            </div>
        </div>
    )
}

export default Plan

const PlanList = () => {
    return <div className='flex flex-1 flex-col gap-6 p-6 rounded-xl bg-neutral-200 hover:bg-gradient-to-b hover:from-neutral-100 hover:via-white hover:to-purple-100'>
        <div className='flex items-center gap-6 text-3xl'>
            FREE
        </div>
        <p className='text-lg'>For personal use or testing your app before deploying to customers.        </p>
        <p className='text-lg'>Key Features</p>
        <div className='flex gap-3 flex-col'>
            <div className='flex items-center gap-2'>
                <IoMdCheckmark />
                <div>Free for personal use</div>
            </div>
            <div className='flex items-center gap-2'>
                <IoMdCheckmark />
                <div>Free for personal use</div>
            </div>
            <div className='flex items-center gap-2'>
                <RxCross2 />
                <div>Free for personal use</div>
            </div>
            <div className='flex items-center gap-2'>
                <RxCross2 />
                <div>Free for personal use</div>
            </div>
        </div>
    </div>
}