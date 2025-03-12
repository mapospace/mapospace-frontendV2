import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { TbLocationSearch } from "react-icons/tb";
import QueryFilter from './QueryFilter';
import MongoQueryBuilder from './MongoQueryBuilder';
import { RiCloseLine } from "react-icons/ri";
import Maps from '../Maps/Maps';
import { ImSearch } from "react-icons/im";
import { RiCloseFill } from "react-icons/ri";
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import { PiPolygonFill } from "react-icons/pi";
import { GrLocationPin } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
const QueryBuilderSideNav = () => {
    const [openQuery, setOpenQuery] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showGeo, setShowGeo] = useState(false);
    const [saveFormVisible, setSaveFormVisible] = useState(false);
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [currentPolygon, setCurrentPolygon] = useState([]);
    const [polygonSaved, setPolygonSaved] = useState(false);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [latlng, setLatLng] = useState({ lat: 28.7041, lng: 77.1025 });
    const [geo, setGeo] = useState(null);
    const [polygonData, setPolygonData] = useState([]);
    const [selfPolygonData, setSelfPolygonData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })
    const [error, setError] = useState({
        name: "",
        description: "",
    });
    const [propertyNameList, setPropertyNameList] = useState([])
    const [propertyList, setPropertyList] = useState([])
    const searchResultRef = useRef(null);
    const [queryFilterData, setQueryFilterData] = useState({})
    const [query, setQuery] = useState(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchResultRef.current && !searchResultRef.current.contains(event.target)) {
                setShowSearchResult(false);
            }
        }

        if (showSearchResult) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSearchResult]);


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

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() != '') {
            setLoading(true);
            setShowSearchResult(true)
            fetchDataFromNominatim();
            fetchGeoJSONDetails()
        }

    };

    useEffect(() => {
        if (polygonData.length > 0 || selfPolygonData.length > 0) {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
    }, [polygonData, selfPolygonData])

    const closeSearchHandler = () => {
        setShowSearchResult(false);
    }

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
            setGeo(polyData)
        }

    }

    const openFilterHandler = () => {
        setShowFilter(true)
        setShowGeo(false)
    }

    const openGeoHandler = () => {
        setShowFilter(false)
        setShowGeo(true)
    }

    const runQueryHandler = () => {
        console.log("runQueryHandler", queryFilterData)
        console.log("runQueryHandler query", query)
    }


    return (
        <div className={clsx(" h-[calc(100vh-64px)]  relative transition-all duration-500 flex ease-in-out border-r", openQuery ? "w-[300px]" : "w-[15px]")}>
            <div className="w-xl  absolute -right-3 top-2 h-full z-20">
                <div className="w-full h-xl bg-secondary-900 z-40 flex items-center justify-center rounded-bs cursor-pointer " onClick={() => { setOpenQuery(prev => !prev) }}>
                    <MdKeyboardArrowRight className={clsx('transition-all duration-500 ease-in-out', openQuery ? 'rotate-180' : 'rotate-0')} />
                </div>
            </div>
            <div className={clsx('text-neutral-1200 py-l w-full transition-all  flex flex-col justify-between', openQuery ? "duration-700 pointer-events-auto opacity-100" : "duration-300 opacity-0 pointer-events-none ")}>
                <div className=' h-full'>
                    <div className='flex items-center gap-xs border-b px-l pb-s '>
                        <LuFilter className='w-5 h-5' />
                        <div className='text-f-l font-semibold'>Query Builder</div>
                    </div>
                    <QueryFilter setShowFilter={openFilterHandler} setShowGeo={openGeoHandler} setPropertyNameList={setPropertyNameList} setPropertyList={setPropertyList} getData={setQueryFilterData} />
                </div>
                <div className='mt-l flex justify-end px-l '>
                    <div className=' default-button' onClick={runQueryHandler} >
                        Run Query
                    </div>
                </div>


            </div>

            {/* FILTER SIDENAV */}
            <div className={clsx(' py-l absolute bg-white  top-0  h-full  z-10 transition-all duration-500 ease-in-out', showFilter ? "w-[500px] -right-[500px] border-x" : 'w-0 right-0 border-0')}>
                <div className={clsx('w-full h-full transition-all duration-300 ease-in-out', showFilter ? 'opacity-100' : 'opacity-0')}>
                    <div className=' pb-s px-s font-normal text-f-2xl border-b text-black flex justify-between items-center'>
                        <div className='px-l text-f-l font-semibold'>Filters</div>
                        <RiCloseLine className='w-xl h-xl cursor-pointer' onClick={() => { setShowFilter(false) }} />
                    </div>
                    <MongoQueryBuilder propertyNameList={propertyNameList} propertyList={propertyList} setQuery={setQuery} />
                </div>

            </div>

            {/* GEO SIDENAV */}
            <div className={clsx(' py-l absolute bg-white  top-0  h-full  z-10 transition-all duration-500 ease-in-out', showGeo ? "w-[800px] -right-[800px] border-x" : 'w-0 right-0 border-0')}>
                <div className={clsx('w-full h-full transition-all duration-300 ease-in-out', showGeo ? 'opacity-100' : 'opacity-0')}>
                    <div className=' pb-s px-s font-normal text-f-2xl border-b text-black flex justify-between items-center'>
                        <div className='px-l text-f-l font-semibold'>Geographic Filter</div>
                        <RiCloseLine className='w-xl h-xl cursor-pointer' onClick={() => {
                            setShowGeo(false)
                        }} />
                    </div>

                    <div className='w-full h-full bg-white p-xl pb-2xl overflow-y-scroll'>
                        <div className={clsx('  w-full flex flex-col   rounded-lg relative')}>
                            <div className='flex flex-1  bg-white  rounded-lg border'>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="focus:outline-none py-s px-s text-f-l rounded-bs flex-1 border-0 text-black"
                                    placeholder="Search.."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoComplete='off'
                                />
                                <button className='text-secondary-900 py-xs px-xl flex items-center justify-center gap-s' onClick={handleSearch}>
                                    <ImSearch />
                                </button>
                            </div>
                            {showSearchResult && <div className={'flex w-full flex-col  items-center  rounded-bs px-l py-l mt-xs  absolute z-20 top-xl transition-all duration-1000 ease-in'}>

                                {polygonData.length > 0 || selfPolygonData.length > 0 ? <div ref={searchResultRef} className='w-[80%]'>
                                    {loading ? (
                                        <div className={clsx("w-full p-l rounded-bs bg-white border ")}>
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
                                            <div className='border w-full bg-white p-l rounded-bs'>
                                                <div className='w-full text-neutral-900 '>
                                                    Searching For
                                                </div>
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
                                            </div>
                                        ) : (
                                            <div className="text-f-xl text-gray-500">No data found.</div>
                                        )
                                    )}
                                </div> : null}
                            </div>}
                        </div>
                        <div className='bg-white w-full h-full relative mt-s'>

                            <Maps setSaveFormVisible={setSaveFormVisible} setSearchResultVisible={setSearchResultVisible} setCurrentPolygon={setCurrentPolygon} polygonSaved={polygonSaved} polygonCoordinates={polygonCoordinates}
                                latlng={latlng} setAppliedFilter={setGeo} />


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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueryBuilderSideNav


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