import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaHandBackFist } from "react-icons/fa6";
import { MdOutlineLaptop } from "react-icons/md";
import arrowDown from '../../public/assets/asset_2.svg'
import Image from 'next/image';
import PoweredCard from './PoweredCard';

const MainComponent = () => {
    return (
        <div className='min-h-screen bg-gradient-to-b from-purple-50 via-orange-50 to-transparent py-24 '>
            <div className='max-w-4xl mx-auto px-5 text-black flex flex-col items-start sm:items-center gap-8 md:gap-12 '>
                <div className='flex items-center gap-2 bg-[#fefce8] px-5 py-1 border rounded-lg border-[#ca8a04] mt-16 shadow-md hover:shadow-lg hover:-translate-y-1 transition group'>
                    <div className='w-2 h-2 border rounded-full bg-[#facc15] border-[#ca8a04]' />
                    <div className='font-medium text-[#854d0e]'><span className='text-[#ca8a04]'>v0.21.1: </span>Find-in-page bug fixes</div>
                    <FaArrowRightLong className='text-[#ca8a04] group-hover:translate-x-1 transition duration-300' />
                </div>
                <div className='flex gap-8 text-[#6b7280]'>
                    <div className='flex gap-2 items-center'><IoDocumentTextOutline /> <div className='text-center'>Code Optional</div></div>
                    <div className='flex gap-2 items-center'><FaHandBackFist /> <div className='text-center'>Drag & drop builder</div></div>
                    <div className='flex gap-2 items-center'><MdOutlineLaptop /> <div className='text-center'>Windows, Mac, Linux</div></div>

                </div>
                <div className='text-4xl w-full font-semibold font-display leading-[50px] md:text-center md:text-7xl'>
                    <div >Web app to desktop app in minutes</div>
                </div>

                <div className='text-xl md:text-2xl md:text-center'>
                    <p>Take your web app codebase and transform it into cross platform desktop app with native functionality.</p>
                </div>
                <div className='flex flex-col gap-4 w-full justify-center md:flex-row'>
                    <button className='px-8 py-3 rounded-xl bg-[#3238f2] text-white hover:bg-[#474dee]'>Download now</button>
                    <button className='px-8 py-3 rounded-xl border bg-white text-black hover:border-gray-400  '>Read Docs</button>
                </div>
                <div className='flex justify-center gap-2 w-full '>
                    <Image src={arrowDown} alt='down' className='mt-2'></Image>
                    <div>APPS POWERED BY TODESKTOP</div>
                    <Image src={arrowDown} alt='down' className='transform scale-x-[-1] mt-2'></Image>
                </div>
                <div className='flex flex-col gap-4'>
                    <PoweredCard position="-translate-x-48" ltr={true} speed={0.15} />
                    <PoweredCard position="-translate-x-36" ltr={false} speed={0.15} />
                    <PoweredCard position="-translate-x-48 md:hidden" ltr={true} speed={0.15} />
                </div>
            </div>
        </div>
    )
}

export default MainComponent