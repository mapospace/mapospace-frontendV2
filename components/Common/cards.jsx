'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaUser } from "react-icons/fa";


const Cards = ({ menuItems, title }) => {
    const router = useRouter();
    // const profileData = useSelector((state) => state?.profileDetail?.profileDetails);
    const handleCardClick = (path) => {
        if (path) {
            router.push(path);
        }
    };
    return (
        <div className="flex flex-col flex-grow gap-6 ">
            <div className='flex flex-col sc-sm:flex-row  justify-between sc-sm:items-center '>
                <h1 className="text-[32px] font-light text-black">
                    {title}
                </h1>


            </div>

            <div className="grid grid-cols-2 sc-xs:grid-cols-3 sc-md:grid-cols-4 w-full gap-6 ">
                {menuItems?.map((item, index) => (
                    <div key={index} className="flex flex-col justify-center  items-center p-[1px] cursor-pointer rounded-md bg-gray-300  hover:bg-secondary-900   shadow-none group" onClick={() => handleCardClick(item.url)}>
                        <div className=' bg-white    p-xl rounded-md'>
                            <div className="flex justify-center items-center p-2.5 rounded-md ">
                                <span className="text-black p-2.5"> {/* Use valid Tailwind color */}
                                    {item.icon}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                                <p className="text-f-xl font-semibold text-center text-black ">
                                    {item.title}
                                </p>
                                <p className="text-sm text-center text-wrap text-gray-600  ">
                                    {item.description}
                                </p>
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;