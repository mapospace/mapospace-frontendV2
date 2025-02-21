import clsx from 'clsx';
import React from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";

const InfoToast = ({ info, top, right, popAlign = true }) => {
    return (
        <div className={`absolute  top-${top} right-${right} cursor-pointer`}>
            <div className='relative w-l h-l group' >
                <IoMdInformationCircleOutline />
                <div className={clsx('hidden w-[150px] text-f-xs p-s  max-h-10xl  bg-black bg-opacity-60 text-white rounded-lg  absolute z-30 bottom-5 group-hover:block transition-all duration-500 ease-linear', popAlign ? ' left-2' : ' right-2')}>
                    {info}
                </div>
            </div>
        </div>
    )
}

export default InfoToast