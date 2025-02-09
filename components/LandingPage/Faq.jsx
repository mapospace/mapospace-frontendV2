import React from 'react';
import DropDown from './DropDown';


const Faq = () => {
    return (
        <div className='text-black max-w-7xl mx-auto px-10 my-24' >
            <div className='text-[48px] font-semibold'>FAQ</div>
            <div className='flex flex-col gap-4 mt-12 lg:flex-row'>
                <div className='flex flex-col gap-4 flex-1'>
                    <DropDown />
                    <DropDown />
                    <DropDown />
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <DropDown />
                    <DropDown />
                    <DropDown />
                </div>
            </div>

        </div>
    )
}

export default Faq


