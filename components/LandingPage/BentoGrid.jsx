import React from 'react'
import Notifications from '../../public/assets/asset_28.png'
import Notifications2 from '../../public/assets/asset_29.png'
import Notifications3 from '../../public/assets/asset_30.png'
import Notifications4 from '../../public/assets/asset_31.png'
import Image from 'next/image'

const BentoGrid = () => {
    return (
        <div className='text-black max-w-7xl mx-auto px-10 my-32' >
            <div className='text-[48px] font-semibold'>ToDesktop handles the details</div>
            <div className='flex flex-col mt-24 gap-6 lg:grid lg:grid-cols-3' style={{ gridTemplateRows: "repeat(5, 96px)" }}>
                <div className='row-start-1 row-end-3 w-full p-[1px]  rounded-xl bg-neutral-200 hover:bg-gradient-to-br hover:from-red-400 group hover:via-purple-400 group hover:to-yellow-400 group'>
                    <div className='w-full h-full bg-neutral-100 rounded-xl flex justify-center items-center flex-col p-10 gap-6 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50'>
                        <h3 className='text-2xl font-medium'>Native Notifications</h3>
                        <Image src={Notifications} alt='Notifications' />
                    </div>
                </div>
                <div className='row-start-1 row-end-4 w-full p-[1px]  rounded-xl bg-neutral-200 hover:bg-gradient-to-br hover:from-red-400 group hover:via-purple-400 group hover:to-yellow-400 group'>
                    <div className='w-full h-full  bg-neutral-100 rounded-xl flex justify-center items-center flex-col p-10 gap-6 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50'>
                        <h3 className='text-2xl font-medium'>Native Notifications</h3>
                        <p className='text-center text-neutral-500'>We’ll ensure the underlying browser is up to date and deliver performance improvements, security patches, & additional features.</p>
                        <Image src={Notifications2} alt='Notifications' />
                    </div>
                </div>
                <div className='row-start-1 row-end-3 w-full p-[1px]  rounded-xl bg-neutral-200 hover:bg-gradient-to-br hover:from-red-400 group hover:via-purple-400 group hover:to-yellow-400 group'>
                    <div className='w-full h-full bg-neutral-100 rounded-xl flex justify-center items-center flex-col p-10 gap-6 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50'>
                        <h3 className='text-2xl font-medium'>Native Notifications</h3>
                        <Image src={Notifications3} alt='Notifications' />
                    </div>
                </div>
                <div className='row-start-3 row-end-6 w-full p-[1px]  rounded-xl bg-neutral-200 hover:bg-gradient-to-br hover:from-red-400 group hover:via-purple-400 group hover:to-yellow-400 group'>
                    <div className='w-full h-full bg-neutral-100 rounded-xl flex justify-center items-center flex-col p-10 gap-6 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50'>
                        <h3 className='text-2xl font-medium'>Native Notifications</h3>
                        <p className='text-center text-neutral-500'>We’ll ensure the underlying browser is up to date and deliver performance improvements, security patches, & additional features.</p>
                        <Image src={Notifications4} alt='Notifications' />
                    </div>
                </div>
                <div className='row-start-4 row-end-6 w-full p-[1px]  rounded-xl bg-neutral-200 hover:bg-gradient-to-br hover:from-red-400 group hover:via-purple-400 group hover:to-yellow-400 group'>
                    <div className='w-full h-full bg-neutral-100 rounded-xl flex justify-center items-center flex-col p-10 gap-6 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50'>
                        <h3 className='text-2xl font-medium'>Native Notifications</h3>
                        <Image src={Notifications} alt='Notifications' />
                    </div>
                </div>
                <div className='row-start-3 row-end-6 w-full p-[1px]  rounded-xl bg-neutral-200 hover:bg-gradient-to-br hover:from-red-400 group hover:via-purple-400 group hover:to-yellow-400 group'>
                    <div className='w-full h-full bg-neutral-100 rounded-xl flex justify-center items-center flex-col p-10 gap-6 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50'>
                        <h3 className='text-2xl font-medium'>Native Notifications</h3>
                        <p className='text-center text-neutral-500'>We’ll ensure the underlying browser is up to date and deliver performance improvements, security patches, & additional features.</p>
                        <Image src={Notifications2} alt='Notifications' />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default BentoGrid