import React, { useEffect, useState } from 'react'
import { TbTag } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { LuCalendarRange } from "react-icons/lu";
import { IoEarthOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import { PiPolygonFill } from "react-icons/pi";
import clsx from 'clsx';
import Select from "react-select";
import DatePicker from 'react-datepicker';
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';

const style = {
    control: (provided) => ({
        ...provided,
        minHeight: 'unset',
        height: 'auto',
        padding: "2px",
        margin: 0,
        border: '1px solid #bfbfbf',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        color: '#bfbfbf',
        borderRadius: '8px'
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999, // Ensures dropdown appears above everything
        backgroundColor: '#ffffff', // Matches parent container background
        borderRadius: '8px',
        border: '1px solid #bfbfbf',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '4px',
        color: '#000',
        fontSize: '12px'
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999, // Ensures dropdown appears on top
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '2px',
        margin: 0,
        color: '#bfbfbf', // Matches text color
        borderRadius: '8px'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        padding: '5px',
        color: '#bfbfbf',
        borderRadius: '8px',

    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0px',
        margin: 0,
        color: '#bfbfbf',
        borderRadius: '8px',
        fontSize: '12px',

    }),
    singleValue: (provided) => ({
        ...provided,
        paddingLeft: '4px',
        margin: 0,
        borderRadius: '8px',

    }),
}

const valueType = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" }
];

const intervals = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" }
];

const operators = [
    { value: "=", label: "equals (=)" },
    { value: "!=", label: "not equals (!=)" },
    { value: ">", label: "greater than (>)" },
    { value: ">=", label: "greater than or equal (>=)" },
    { value: "<", label: "less than (<)" },
    { value: "<=", label: "less than or equal (<=)" },
    { value: "in", label: "in array" },
    { value: "not_in", label: "not in array" },
    { value: "exists", label: "exists" },
    { value: "regex", label: "regex match" }
];

