import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { MdOutlineViewInAr, MdPreview, MdDashboardCustomize } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const SideNav = ({ routeHandler }) => {
  const param = usePathname();

  return (
    <div className="fixed left-0 top-0 z-10 h-screen flex bg-white shadow-xl backdrop-blur-md animate-[fadeInSlide_0.5s_ease-out]">
      <div className="h-full w-[60px] p-s flex flex-col items-center border-r border-neutral-300 bg-white justify-between pt-6xl rounded-tr-xl rounded-br-xl">
        <div>
          {/* Home */}
          <div
            className="relative flex flex-col items-center justify-center py-m border-b border-neutral-300 group cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-[#f3e8ff] hover:to-[#f0f4ff] rounded-lg"
            onClick={() => routeHandler('/dashboard')}
          >
            <GoHomeFill
              className={clsx(
                'w-7 h-7 text-gray-400 transition-all duration-300 group-hover:scale-[1.15] group-hover:drop-shadow-[0_0_8px_rgba(128,90,213,0.3)]',
                param === "/dashboard" && "text-secondary-900"
              )}
            />
            <p className="text-f-xs text-gray-600 mt-xs group-hover:text-secondary-800 transition-all duration-300">Home</p>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col items-center justify-center border-b border-neutral-300">
            <SidebarItem
              icon={BsFillBarChartLineFill}
              label="Sale"
              path="/dashboard/sales"
              param={param}
              onClick={() => routeHandler('/dashboard/sales?category=total_sale')}
            />
            <SidebarItem
              icon={MdPreview}
              label="View"
              path="/dashboard/views"
              param={param}
              onClick={() => routeHandler('/dashboard/views?type=total_view')}
            />
            <SidebarItem
              icon={MdOutlineViewInAr}
              label="CSAT"
              path="/dashboard/scat"
              param={param}
              onClick={() => routeHandler('/dashboard/scat')}
            />
            <SidebarItem
              icon={MdDashboardCustomize}
              label="Event"
              path="/dashboard/create-event"
              param={param}
              onClick={() => routeHandler('/dashboard/create-event?event=dashboard')}
            />
          </div>
        </div>

        {/* Settings */}
        <SidebarItem
          icon={IoSettings}
          label="Setting"
          path="/profile"
          param={param}
          onClick={() => routeHandler('/profile')}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, path, param, onClick }) => (
  <div
    className="relative flex flex-col items-center justify-center py-m group cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-[#f1f2f7] hover:to-[#e6e7f3] rounded-lg"
    onClick={onClick}
  >
    <Icon
      className={clsx(
        'w-7 h-7 text-gray-400 transition-all duration-300 group-hover:scale-[1.15] group-hover:drop-shadow-[0_0_8px_rgba(128,90,213,0.3)]',
        param.includes(path) && "text-secondary-900"
      )}
    />
    <p className="text-f-xs mt-xs text-gray-600 group-hover:text-secondary-800 transition-all duration-300">{label}</p>
  </div>
);

export default SideNav;
