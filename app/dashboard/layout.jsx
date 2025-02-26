'use client'
import Header from '@/components/Common/Header'
import SideNav from '@/components/Common/SideNav'
import { useRouter } from 'next/navigation'
import React from 'react'

const layout = ({ children }) => {
    const router = useRouter()
    const routeHandler = (path) => {
        router.push(path)
    }
    return (
        <div>
            <Header />
            <SideNav routeHandler={routeHandler} />
            <div className='pl-6xl bg-white'>
                {children}
            </div>
        </div>
    )
}

export default layout