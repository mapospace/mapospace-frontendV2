'use client'
import Header from '@/components/Common/Header'
import Sidebar from '@/components/Common/sidebar'
import SideNav from '@/components/Common/SideNav'
import { sidebarMenuItems } from '@/constant/SidebarData'
import { useRouter } from 'next/navigation'
import React from 'react'

const layout = ({ children }) => {
    const router = useRouter()
    const routeHandler = (path) => {
        router.push(path)
    }
    return (
        <div className=''>
            <Header />
            <SideNav routeHandler={routeHandler} />
            <div className="flex flex-col w-full justify-start mx-auto max-w-screen-sc-2xl   ">
                <div className="sc-sm:flex-row flex flex-col gap-6 p-6 mt-6xl">
                    <Sidebar menuItems={sidebarMenuItems} />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout