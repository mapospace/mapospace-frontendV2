"use client";

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import desktop from '../../public/assets/asset_0.png'
import electron from '../../public/assets/asset_1.svg'
import { AiOutlineClose } from "react-icons/ai";
import { usePathname, useRouter } from 'next/navigation';
import logo from '../../public/assets/logo.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { PiSignOutThin } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { RemoveAuthCredentials } from '@/utils/auth-utils';
import clsx from 'clsx';

const Header = () => {
    const [active, setActive] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const router = useRouter();
    const param = usePathname();
    const burgurPopup = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (burgurPopup.current && !burgurPopup.current.contains(event.target)) {
                setShowPopUp(false);
            }
        }

        if (showPopUp) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopUp]);


    const handleMenu = () => {
        setActive((prev) => !prev);
    }
    return (
        <nav className='fixed top-0 left-0 text-black flex justify-between items-center z-50  p-5 py-m shadow-md  bg-white w-full  '>
            <button className='flex items-center gap-2 flex-1' onClick={() => { router.push('/') }}>
                <Image
                    src={logo}
                    alt="Picture of the author"
                    className='w-10 h-10'
                />
                <div className='text-lg font-medium font-display'>MapoSpace</div>
            </button>


            <div className='flex-1 justify-end hidden lg:flex relative'>
                <button className='flex  rounded-md items-center gap-2 ' onClick={() => { setShowPopUp(prev => !prev) }}>
                    <RxHamburgerMenu className='w-xl h-xl' />
                </button>
                <div ref={burgurPopup} className={clsx('bg-white border   absolute top-9 p-xs rounded-bs shadow-sm', showPopUp ? 'block' : 'hidden')}>
                    <div className='p-xs px-m hover:bg-neutral-200 rounded-bs text-right flex gap-m items-center justify-between cursor-pointer' onClick={() => {
                        router.push('/sign-in')
                        RemoveAuthCredentials()
                    }}>
                        <PiSignOutThin className='w-l h-l ' />
                        <div className='text-nowrap'>Sign Out</div>
                    </div>
                    <div className='p-xs px-m hover:bg-neutral-200 rounded-bs text-right flex gap-m items-center justify-between cursor-pointer'>
                        <CiSettings className='w-l h-l ' />
                        <div className='text-nowrap'>Setting</div>
                    </div>
                </div>
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
