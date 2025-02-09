import React from 'react'
import upload from '../../public/assets/asset_66.svg'
import Image from 'next/image'
import { IoMdCheckmark } from "react-icons/io";

const How = () => {
    return (
        <div className='text-black max-w-7xl mx-auto px-10' >
            <div className='text-[48px] font-semibold'>How it works</div>
            <div className='mt-24 '>
                {[1, 2, 3].map((value, index) => (<Card key={index} value={value} />))}
            </div>
        </div>
    )
}

const Card = ({ value }) => {
    return <div className='bg-white p-[24px] flex flex-col justify-center gap-2 my-12 border rounded-xl md:flex-row'>
        <div className=' bg-white flex flex-col gap-7 '>
            <button className='flex'>
                <span className='bg-[#fefce8] px-4 py-1 border text-[#854d0e] border-yellow-500 rounded-xl font-semibold'>{`Step ${value}`}</span>
            </button>
            <div className='text-xl font-semibold font-display md:text-4xl'>Bootstrap straight from your web app</div>
            <div className='text-medium font-display lg:text-lg'>Copy and paste your web app url into ToDesktop. Customise your app design, app icon and window frame UI with no code.</div>
            <div className=' flex gap-2 text-[18px]'>
                <div className='flex flex-col flex-1 gap-2'>
                    <div className='flex items-center gap-2'><IoMdCheckmark /> <span className='underline text-sm lg:text-lg'>Multiple Windows</span></div>
                    <div className='flex items-center gap-2'><IoMdCheckmark /> <span className='underline text-sm lg:text-lg'>Multiple Windows</span></div>
                    <div className='flex items-center gap-2'><IoMdCheckmark /> <span className='underline text-sm lg:text-lg'>Multiple Windows</span></div>
                </div>
                <div className='flex flex-col flex-1 gap-2'>
                    <div className='flex items-center gap-2'><IoMdCheckmark /> <span className='underline text-sm lg:text-lg'>Multiple Windows</span></div>
                    <div className='flex items-center gap-2'><IoMdCheckmark /> <span className='underline text-sm lg:text-lg'>Multiple Windows</span></div>
                    <div className='flex items-center gap-2'><IoMdCheckmark /> <span className='underline text-sm lg:text-lg'>Multiple Windows</span></div>
                </div>
            </div>
        </div>
        <Image src={upload} alt='upload' />
    </div>
}

export default How