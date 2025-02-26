'use client'
import React from 'react';
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({ menuItems }) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <>
            <div className="hidden sc-sm:flex flex-col border-r border-neutral-200 pr-4">
                <div className="flex flex-col w-[200px] gap-xl py-6 items-end">
                    {menuItems?.map((item, index) => (
                        <div key={index} className="flex items-center gap-8">
                            <div className="flex flex-col items-end gap-1">
                                <p className="text-f-s text-center uppercase text-neutral-1000 cursor-pointer" >
                                    {item.title}
                                </p>
                                <div className="text-f-m text-right text-neutral-1200">
                                    {item.items.map((subItem, subIndex) => (
                                        <div key={subIndex} onClick={(e) => {
                                            router.push(subItem?.url);
                                        }} className={`cursor-pointer hover:text-secondary-900 ${pathname === subItem.url ? 'text-secondary-900' : 'text-gray-400'
                                            }`}>
                                            {subItem.title}
                                            {subIndex < item.items.length - 1 && <br />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-neutral-200">
                <div className="sc-sm:hidden grid sc-xs:grid-cols-3 grid-cols-2 w-full gap-xl items-start">
                    {menuItems?.map((item, index) => (
                        <div key={index}
                            className="flex flex-col min-h-[80px] items-start gap-1 sc-xs:[&:nth-child(3n+2)]:border-x-2 sc-xs:[&:nth-child(3n+2)]:border-neutral-200 sc-xs:[&:nth-child(3n+2)]:px-4">
                            <p className="text-xs uppercase text-neutral-1000">
                                {item.title}
                            </p>
                            <div className="text-sm  text-neutral-1200">
                                {item.items.map((subItem, subIndex) => (
                                    <div key={subIndex} onClick={(e) => {
                                        router.push(subItem?.url);
                                    }} className={`cursor-pointer hover:text-purple-500 ${pathname === subItem.url ? 'text-purple-800' : 'text-neutral-900'
                                        }`}>
                                        {subItem.label}
                                        {subIndex < item.items.length - 1 && <br />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>


    );
};

export default Sidebar;