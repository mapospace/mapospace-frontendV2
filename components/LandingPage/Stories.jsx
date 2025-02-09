import React from 'react'
import screen1 from '../../public/assets/asset_34.png'
import profile from '../../public/assets/asset_33.jpeg'
import Image from 'next/image'
import { FaCheck } from "react-icons/fa6";
import { HiMiniCodeBracket } from "react-icons/hi2";

const Stories = () => {
    return (
        <div className='text-black max-w-7xl mx-auto px-10 my-24' >
            <div className='text-[48px] font-semibold'>Customer stories</div>
            <Story1 />
            <Story2 />
            <Story3 />
        </div>
    )
}

const Story1 = () => {
    return <div className='flex flex-col border-2 rounded-2xl border-neutral-200 xl:flex-row my-6'>
        <div className='flex flex-col m-12 gap-8'>
            <div className='font-medium text-xl' >ClickUp used ToDesktop to get their desktop app in front of customers in days instead of months.</div>
            <div className='flex gap-3 flex-wrap'>
                <div className='flex whitespace-nowrap items-center bg-[#fefce8] border-2 border-[#f5b66d] py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-[#854d0e] font-semibold'>Chromeless UI</div>
                </div>
                <div className='flex whitespace-nowrap items-center bg-[#fefce8] border-2 border-[#f5b66d] py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-[#854d0e] font-semibold'>Native spellcheck</div>
                </div>
                <div className='flex whitespace-nowrap items-center bg-[#fefce8] border-2 border-[#f5b66d] py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-[#854d0e] font-semibold'>Task time in menubar</div>
                </div>
                <div className='flex whitespace-nowrap items-center bg-[#fefce8] border-2 border-[#f5b66d] py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-[#854d0e] font-semibold'>Notification count in the dock                            </div>
                </div>

                <div className='flex whitespace-nowrap items-center bg-[#fefce8] border-2 border-[#f5b66d] py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-[#854d0e] font-semibold'>Global hotkey to create task
                    </div>
                </div>



            </div>

            <p className='text-medium font-light text-neutral-400'>“ToDesktop provided us with a polished desktop app in no time. Their expert team guided us through a smooth migration from our outdated legacy desktop app, enabling us to deliver new and improved features to our customers within days.”</p>
            <div className='flex gap-3'>
                <Image src={profile} alt='profile' className='rounded-full' />
                <div className='flex flex-col'>
                    <div>ABC</div>
                    <div className='text-neutral-400'>Founder & CEO, ClickUp</div>
                </div>
            </div>
        </div>

        <div className='ml-12 ' >
            <Image src={screen1} alt="screen1" className='h-full' />
        </div>
    </div>
}

const Story2 = () => {
    return <div className='flex flex-col gap-6 lg:flex-row'>
        <ShortStory />
        <ShortStory />
        <ShortStory />
    </div>
}
const Story3 = () => {
    return <div className='flex flex-col border-2 rounded-2xl border-neutral-200 xl:flex-row bg-black my-6 pt-10'>
        <div className='flex flex-col m-12 gap-8 '>
            <div className='font-medium text-xl text-white' >ClickUp used ToDesktop to get their desktop app in front of customers in days instead of months.</div>
            <div className='flex gap-3 flex-wrap'>
                <div className='flex whitespace-nowrap items-center bg-primary text-white  py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-white '>Chromeless UI</div>
                </div>
                <div className='flex whitespace-nowrap items-center bg-primary text-white  py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-white '>Native spellcheck</div>
                </div>
                <div className='flex whitespace-nowrap items-center bg-primary text-white  py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-white '>Task time in menubar</div>
                </div>
                <div className='flex whitespace-nowrap items-center bg-primary text-white  py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-white '>Notification count in the dock                            </div>
                </div>

                <div className='flex whitespace-nowrap items-center bg-primary text-white  py-1 px-3 gap-2 rounded-lg'>
                    <FaCheck />
                    <div className='text-white '>Global hotkey to create task
                    </div>
                </div>



            </div>

            <p className='text-medium font-light text-neutral-400'>“ToDesktop provided us with a polished desktop app in no time. Their expert team guided us through a smooth migration from our outdated legacy desktop app, enabling us to deliver new and improved features to our customers within days.”</p>
            <div className='flex gap-3'>
                <Image src={profile} alt='profile' className='rounded-full' />
                <div className='flex flex-col'>
                    <div className='text-white'>ABC</div>
                    <div className='text-neutral-400'>Founder & CEO, ClickUp</div>
                </div>
            </div>
        </div>

        <div className='ml-12 ' >
            <Image src={screen1} alt="screen1" className='h-full' />
        </div>
    </div>
}

const ShortStory = () => {
    return <div className='flex flex-1 flex-col gap-6 p-6 rounded-xl bg-neutral-100 hover:bg-gradient-to-br hover:from-red-100 hover:via-purple-100 hover:to-yellow-100'>
        <div className='flex items-center gap-6'>
            <div className='w-12 h-12 bg-blue-200 rounded-full items-center flex justify-center'>
                <HiMiniCodeBracket className='w-6 h-6 text-neutral-500' />
            </div>
            <h1 className='text-2xl font-medium '>Native APIs</h1>
        </div>
        <p className='text-lg'>What sets ToDesktop apart is its seamless integration with native APIs using our existing web codebase. By tapping into APIs like Tray and Notifications, we've crafted an exceptionally polished desktop user experience.
        </p>
        <div className='flex gap-3 '>
            <Image src={profile} alt='profile' className='rounded-full' />
            <div className='flex flex-col'>
                <div>ABC</div>
                <div className='text-neutral-400'>Founder & CEO, ClickUp</div>
            </div>
        </div>
    </div>
}
export default Stories