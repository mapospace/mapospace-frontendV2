import Cards from '@/components/Common/cards'
import Sidebar from '@/components/Common/sidebar'
import { sidebarMenuItems } from '@/constant/SidebarData';
import React from 'react'


const page = () => {

    return (
        <Cards menuItems={sidebarMenuItems} title="Profile" />
    )
}

export default page