"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import desktop from '../../public/assets/asset_0.png'
import electron from '../../public/assets/asset_1.svg'
import { RiMenuFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { PiSignInBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';

const Header = () => {
    const [active, setActive] = useState(false);
    const router = useRouter()

    const handleMenu = () => {
        setActive((prev) => !prev);
    }
    return (
        <nav className='text-black flex justify-between items-center bg-opacity-70 p-5 shadow-md absolute bg-white w-full top-0 '>
            <a href='#' className='flex items-center gap-2 flex-1'>
                <Image
                    src={desktop}
                    alt="Picture of the author"
                />
                <div className='text-lg font-medium font-display'>Todesktop</div>
            </a>

            <button onClick={handleMenu}><RiMenuFill className='text-gray-500 lg:hidden' /></button>
            <div className='hidden lg:flex justify-between items-center gap-12 font-inter'>
                <a href='#' className='font-medium hover:text-primary'>Pricing</a>
                <a href='#' className='font-medium hover:text-primary'>Doc</a>
                <a href='#' className='font-medium hover:text-primary'>Changelog</a>
                <a href='#' className='font-medium hover:text-primary'>Blogs</a>
                {/* <a href='#' className='font-medium hover:text-primary'>Login</a> */}
            </div>
            <div className='flex-1 justify-end hidden lg:flex'>
                <button className='flex border-2 px-3 p-1 rounded-md items-center gap-2 hover:border-gray-400'>
                    <PiSignInBold className='rotate-180' />
                    <div className=' font-display font-medium ' onClick={() => { router.push('/') }}>Sign Out</div>
                    <FaArrowRightLong />
                </button>
            </div>

            {active && <div className='fixed bg-white inset-0 z-20 bg-opacity-60'>
                <div className='bg-white text-black flex justify-between items-center p-5 border-b w-[100vw]'>
                    <a href='#' className='flex items-center gap-2'>
                        <Image
                            src={desktop}
                            alt="Picture of the author"
                        />
                        <div className='text-lg font-medium font-display'>Todesktop</div>
                    </a>
                    <button onClick={handleMenu} >
                        <AiOutlineClose className='text-gray-500' />
                    </button>
                </div>
                <div className='flex flex-col  justify-between items-start  font-inter '>
                    <a href='#' className='font-medium w-full px-5 p-5 hover:bg-gray-50'>Pricing</a>
                    <a href='#' className='font-medium w-full px-5 p-5 hover:bg-gray-50'>Doc</a>
                    <a href='#' className='font-medium w-full px-5 p-5 hover:bg-gray-50'>Changelog</a>
                    <a href='#' className='font-medium w-full px-5 p-5 hover:bg-gray-50'>Blogs</a>
                    <a href='#' className='font-medium w-full px-5 p-5 hover:bg-gray-50'>Login</a>
                </div>
                <div className='mt-5 pt-5 border-t'>
                    <button className=' flex p-5 w-full items-center gap-2 hover:bg-gray-50'>
                        <Image
                            src={electron}
                            alt="Electron"
                        />
                        <div className=' font-display font-medium'>Electron Developers</div>
                    </button>
                </div>
            </div>}
        </nav >
    );
};

export default Header;
