'use client'
import Cards from '@/components/Common/cards'
import Sidebar from '@/components/Common/sidebar'
import { sidebarMenuItems } from '@/constant/SidebarData'
import React, { useEffect, useState } from 'react'

const Management = () => {

    const sideBarData = sidebarMenuItems.filter((data) => data.title == "Management");

    return (
        <Cards menuItems={sideBarData[0].items} title="Management" />
    )
}

export default Management