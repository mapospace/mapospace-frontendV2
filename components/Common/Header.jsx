"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import desktop from '../../public/assets/asset_0.png'
import electron from '../../public/assets/asset_1.svg'
import { RiMenuFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { PiSignInBold } from "react-icons/pi";
import { usePathname, useRouter } from 'next/navigation';
import logo from '../../public/assets/logo.png'
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    const [active, setActive] = useState(false);
    const router = useRouter();
    const param = usePathname();

    const handleMenu = () => {
        setActive((prev) => !prev);
    }
    return (
        <nav className='fixed top-0 left-0 text-black flex justify-between items-center z-50  p-5 py-m shadow-md  bg-white w-full  '>
            <a href='#' className='flex items-center gap-2 flex-1'>
                <Image
                    src={logo}
                    alt="Picture of the author"
                    className='w-10 h-10'
                />
                <div className='text-lg font-medium font-display'>MapoSpace</div>
            </a>

            <button onClick={handleMenu}><RiMenuFill className='text-gray-500 lg:hidden' /></button>
            {/* <div className='hidden lg:flex justify-between items-center font-inter'>
                <button onClick={() => { router.push('/dashboard') }} className={`font-normal text-f-m  px-xl py-s  rounded-3xl ${param.includes("dashboard") && 'text-white  bg-secondary-900'}`}>Dashboard</button>
                <button onClick={() => { router.push('/profile') }} className={`font-normal text-f-m  px-xl py-s  rounded-3xl ${param.includes("profile") && 'text-white   bg-secondary-900 '}`}>Profile</button>
            </div> */}
            <div className='flex-1 justify-end hidden lg:flex'>
                <button className='flex  rounded-md items-center gap-2 '>
                    <RxHamburgerMenu className='w-xl h-xl' />
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
