import Cards from '@/components/Common/cards'
import Sidebar from '@/components/Common/sidebar'
import { sidebarMenuItems } from '@/constant/SidebarData';
import React from 'react'


const page = () => {

    return (
        // <div className="flex flex-col w-full justify-center mx-auto max-w-screen-sc-2xl  mt-10xl">
        //     <div className="sc-sm:flex-row flex flex-col gap-6 p-6">
        //         <Sidebar menuItems={sidebarMenuItems} />
        <Cards menuItems={sidebarMenuItems} title="Profile" />
        //     </div>
        // </div>
    )
}

export default page