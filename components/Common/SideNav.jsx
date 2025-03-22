'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { GoHomeFill } from 'react-icons/go';
import { BsFillBarChartLineFill } from 'react-icons/bs';
import { MdOutlineViewInAr, MdPreview, MdDashboardCustomize } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
import clsx from 'clsx';
import { motion } from 'framer-motion';


const navItems = [
  { path: '/dashboard', icon: GoHomeFill, label: 'Home' },
  { path: '/dashboard/sales?category=total_sale', icon: BsFillBarChartLineFill, label: 'Sale' },
  { path: '/dashboard/views?type=total_view', icon: MdPreview, label: 'View' },
  { path: '/dashboard/scat', icon: MdOutlineViewInAr, label: 'CSAT' },
  { path: '/dashboard/create-event?event=dashboard', icon: MdDashboardCustomize, label: 'Event' },
];

const SideNav = ({ routeHandler }) => {
  const pathname = usePathname();
  //const router = useRouter();

  const isActive = (path) => pathname === path || pathname.includes(path.split('?')[0]);

  return (
    <div className="fixed left-0 top-0 h-screen z-10 flex bg-white">
      <div className="h-full w-[60px] p-s flex flex-col items-center border-r border-gray-300 justify-between pt-6xl bg-white">
        {/* Top Nav Group */}
        <div>
          {navItems.map(({ path, icon: Icon, label }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => routeHandler(path)}
              className="relative flex flex-col items-center justify-center py-m group cursor-pointer"
            >
              <Icon
                className={clsx(
                  'w-6 h-6 transition-colors duration-300',
                  isActive(path) ? 'text-secondary-900' : 'text-gray-400 group-hover:text-secondary-900'
                )}
              />
              <p className="text-f-xs mt-xs text-gray-600">{label}</p>
              {isActive(path) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute left-10 w-1.5 h-6 bg-secondary-900 rounded-full"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Settings Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => routeHandler('/profile')}
          className="relative flex flex-col items-center justify-center py-m cursor-pointer"
        >
          <IoSettings
            className={clsx(
              'w-6 h-6 transition-colors duration-300',
              pathname.includes('/profile') ? 'text-secondary-900' : 'text-gray-400 hover:text-secondary-900'
            )}
          />
          <p className="text-f-xs mt-xs text-gray-600">Setting</p>
          {pathname.includes('/profile') && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute left-10 w-1.5 h-6 bg-secondary-900 rounded-full"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SideNav;
