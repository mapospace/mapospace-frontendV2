'use client';

import { useEffect, useState } from "react";
import AuthServices from "@/utils/axios-api";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MapContainer from "@/components/Maps/MapContainer";
import clsx from "clsx";
import toCapitalizedCase from "@/utils/capitalized-case";
import EventManager from "@/components/CreateEvent/EventManager";
import QueryBuilderSideNav from "@/components/CreateEvent/QueryBuilderSideNav";



const Dashboard = () => {
    const [catalogList, setCatalogList] = useState([]);


    const searchParams = useSearchParams();
    const currentEventType = searchParams.get("event");
    const router = useRouter()

    const fetchCatalogsList = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.Catalogs);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            setCatalogList(response?.data)
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    };

    useEffect(() => {
        fetchCatalogsList();

    }, [])



    const chnageRouteHandler = (endpoint) => {
        router.push(endpoint);
    }

    return (
        <div className=" bg-white max-h-screen pt-6xl flex overflow-hidden" >
            <QueryBuilderSideNav />
            <div className="flex-1 pt-xl px-l overflow-y-scroll ">
                <div className=' flex justify-between  items-end '>
                    {/* <div className='text-neutral-1300 font-semibold text-2xl'>{toCapitalizedCase(currentEventType?.replace("-", " "))}</div> */}
                    <div className='flex bg-neutral-200 rounded-bs p-xs text-f-m font-normal gap-xs relative '>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black", currentEventType == "dashboard" && 'bg-white hover:bg-white')}
                            onClick={() => { chnageRouteHandler('/dashboard/create-event?event=dashboard') }}
                        >
                            Dashboard
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black", currentEventType == "events" && 'bg-white hover:bg-white')}
                            onClick={() => { chnageRouteHandler('/dashboard/create-event?event=events') }}
                        >
                            Events
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black", currentEventType == "funnels" && 'bg-white hover:bg-white')}
                            onClick={() => { chnageRouteHandler('/dashboard/create-event?event=funnels') }}
                        >
                            Funnels
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black", currentEventType == "retention" && 'bg-white hover:bg-white')}
                            onClick={() => { chnageRouteHandler('/dashboard/create-event?event=retention') }}
                        >
                            Retention
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black", currentEventType == "segmentation" && 'bg-white hover:bg-white')}
                            onClick={() => { chnageRouteHandler('/dashboard/create-event?event=segmentation') }}
                        >
                            Segmentation
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black", currentEventType == "event-manager" && 'bg-white hover:bg-white')}
                            onClick={() => { chnageRouteHandler('/dashboard/create-event?event=event-manager') }}
                        >
                            Event Manager
                        </div>

                    </div>
                </div>
                {currentEventType == "event-manager" && <EventManager />}
            </div>

        </div >
    );
};

export default Dashboard;