const QueryFilter = ({ setShowFilter, setShowGeo, setPropertyNameList, setPropertyList, getData }) => {
    const [eventNameList, setEventNameList] = useState([])
    const [eventList, setEventList] = useState([])
    const [openEventType, setOpenEventType] = useState(false);
    const [openDateRange, setOpenDateRange] = useState(false);
    const [openInterval, setOpenInterval] = useState(false);
    const [openGeoFilter, setOpenGeoFilter] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [selectedValueOption, setSelectedValueOption] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [showStartDate, setShowStartDate] = useState(false);
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showEndDate, setShowEndDate] = useState(false);
    const [endDateValue, setEndDateValue] = useState(null);
    const [selectedInterval, setSelectedInterval] = useState("monthly");

    useEffect(() => {
        getData((prev) => ({ ...prev, 'interval': 'monthly' }))

        getEventHandler();
    }, [])


    const getEventHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.CustomEvent.CustomEvents);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            // setCatalogList(response?.data)
            // console.log("getEventHandler", response.data)
            const data = response.data.customEventTypes.map((event) => {
                return { value: event.name, label: event.name }
            })
            console.log("getEventHandler", data)
            setEventList(response.data.customEventTypes)
            setEventNameList(data)
            setSelectedValueOption(data[0].value)
            propertyListHandler(data[0].value, response.data.customEventTypes)
            getData((prev) => ({ ...prev, 'eventType': data[0].value }))
            // setCustomEventTypes(response.data.customEventTypes)
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    };

    const dateTimeConverter = (data) => {
        const date = new Date(data);
        const isoDate = date.toISOString();
        return isoDate;
    }

    const propertyListHandler = (eventName, list) => {

        const selectedEvent = list.filter((event) => { return event.name == eventName })
        console.log(selectedEvent)
        const propertyName = selectedEvent[0].properties.map((property) => {
            return { value: property.key, label: property.key }
        })

        setPropertyNameList(propertyName)
        setPropertyList(selectedEvent[0].properties)

        console.log("propertyListHandler", propertyName, selectedEvent[0].properties)
    }

    return (
        <div className='filter h-[calc(100%-50px)] overflow-scroll hide-scrollbar '>
            {/* EVENT TYPE */}
            <div className='p-xs border mt-m mx-s rounded-bs'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => { setOpenEventType(prev => !prev) }}>
                    <div className='flex items-center gap-xs py-xs'>
                        <TbTag />
                        <div className='text-f-m'>Event Type</div>
                    </div>
                    <MdKeyboardArrowDown />
                </div>
                <div
                    className={clsx(
                        " transition-all duration-500 ease-in-out overflow-hidden ",
                        openEventType ? "max-h-[1000px] " : "max-h-0"
                    )}
                >
                    <div className='p-s'>
                        <div className='font-semibold'>Event Type</div>
                        <div className='text-f-s'>
                            Select the type of event you want to query or enter a custom event type.
                        </div>
                        <div className='text-f-s mt-xs font-semibold'>Custom Event Type</div>
                        {eventNameList.length > 0 && <div className='mt-s '>
                            <Select
                                options={eventNameList}
                                value={eventNameList.find(option => option.value === selectedValueOption)}
                                onChange={(selected) => {
                                    setSelectedValueOption(selected.value);
                                    propertyListHandler(selected.value, eventList)
                                    getData((prev) => ({ ...prev, 'eventType': selected.value }))
                                }}
                                menuPortalTarget={document.body} // Moves dropdown outside of parent to prevent clipping
                                menuPosition="fixed" // Ensures the dropdown stays visible
                                isSearchable={false}
                                className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black !text-f-s z-30"
                                styles={style}
                            />

                        </div>}

                    </div>
                </div>
            </div>
            {/* DATE RANGE */}
            <div className='p-xs border mt-m mx-s rounded-bs'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => {
                    setOpenDateRange(prev => !prev);
                    setTimeout(() => {
                        setShowEndDate(false);
                        setShowStartDate(false);
                    }, 300)


                }}>
                    <div className='flex items-center gap-xs py-xs'>
                        <LuCalendarRange />

                        <div className='text-f-m'>Date Range</div>
                    </div>
                    <MdKeyboardArrowDown />
                </div>
                <div
                    className={clsx(
                        " transition-all duration-500 ease-in-out overflow-hidden ",
                        openDateRange ? "max-h-[1000px] " : "max-h-0"
                    )}
                >
                    <div className='p-s relative'>
                        <div className='font-semibold'>Date Range</div>
                        <div className='text-f-s'>
                            Select the start and end dates for your query.
                        </div>
                        <div className='flex justify-center items-center gap-s mt-s'>
                            <div className='flex flex-col flex-1'>
                                <div className='text-f-s font-semibold text-black'>Start Date</div>
                                <button className={clsx('flex justify-between items-center  p-s border rounded-bs mt-xs flex-1', showStartDate ? "border-secondary-900" : 'border-neutral-200')}
                                    onClick={() => {
                                        setShowStartDate(true)
                                        setShowEndDate(false)
                                    }}>
                                    <div className='text-f-s'>
                                        {startDateValue ? startDateValue : 'Start Date'}
                                    </div>
                                    <LuCalendarRange />
                                </button>
                            </div>

                            <div className='flex flex-col flex-1'>
                                <div className='text-f-s font-semibold text-black'>End Date</div>
                                <div className={clsx('flex justify-between items-center  p-s border rounded-bs mt-xs flex-1', showEndDate ? "border-secondary-900" : 'border-neutral-200')}
                                    onClick={() => {
                                        setShowEndDate(true);
                                        setShowStartDate(false)
                                    }}>
                                    <div className='text-f-s'>
                                        {endDateValue ? endDateValue : 'End Date'}
                                    </div>
                                    <LuCalendarRange />
                                </div>
                            </div>
                        </div>

                        {showStartDate && (
                            <div className="flex justify-center mt-s">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        const formattedDate = date.toLocaleDateString("en-GB");
                                        setStartDateValue(formattedDate);
                                        setStartDate(date);
                                        getData((prev) => ({ ...prev, 'startDate': dateTimeConverter(date) }))
                                    }}
                                    maxDate={endDate} // Prevents picking a start date after end date
                                    dateFormat="dd/MM/yyyy"
                                    className="border w-full transform text-f-m rounded-md p-2 border-effect bg-white focus:border"
                                    placeholderText="Start date"
                                    inline
                                />
                            </div>
                        )}

                        {showEndDate && (
                            <div className="flex justify-center mt-s">
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => {
                                        const formattedDate = date.toLocaleDateString("en-GB");
                                        console.log("showEndDate", date, formattedDate)
                                        setEndDateValue(formattedDate);
                                        setEndDate(date);
                                        getData((prev) => ({ ...prev, 'endDate': dateTimeConverter(date) }))
                                    }}
                                    minDate={startDate ? new Date(startDate.getTime() + 86400000) : null} // Ensures end date is after start date
                                    dateFormat="dd/MM/yyyy"
                                    className="border w-full transform text-f-m rounded-md p-2 border-effect bg-white focus:border"
                                    placeholderText="End date"
                                    inline
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* INTERVAL START */}
            <div className='p-xs border mt-m mx-s rounded-bs'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => { setOpenInterval(prev => !prev) }}>
                    <div className='flex items-center gap-xs py-xs'>
                        <MdOutlineDateRange />
                        <div className='text-f-m'>Interval</div>
                    </div>
                    <MdKeyboardArrowDown />
                </div>
                <div
                    className={clsx(
                        " transition-all duration-500 ease-in-out overflow-hidden ",
                        openInterval ? "max-h-[1000px] " : "max-h-0"
                    )}
                >
                    <div className='p-s'>
                        <div className='font-semibold'>Time Interval</div>
                        <div className='text-f-s'>
                            Select the time interval for aggregating your data.
                        </div>
                        <div className="mt-s flex flex-col gap-2">
                            {intervals.map((interval) => (
                                <label key={interval.value} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="timeInterval"
                                        value={interval.value}
                                        checked={selectedInterval === interval.value}
                                        onChange={() => {
                                            setSelectedInterval(interval.value)
                                            getData((prev) => ({ ...prev, 'interval': interval.value }))
                                        }}
                                        className="form-radio w-4 h-4 text-secondary-900 "
                                    />
                                    <span className="text-f-m">{interval.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* GEO MAP */}
            <div className='p-xs border mt-m mx-s rounded-bs'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => { setOpenGeoFilter(prev => !prev) }}>
                    <button className='flex items-center gap-xs py-xs' >
                        <IoEarthOutline />
                        <div className='text-f-m'>Geographic Filter</div>
                    </button>
                    <MdKeyboardArrowDown />
                </div>
                <div
                    className={clsx(
                        " transition-all duration-500 ease-in-out overflow-hidden ",
                        openGeoFilter ? "max-h-[1000px] " : "max-h-0"
                    )}
                >
                    <div className='p-s'>
                        <div className='font-semibold'>Geographic Filter</div>
                        <div className='text-f-s'>
                            Choose a geographic area to filter your analytics data.
                        </div>
                        <button className='border w-full p-s mt-s rounded-bs text-f-s flex justify-center items-center bg-neutral-200 h-10xl border-neutral-600 border-dashed' onClick={setShowGeo}>
                            <div className='relative flex items-center justify-center text-neutral-900 gap-s'>
                                <PiPolygonFill className=' w-xl h-xl' />
                                <div>
                                    Select an area on the map.
                                </div>
                            </div>

                        </button>
                    </div>
                </div>
            </div>
            {/* FILTERS */}
            <div className='p-xs border mt-m mx-s rounded-bs relative'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => { setOpenFilters(prev => !prev) }}>
                    <div className='flex items-center gap-xs py-xs'>
                        <MdFilterList />
                        <div className='text-f-m'>Filters</div>
                    </div>
                    <MdKeyboardArrowDown />
                </div>
                <div
                    className={clsx(
                        " transition-all duration-500 ease-in-out overflow-hidden ",
                        openFilters ? "max-h-[1000px] " : "max-h-0"
                    )}
                >
                    <div className='p-s'>
                        <div className='font-semibold'>Custom Filters</div>
                        <div className='text-f-s'>
                            Add custom filters to refine your query results.
                        </div>


                        {/* Add Filter Button */}
                        <button onClick={setShowFilter} className="mt-s default-button py-s">
                            + Add Filter
                        </button>
                    </div>
                </div>

            </div>
            {/* <div className='fixed top-0 left-0 inset-0 bg-black z-50 bg-opacity-50 flex items-center justify-center'> */}

            {/* </div> */}
        </div>
    )
}

export default QueryFilter