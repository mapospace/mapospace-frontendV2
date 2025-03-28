'use client';

import { useEffect, useRef, useState } from "react";
import AuthServices from "@/utils/axios-api";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MapContainer from "@/components/Maps/MapContainer";
import clsx from "clsx";
import toCapitalizedCase from "@/utils/capitalized-case";
import EventManager from "@/components/CreateEvent/EventManager";
import Dashboard from "@/components/CreateEvent/Dashboard";
import QueryBuilderSideNav from "@/components/CreateEvent/QueryBuilderSideNav";
import QueryEvents from "@/components/CreateEvent/QueryEvents";
import FunnelAnalysis from "@/components/CreateEvent/FunnelAnalysis";
import Segmentation from "@/components/CreateEvent/Segmentation";
import Retention from "@/components/CreateEvent/Retention";
import AIGeneration from "@/components/CreateEvent/AIGeneration";
import AnalyticsSkeleton from "@/components/CreateEvent/AnalyticsSkeleton";
import generateCustomDateRanges from "@/utils/generate-custom-date-ranges";
import DatePicker from 'react-datepicker';




const page = () => {
    const [catalogList, setCatalogList] = useState([]);
    const [openQuery, setOpenQuery] = useState(false);
    const datePickerRef = useRef(null);
    const searchParams = useSearchParams();
    const currentEventType = searchParams.get("event");
    const router = useRouter();
    const [queryData, setQueryData] = useState(null);
    const [queryFunnelData, setQueryFunnelData] = useState(null);
    const [querySegmentsData, setQuerySegmentsData] = useState(null);
    const [queryRetentionData, setQueryRetentionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ranges, SetRanges] = useState([])
    const [currentRange, setCurrentRange] = useState(null);
    const [showCustom, setShowCustom] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowCustom(false);
            }
        }

        if (showCustom) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCustom]);


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
        const Ranges = generateCustomDateRanges();
        console.log("Ranges", Ranges)
        SetRanges(Ranges);
        setCurrentRange(Ranges[Ranges.length - 1])
    }, [])


    useEffect(() => {
        if (currentRange != null && currentRange.id != 10) {
            console.log("currentRange", currentRange)
            let newData = { "startDate": currentRange.startDate, "endDate": currentRange.endDate };
            console.log("currentRange custom event ", newData)
            setSelectedRange(newData)
        }

    }, [currentRange])

    const selectedRangeHandler = (data) => {
        if (data.id == 10) {
            setShowCustom(true)
        }
        else {
            setShowCustom(false)
            setStartDate(null);
            setEndDate(null);
        }
        setCurrentRange(data)

    }


    const chnageRouteHandler = (endpoint) => {
        router.push(endpoint);
    }

    return (
        <div className={clsx("  max-h-screen pt-6xl flex overflow-hidden bg-white")} >
            {currentEventType != "dashboard" && currentEventType != "event-manager" && currentEventType != "lumo" && <QueryBuilderSideNav setQueryData={setQueryData} setQueryFunnelData={setQueryFunnelData} setQuerySegmentsData={setQuerySegmentsData} setQueryRetentionData={setQueryRetentionData} openQuery={openQuery} setOpenQuery={setOpenQuery} setActiveLoading={setLoading} />}
            <div className="flex-1 pt-xl px-l overflow-y-scroll ">
                <div className=' flex justify-start  items-end '>
                    {/* <div className='text-neutral-1300 font-semibold text-2xl'>{toCapitalizedCase(currentEventType?.replace("-", " "))}</div> */}
                    <div className={clsx('flex  rounded-l-bs p-xs text-f-m font-normal gap-xs relative h-[38px] bg-neutral-300 text-black')}>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-white rounded-bs hover:text-black", currentEventType == "dashboard" && 'bg-white hover:bg-white')}
                            onClick={() => {
                                chnageRouteHandler('/dashboard/create-event?event=dashboard');
                                setLoading(false);
                            }}
                        >
                            Dashboard
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-white rounded-bs hover:text-black ", currentEventType == "events" && 'bg-white hover:bg-white')}
                            onClick={() => {
                                chnageRouteHandler('/dashboard/create-event?event=events');
                                setLoading(false);
                            }}
                        >
                            Events
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-white rounded-bs hover:text-black", currentEventType == "funnels" && 'bg-white hover:bg-white')}
                            onClick={() => {
                                chnageRouteHandler('/dashboard/create-event?event=funnels');
                                setLoading(false);
                            }}
                        >
                            Funnels
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-white rounded-bs hover:text-black", currentEventType == "retention" && 'bg-white hover:bg-white')}
                            onClick={() => {
                                chnageRouteHandler('/dashboard/create-event?event=retention');
                                setLoading(false);
                            }}
                        >
                            Retention
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-white rounded-bs hover:text-black ", currentEventType == "segmentation" && 'bg-white hover:bg-white')}
                            onClick={() => {
                                chnageRouteHandler('/dashboard/create-event?event=segmentation');
                                setLoading(false);
                            }}
                        >
                            Segmentation
                        </div>
                        <div
                            className={clsx("px-s py-xs cursor-pointer hover:bg-white rounded-bs  hover:text-black", currentEventType == "event-manager" && 'bg-white hover:bg-white')}
                            onClick={() => {
                                chnageRouteHandler('/dashboard/create-event?event=event-manager');
                                setLoading(false);
                            }}
                        >
                            Event Manager
                        </div>


                    </div>
                    <div className={clsx('flex rounded-r-bs p-xs text-f-m font-normal gap-xs relative h-[38px] bg-neutral-300 ')} >

                        <button className={clsx("ai_button", currentEventType == "lumo" && 'before:bg-gradient-to-b before:from-secondary-700 before:to-secondary-900')} onClick={() => {
                            chnageRouteHandler('/dashboard/create-event?event=lumo')
                            setLoading(false);
                        }} >
                            <div className="dots_border"></div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="sparkle"
                            >
                                <path
                                    className="path"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    stroke="black"
                                    fill="black"
                                    d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                                ></path>
                                <path
                                    className="path"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    stroke="black"
                                    fill="black"
                                    d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                                ></path>
                                <path
                                    className="path"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    stroke="black"
                                    fill="black"
                                    d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                                ></path>
                            </svg>
                            <span className="text_button font-bold">Lumo AI </span>
                        </button>
                        {/* </div> */}
                    </div>

                </div>
                <div className=' flex  flex-1 flex-col  gap-s mt-s  '>
                    <div className='flex gap-s '>
                        <div className='flex'>
                            <div className='flex bg-neutral-200 rounded-bs p-xs text-f-m font-normal gap-xs relative '>
                                <div className={`px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black ${currentRange && 10 == currentRange.id && 'bg-white hover:bg-white'} `} onClick={() => { selectedRangeHandler({ id: 10 }) }} >Custom</div>
                                {ranges.length > 0 && ranges.map((range) => (
                                    <div className={`px-s py-xs cursor-pointer hover:bg-neutral-300 rounded-bs text-black  ${range.id == currentRange.id && 'bg-white hover:bg-white'}`} key={range.id} onClick={() => { selectedRangeHandler(range) }}>{range.title}</div>
                                ))}
                                {showCustom && <div ref={datePickerRef} className='absolute bg-white border z-40 left-0 top-12 rounded-bs flex flex-col items-start p-s gap-s'>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='text-neutral-1200 font-semibold'> {startDate == null ? 'Start Date' : 'End Date'}</div>

                                        <div className='text-secondary-900 cursor-pointer' onClick={() => {
                                            setStartDate(null);
                                            setEndDate(null);
                                        }}>
                                            Reset</div>
                                    </div>

                                    {startDate == null ? <div className=" custom-datepicker">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className="border  text-f-m  rounded-md p-2 w-full border-effect bg-white focus:border"
                                            placeholderText="Start date and time"
                                            popperPlacement="bottom-start"
                                            inline
                                        />
                                    </div> : <div className="custom-datepicker">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className="border text-f-m rounded-md p-2 w-full border-effect"
                                            placeholderText="End date and time"
                                            popperPlacement="bottom-end"
                                            inline
                                        />
                                    </div>

                                    }


                                </div>}
                            </div>
                        </div>

                    </div>
                </div>
                {loading && <AnalyticsSkeleton />}

                {currentEventType == "dashboard" && <Dashboard />}
                {currentEventType == "events" && <QueryEvents queryData={queryData} setOpenQuery={setOpenQuery} setLoading={setLoading} selectedRange={selectedRange} />}
                {currentEventType == "event-manager" && <EventManager />}
                {currentEventType == "funnels" && <FunnelAnalysis queryFunnelData={queryFunnelData} setOpenQuery={setOpenQuery} setLoading={setLoading} selectedRange={selectedRange} />}
                {currentEventType == "segmentation" && <Segmentation querySegmentsData={querySegmentsData} setOpenQuery={setOpenQuery} setLoading={setLoading} selectedRange={selectedRange} />}
                {currentEventType == "retention" && <Retention queryRetentionData={queryRetentionData} setOpenQuery={setOpenQuery} setLoading={setLoading} selectedRange={selectedRange} />}
                {currentEventType == "lumo" && <AIGeneration />}

            </div>

        </div >
    );
};

export default page;
