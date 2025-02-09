import Image from 'next/image'
import React from 'react'
import desktop from '../../public/assets/asset_0.png'
import { FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='text-black max-w-7xl mx-auto px-10 mb-12' >
            <div className=' bg-neutral-100 px-6 py-10 flex justify-between items-center'>
                <div className='flex items-center gap-2 flex-1'>
                    <Image
                        src={desktop}
                        alt="Picture of the author"
                    />
                    <div className='text-lg font-medium font-display'>Todesktop</div>
                </div>
                <div className='flex items-center gap-6'>
                    <FaTwitter />
                    <FaGithub />
                    <div>Documentation</div>
                </div>
            </div>
            <div className='flex items-center justify-center mt-12'>
                <p className='text-neutral-400'>© 2024 ToDesktop, Inc. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer