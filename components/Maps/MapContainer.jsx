import React, { useEffect, useRef, useState } from 'react'
import Maps from './Maps'
import { IoCloseSharp } from "react-icons/io5";
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { customSuccess, customError } from '../Common/Toast';
import { ImSearch } from "react-icons/im";
import axios from 'axios';
import { PiPolygonFill } from "react-icons/pi";
import { GrLocationPin } from "react-icons/gr";
import { LuFilter } from "react-icons/lu";
import Filter from '../Common/Filter';
import clsx from 'clsx';
import { TbLocationSearch } from "react-icons/tb";
import { RiCloseFill } from "react-icons/ri";
import Skeleton from 'react-loading-skeleton'
import DatePicker from 'react-datepicker';
import { SlCalender } from "react-icons/sl";
import generateCustomDateRanges from '@/utils/generate-custom-date-ranges';
import { FiMap } from "react-icons/fi";

const MapContainer = ({ catalogList, setAppliedFilter, appliedFilter }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })
    const [error, setError] = useState({
        name: "",
        description: "",
    });

    const [saveFormVisible, setSaveFormVisible] = useState(false);
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [currentPolygon, setCurrentPolygon] = useState([]);
    const [polygonSaved, setPolygonSaved] = useState(false);
    const [onSearch, setOnSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [polygonData, setPolygonData] = useState([]);
    const [selfPolygonData, setSelfPolygonData] = useState([]);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [latlng, setLatLng] = useState({ lat: 28.7041, lng: 77.1025 })
    const [loading, setLoading] = useState(false);
    const [OpenSearchBar, setOpenSearchBar] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ranges, SetRanges] = useState([])
    const [currentRange, setCurrentRange] = useState(null);
    const [showCustom, setShowCustom] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const datePickerRef = useRef(null);

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


    useEffect(() => {
        const Ranges = generateCustomDateRanges();
        console.log("Ranges", Ranges)
        SetRanges(Ranges);
        setCurrentRange(Ranges[0])
    }, [])

    useEffect(() => {
        if (currentRange != null && currentRange.id != 10) {
            console.log("currentRange", currentRange)
            let newData = { "startDate": currentRange.startDate, "endDate": currentRange.endDate };
            setAppliedFilter(prev => ({
                ...(prev ?? {}),
                ...newData
            }));
        }

    }, [currentRange])

    useEffect(() => {
        if (polygonData.length > 0 || selfPolygonData.length > 0) {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
    }, [polygonData, selfPolygonData])


    useEffect(() => {
        if (startDate && endDate) {
            const startdateTime = startDate ? dateTimeConverter(startDate) : "";
            const endDateTime = endDate ? dateTimeConverter(endDate) : "";
            let newData = { "startDate": startdateTime, "endDate": endDateTime };
            setAppliedFilter(prev => ({
                ...(prev ?? {}),
                ...newData
            }));
        }
    }, [startDate, endDate])

    const dateTimeConverter = (data) => {
        const date = new Date(data);
        const isoDate = date.toISOString();
        return isoDate;
    }

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


    const ChangeHandler = (e) => {
        const { id, value } = e.target;
        let newErrors = { ...error };

        if (!value) {
            newErrors[id] = "This field is required";
        } else {
            delete newErrors.industry;
        }
        setFormData({ ...formData, [id]: value });
        setError(newErrors);
    };

    const resetHandler = () => {
        setFormData({
            name: "",
            description: "",
        })
        setError({
            name: "",
            description: "",
        })
        setCurrentPolygon([])
    }

    const isValidatedHandler = () => {
        let newErrors = {};
        let isValid = true;

        // Check if all fields have values
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        });
        setError(newErrors);

        return isValid;
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() != '') {
            setLoading(true)
            fetchDataFromNominatim();
            fetchGeoJSONDetails()
        }

    };

    const fetchDataFromNominatim = async () => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${search}&polygon_geojson=1&format=jsonv2`);

            const data = response.data.filter((item) => item.geojson.type === "Polygon")
            if (response.data.length > 0) {
                console.log("fetch data", response.data)
                setPolygonData(response.data);
                !searchResultVisible && setSearchResultVisible(true);
            }

        } catch (err) {
            console.error('Error fetching data:', err);
            setPolygonData([])
        }
    };

    const fetchGeoJSONDetails = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.GeoJson(search));

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("response?.data", response?.data.geojsonList)
            const newData = response?.data.geojsonList.map((geo) => {
                return {
                    "type": "mapospace",
                    "name": geo.name,
                    "display_name": geo.description,
                    "lat": geo.geojson.geometry.coordinates[0][0][1],
                    "lon": geo.geojson.geometry.coordinates[0][0][0],
                    "geojson": geo.geojson.geometry
                }
            })
            console.log(newData)
            setSelfPolygonData(newData)
            !searchResultVisible && setSearchResultVisible(true);

        } catch (err) {
            console.error("Error fetching user details:", err);
            setSelfPolygonData([])
        }
    };

    const saveHandler = async () => {
        if (isValidatedHandler) {
            setSaveFormVisible(false)
            const coordinates = currentPolygon.map((coordinate) => {
                return [coordinate.lng, coordinate.lat]
            })
            console.log(coordinates)
            const newformData = {
                ...formData,
                "geojson": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [coordinates]
                    },
                    "properties": {}
                }
            }

            try {
                const authService = new AuthServices();
                const response = await authService.postApiCallHandler(API_ENDPOINTS.PolygonSave, newformData);

                if (response?.error) {
                    console.log(response.message || "Failed to fetch data.");
                    return;
                }
                console.log("response?.data", response?.data);
                setPolygonSaved(true);
                resetHandler();
                customSuccess("Successfully Saved.");

            } catch (err) {
                console.error("Error fetching user details:", err);

            }

        }
    }

    const applyFilterHandler = (data) => {

        console.log("filter Updated by appliedFilter", data)
        setAppliedFilter(prev => ({ ...prev, ...data }))
    }

    const getPolygonCoordinates = (coordinates) => {
        const transformedData = coordinates.map(([lng, lat]) => ({ lat: lat, lng: lng }));
        console.log("transformedData", transformedData)
        setPolygonCoordinates(transformedData);
        if (transformedData.length > 0) {
            const coordinates = transformedData.map((coordinate) => {
                return [coordinate.lng, coordinate.lat]
            })

            const polyData = {
                "geojson": {
                    "type": "Polygon",
                    "coordinates": [coordinates]
                }
            }
            applyFilterHandler(polyData)
        }

    }

    const closeSearchHandler = () => {
        setOnSearch(false);
        setOpenSearchBar(false)
    }

    return (
        <div id='map-container' className='relative'>
            {/* <div cl */}
            <div className='flex flex-1 items-end '>
                <div className=' flex  flex-1 flex-col  gap-s'>
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
                <div className=' flex items-end justify-end gap-s'>
                    <button className='bg-neutral-200 text-f-m text-neutral-1200 rounded-md flex px-l py-s items-center ' onClick={() => { setShowFilter(prev => !prev) }}>
                        <LuFilter /> <span className='ml-s'>Filter</span>
                    </button>
                    <button className='bg-neutral-200 text-f-m text-neutral-1200 rounded-md flex px-l py-s items-center ' onClick={() => { setShowMap(prev => !prev) }}>
                        <FiMap /> <span className='ml-s'>Map</span>
                    </button>
                </div>

            </div>
            {showFilter && <Filter close={setShowFilter} catalogList={catalogList} applyFilterHandler={applyFilterHandler} appliedFilter={appliedFilter} />}
            <div className={`h-[100vh] relative rounded-md shadow-md ${showMap ? "block" : "hidden"}`}>
                {OpenSearchBar && <div className={'absolute z-30 w-full h-full'}>
                    <div className='relative w-full h-full gap-xl bg-black bg-opacity-40 flex justify-center items-center '>
                        <div className={clsx('absolute  w-[50%] flex flex-col focus:top-[10%] focus:bottom-0 rounded-lg transition-all duration-200 ease-linear', (!onSearch && polygonData.length == 0 && selfPolygonData == 0) ? "top-[40%]" : "top-[10%]")} onClick={() => { setOnSearch(true) }}>
                            <div className='flex flex-1  bg-white rounded-lg'>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="focus:outline-none p-l text-f-xl rounded-lg flex-1 border-0 text-black"
                                    placeholder="Search.."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoComplete='off'
                                />
                                <button className='text-secondary-900 py-xs px-xl flex items-center justify-center gap-s' onClick={handleSearch}>
                                    <ImSearch />
                                </button>
                            </div>
                            <div className='flex flex-col mt-s bg-white rounded-lg px-l py-l' >
                                <div className=' w-full  text-neutral-900'>
                                    Searching For
                                </div>
                                {polygonData.length > 0 || selfPolygonData.length > 0 ? <>
                                    {loading ? (
                                        <div className="w-full">
                                            {/* Skeleton for Global Searching Results */}
                                            <div className="w-full border-t-2 border-neutral-200 mt-m">
                                                <div className="w-full pt-l pb-m text-neutral-1100">
                                                    <Skeleton width={200} height={20} />
                                                </div>
                                                {[...Array(2)].map((_, index) => (
                                                    <Skeleton key={index} height={20} className="mb-2" />
                                                ))}
                                            </div>

                                            {/* Skeleton for Saved Polygons Results */}
                                            <div className="w-full border-t-2 border-neutral-200 mt-m">
                                                <div className="w-full pt-l pb-m text-neutral-1100">
                                                    <Skeleton width={200} height={20} />
                                                </div>
                                                {[...Array(2)].map((_, index) => (
                                                    <Skeleton key={index} height={20} className="mb-2" />
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        polygonData.length > 0 || selfPolygonData.length > 0 ? (
                                            <>
                                                {polygonData.length > 0 && (
                                                    <div className="w-full border-t-2 border-neutral-200 mt-m">
                                                        <div className="w-full pt-l pb-m text-neutral-1100">
                                                            Global Searching Results
                                                        </div>
                                                        {polygonData.slice(0, 4).map((area, index) => (
                                                            <SearchResultTab
                                                                area={area}
                                                                key={index}
                                                                getPolygonCoordinates={getPolygonCoordinates}
                                                                setPolygonCoordinates={setPolygonCoordinates}
                                                                setLatLng={setLatLng}
                                                                closeSearchHandler={closeSearchHandler}
                                                            />
                                                        ))}
                                                    </div>
                                                )}

                                                {selfPolygonData.length > 0 && (
                                                    <div className="w-full border-t-2 border-neutral-200 mt-m">
                                                        <div className="w-full pt-l pb-m text-neutral-1100">
                                                            Saved Polygons Results
                                                        </div>
                                                        {selfPolygonData.slice(0, 4).map((area, index) => (
                                                            <SearchResultTab
                                                                area={area}
                                                                key={index}
                                                                getPolygonCoordinates={getPolygonCoordinates}
                                                                setPolygonCoordinates={setPolygonCoordinates}
                                                                setLatLng={setLatLng}
                                                                closeSearchHandler={closeSearchHandler}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="text-f-xl text-gray-500">No data found.</div>
                                        )
                                    )}
                                </> : <div className='text-f-xl text-gray-500'>No data found.</div>}
                            </div>
                        </div>
                        <div className='absolute top-2 right-2 cursor-pointer' onClick={closeSearchHandler}>
                            <RiCloseFill className='w-10 h-10 text-white' />
                        </div>
                    </div>
                </div>}

                <div className='mt-xl '>
                    <Maps setSaveFormVisible={setSaveFormVisible} setSearchResultVisible={setSearchResultVisible} setCurrentPolygon={setCurrentPolygon} polygonSaved={polygonSaved} polygonCoordinates={polygonCoordinates}
                        latlng={latlng} setAppliedFilter={setAppliedFilter} />
                </div>


                {!OpenSearchBar && <div className=' bg-white  absolute top-2 right-2  w-[40px] h-[40px] flex items-center justify-center hover:text-black cursor-pointer' onClick={() => setOpenSearchBar((true))}>

                    <TbLocationSearch className='w-6 h-6 font-semibold ' />
                </div>}
                {/* <button className=' bg-white  absolute top-2 right-16  w-[40px] h-[40px] flex items-center justify-center hover:text-black cursor-pointer' onClick={() => { setShowFilter(prev => !prev) }}>
                    <LuFilter className='w-6 h-6 font-semibold ' />
                </button> */}

                {saveFormVisible && <div className='absolute w-[350px] h-full -right-0 top-0 bg-white bg-opacity-70 flex justify-between flex-col transition-transform rounded-l-md'>
                    <div className=''>
                        <div className='py-l px-m text-f-xl text-black border-b font-semibold flex justify-between bg-white rounded-tl-md'>
                            <div className='text-f-xl '>Save</div>
                            <IoCloseSharp className='cursor-pointer w-5 h-5' onClick={() => { setSaveFormVisible(false) }} />
                        </div>
                        <div className="flex flex-col px-m  mt-xl mb-4">
                            <label htmlFor="name" className="custom-label">Name<span className='text-red-500 ml-xs'>*</span></label>
                            <input
                                type="email"
                                id="name"
                                className="border-effect"
                                placeholder="Enter the name"
                                value={formData.name}
                                onChange={ChangeHandler}
                                readOnly={polygonSaved}
                            />
                            {error.name && <p className='custom-error'>{error.name}</p>}
                        </div>

                        {/* Phone Field */}
                        <div className="flex flex-col px-m  mb-4">
                            <label htmlFor="description" className="custom-label">Description<span className='text-red-500 ml-xs'>*</span></label>
                            <textarea
                                type="description"
                                id="description"
                                className="border-effect resize-none"
                                placeholder="Enter your description"
                                value={formData.description}
                                onChange={ChangeHandler}
                                rows={8}
                                maxLength={250}
                                readOnly={polygonSaved}
                            />
                            {error.description && <p className='custom-error'>{error.description}</p>}
                        </div>
                    </div>
                    <div className='px-m py-l border-t flex justify-end bg-white rounded-bl-md'>
                        <button className='bg-secondary-900 text-white px-m py-xs rounded-lg' onClick={saveHandler}>
                            {polygonSaved ? "Saved" : "Save"}
                        </button>
                    </div>

                </div>}


            </div>

        </div >
    )
}

export default MapContainer



const SearchResultTab = ({ area, getPolygonCoordinates, setPolygonCoordinates, setLatLng, closeSearchHandler }) => {
    return <button className=' w-full p-xs items-center text-neutral-900 flex justify-between hover:bg-neutral-50' onClick={() => {
        if (area.geojson.type == "Point") {
            setPolygonCoordinates([])
        }
        if (area.geojson.type == "Polygon") {
            getPolygonCoordinates(area.geojson.coordinates[0])
        }
        let newValue = { lat: Number(area.lat), lng: Number(area.lon) }
        console.log("getPolygonCoordinates", newValue)
        setLatLng(newValue)
        closeSearchHandler()

    }} >
        <div className='flex items-center gap-s text-f-l text-start'>
            <div>{(area.geojson.type == "Polygon") ? <PiPolygonFill /> : (area.geojson.type == "Point") ? <GrLocationPin /> : null} </div> <span>  {area.display_name}</span>
        </div>
        <div className='bg-neutral-200 text-f-xs text-center align-middle px-s py-xs rounded-lg'>
            {area.type}
        </div>
    </button>
}