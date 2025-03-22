import Image from 'next/image'
import React from 'react'
import desktop from '../../public/assets/asset_0.png'
import { FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='text-black max-w-7xl mx-auto px-10 mb-16'>
            <div className='bg-neutral-100 px-6 py-12 flex justify-between items-center rounded-lg shadow-sm'>
                <div className='flex items-center gap-4 flex-1'>
                    <Image
                        src={desktop}
                        alt="MapoSpace Logo"
                        className='w-12 h-12'
                    />
                    <div className='text-xl font-medium font-display'>MapoSpace</div>
                </div>
                <div className='flex items-center gap-8 text-gray-600'>
                    <a href='#' className='hover:text-gray-900 transition-colors duration-200'><FaTwitter className='w-5 h-5' /></a>
                    <a href='#' className='hover:text-gray-900 transition-colors duration-200'><FaGithub className='w-5 h-5' /></a>
                    <a href='#' className='hover:text-gray-900 transition-colors duration-200'>Documentation</a>
                </div>
            </div>
            <div className='flex items-center justify-center mt-12 text-gray-500'>
                <p> 2024 MapoSpace, Inc. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer