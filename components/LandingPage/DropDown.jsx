'use client'
import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

const DropDown = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className=' flex-1 bg-neutral-100 p-6 rounded-xl border border-neutral-300  '>
            <div className='flex justify-between items-center' onClick={() => setOpen((prev) => !prev)}>
                <div className='text-xl font-medium'>Is ToDesktop For Me?</div>
                {open ? <RiArrowDropUpLine className='w-10 h-10' /> : <RiArrowDropDownLine className='w-10 h-10' />}
            </div>
            {open && <p className='text-lg mt-4 max-'>That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.</p>}
        </div>
    )
}

export default DropDown;