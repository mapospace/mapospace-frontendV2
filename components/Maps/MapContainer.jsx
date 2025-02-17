import React, { useState } from 'react'
import Maps from './Maps'
import { IoCloseSharp } from "react-icons/io5";
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { customSuccess } from '../Common/Toast';
import { ImSearch } from "react-icons/im";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from 'axios';
import Select from "react-select";
import { PiPolygonFill } from "react-icons/pi";
import { GrLocationPin } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFilter } from "react-icons/fa6";
import Filter from '../Common/Filter';


const options = [
    { value: "all", label: "All" },
    { value: "self", label: "Self" },
];

const MapContainer = () => {
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
    const [mapVisible, setMapVisible] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [polygonData, setPolygonData] = useState([]);
    const [selfPolygonData, setSelfPolygonData] = useState([]);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [latlng, setLatLng] = useState({ lat: 28.7041, lng: 77.1025 })
    const [selectedOption, setSelectedOption] = useState(options[0]);



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
            console.log(search)
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
                !mapVisible && setMapVisible(true);
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
            !mapVisible && setMapVisible(true);

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

    const getPolygonCoordinates = (coordinates) => {
        const transformedData = coordinates.map(([lng, lat]) => ({ lat: lat, lng: lng }));
        console.log("transformedData", transformedData)
        setPolygonCoordinates(transformedData);
    }

    return (
        <div className='relative '>
            <div className="flex  flex-1">
                <div className='flex flex-1  gap-xl'>
                    <input
                        type="text"
                        id="firstName"
                        className="border-effect flex-1"
                        placeholder="Search.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className='default-button py-xs px-4xl flex items-center justify-center gap-s' onClick={handleSearch}>
                        <ImSearch />
                        <span>
                            Search
                        </span>

                    </button>
                </div>

                <div className=' flex flex-[0.7] gap-s items-center justify-end'>
                    <button className='bg-neutral-200 h-full flex px-l rounded-md items-center justify-end hover:bg-neutral-300' onClick={() => { setMapVisible(prev => !prev) }}>
                        <FaMapLocationDot className='w-6 h-6 text-neutral-1200' />
                    </button>
                    <button className='relative bg-neutral-100 border-2 border-neutral-200 h-full flex px-l rounded-md items-center justify-end hover:border-neutral-500' onClick={() => { setShowFilter(prev => !prev) }}>
                        <FaFilter className='w-5 h-5 text-neutral-1200' />

                    </button>
                </div>

            </div>
            {showFilter && <Filter close={setShowFilter} />}
            {mapVisible && <div className='h-[80vh] relative'>
                <div className='mt-xl'><Maps setSaveFormVisible={setSaveFormVisible} setSearchResultVisible={setSearchResultVisible} setCurrentPolygon={setCurrentPolygon} polygonSaved={polygonSaved} polygonCoordinates={polygonCoordinates}
                    latlng={latlng} /></div>

                {searchResultVisible && <div className="absolute w-[450px] bg-opacity-80 h-full -right-0 top-0 bg-white flex justify-between flex-col transition-transform rounded-l-md">
                    <div className='py-m px-m text-f-xl bg-white text-black border-b font-semibold flex justify-between items-center rounded-tl-md' >

                        <div className='flex gap-s items-end '>
                            <div className='text-f-3xl  text-end'>Search Results</div>
                            <div >
                                <Select
                                    options={options}
                                    value={selectedOption}
                                    onChange={(selected) => {
                                        setSelectedOption(selected)
                                    }}
                                    isSearchable={false} // Disable search if not needed
                                    className='text-f-l w-10xl'
                                />
                            </div>

                        </div>

                        {/* <IoCloseSharp className='cursor-pointer w-5 h-5' onClick={() => { setSearchResultVisible(false) }} /> */}
                    </div>
                    <div className='flex-1  overflow-x-scroll hide-scrollbar p-m rounded-bl-md'>
                        {polygonData.length > 0 || selfPolygonData.length > 0 ?
                            <ul >
                                {selectedOption.value == "all" && polygonData.length > 0 && polygonData.map((area, index) =>
                                    <LocationTab area={area} key={index} getPolygonCoordinates={getPolygonCoordinates} setPolygonCoordinates={setPolygonCoordinates} setLatLng={setLatLng} />
                                )}
                                {selfPolygonData.length && selfPolygonData.map((area, index) =>
                                    <LocationTab area={area} key={index} getPolygonCoordinates={getPolygonCoordinates} setPolygonCoordinates={setPolygonCoordinates} setLatLng={setLatLng} />
                                )}
                            </ul>

                            : <div className='text-f-xl text-gray-500'>No data found.</div>}
                    </div >

                </div >}
                <div className=' bg-white  absolute top-2 right-2  w-[40px] h-[40px] flex items-center justify-center hover:text-black cursor-pointer' onClick={() => setSearchResultVisible((prev => !prev))}>
                    {searchResultVisible ? <IoCloseSharp className='w-6 h-6 font-semibold ' /> : <GiHamburgerMenu className='w-6 h-6 font-semibold ' />}
                </div>
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
            }

        </div >
    )
}

export default MapContainer

const LocationTab = ({ area, getPolygonCoordinates, setPolygonCoordinates, setLatLng }) => {
    return <li className="mb-s bg-white">
        <button className={`w-full text-left text-f-xl p-2 border-b border rounded-md py-l px-s hover:bg-neutral-200 hover:text-black`} onClick={() => {
            if (area.geojson.type == "Point") {
                setPolygonCoordinates([])
            }
            if (area.geojson.type == "Polygon") {
                getPolygonCoordinates(area.geojson.coordinates[0])
            }
            let newValue = { lat: Number(area.lat), lng: Number(area.lon) }
            console.log("getPolygonCoordinates", newValue)
            setLatLng(newValue)

        }}>
            <div className='flex gap-xs justify-start items-start'>
                <div className='flex justify-start  mt-xs'>
                    {(area.geojson.type == "Polygon") ? <PiPolygonFill /> : (area.geojson.type == "Point") ? <GrLocationPin /> : null}
                </div>

                <div className=''>
                    {area.display_name} <span className='text-f-m text-neutral-800'>
                        {area.type}
                    </span>
                </div>


            </div>

        </button>
    </li>
}