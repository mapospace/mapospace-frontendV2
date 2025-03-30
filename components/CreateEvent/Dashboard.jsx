import React, { useEffect, useRef, useState } from 'react'
import Maps from '../Maps/Maps';
import clsx from 'clsx';
import { PiPolygonFill } from "react-icons/pi";
import { GrLocationPin } from "react-icons/gr";
import { ImSearch } from "react-icons/im";
import axios from 'axios';
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import Skeleton from 'react-loading-skeleton'
import { IoCloseSharp } from "react-icons/io5";
import toCapitalizedCase from '@/utils/capitalized-case';
import { TiStarFullOutline } from "react-icons/ti";
import { motion, AnimatePresence } from 'framer-motion';


const Dashboard = () => {
    const [addNewView, setAddNewView] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.5,
                type: 'spring',
            }
        }),
    };

    return (
        <div className='text-black py-l relative'>
            <div className='flex justify-between items-center ' >
                <div>
                    <div className='text-f-2xl font-semibold'>Views</div>
                    <div className='text-f-m'>Create and manage view for tracking</div>
                </div>
                <button className='default-button py-s text-center' onClick={() => setAddNewView(true)}>
                    <span className='pr-l text-f-xl'>+</span>View
                </button>
            </div>

            {addNewView && (
                <div>
                    <AddView setAddNewView={setAddNewView} />
                </div>
            )}

            <div className='pb-s border-b text-f-2xl mt-s'>Highlight</div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-m py-m text-gray-700 mt-l ">
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        <ViewCard />
                    </motion.div>
                ))}
            </div>

            <div className='pb-s border-b text-f-2xl mt-s'>Other Views</div>

            <div className="w-full mt-4 overflow-x-auto py-s hide-scrollbar">
                <div className="h-full flex w-max gap-m">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                        >
                            <OtherViewCard />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard

const randomCards = [
    {
      location: "Kerala",
      summary: "Spike in vegetation index after 2024 monsoon suggests floodplain recovery in affected districts.",
      updated: "28-03-2025"
    },
    {
      location: "Delhi",
      summary: "Unusual rise in surface temperature observed in industrial zones post-winter; urban heat island effect suspected.",
      updated: "25-03-2025"
    },
    {
      location: "Maharashtra",
      summary: "Increased fire alerts in Vidarbha region detected through thermal satellite layers since early March.",
      updated: "27-03-2025"
    },
    {
      location: "Rajasthan",
      summary: "Sand dune movement and vegetation loss evident in Jaisalmer and Barmer zones using NDVI difference layers.",
      updated: "24-03-2025"
    },
    {
      location: "Assam",
      summary: "Riverine changes along Brahmaputra detected using time-series analysis — risk of displacement flagged.",
      updated: "26-03-2025"
    },
    {
      location: "Tamil Nadu",
      summary: "Chennai coast saw a 12% drop in coastal vegetation cover; correlated with urban expansion zones.",
      updated: "23-03-2025"
    }
  ];
  
  const getRandomCard = () => {
    const index = Math.floor(Math.random() * randomCards.length);
    return randomCards[index];
  };
  
  const ViewCard = () => {
    const [highlight, setHighLight] = useState(false);
    const [card, setCard] = useState(getRandomCard());
  
    // Optional: refresh on every render
    // useEffect(() => {
    //   setCard(getRandomCard());
    // }, []);
  
    // Optional: refresh on button click
    const refreshCard = () => {
      setCard(getRandomCard());
      setHighLight(false);
    };
  
    return (
      <div className="max-w-md mx-auto">
        <div className='h-[200px] bg-white rounded-bs text-black border p-s flex flex-col justify-between flat-card'>
          <div>
            <div className='text-f-2xl flex items-center justify-between'>
              <div>{card.location}</div>
              <TiStarFullOutline
                className={clsx('w-xl h-xl cursor-pointer', highlight ? 'text-yellow-500' : 'text-neutral-600')}
                onClick={() => setHighLight(prev => !prev)}
              />
            </div>
            <div className='text-f-l mt-s text-neutral-900'>{card.summary}</div>
            <div className='text-neutral-600 mt-s tex-f-s'>Polygon</div>
          </div>
          <div className='text-neutral-600'>Updated by : {card.updated}</div>
        </div>
  
        <button
          onClick={refreshCard}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Show Another Card
        </button>
      </div>
    );
  };


const OtherViewCard = () => {
    const [highlight, setHighLight] = useState(false)
    return <div className='w-[400px] h-[200px] bg-white rounded-bs  text-black border p-s flex justify-between flex-col flat-card'>
        <div>
            <div className='text-f-2xl flex items-center justify-between'>
                <div>{toCapitalizedCase("delhi")}</div>
                <TiStarFullOutline className={clsx('w-xl h-xl cursor-pointer', highlight ? 'text-yellow-500' : 'text-neutral-600 ')} onClick={() => { setHighLight(prev => !prev) }} />

            </div>
            <div className='text-f-l mt-s text-neutral-900'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, velit.</div>
            <div className='text-neutral-600 mt-s tex-f-s'>Polygon</div>
        </div>
        <div>
            <div></div>
            <div className='text-neutral-600'>Updated by : 12-03-2024</div>
        </div>
    </div>
}

const AddView = ({ setAddNewView }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [currentPolygon, setCurrentPolygon] = useState([]);
    const [polygonSaved, setPolygonSaved] = useState(false);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [latlng, setLatLng] = useState({ lat: 28.7041, lng: 77.1025 });
    const [geo, setGeo] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [polygonData, setPolygonData] = useState([]);
    const [selfPolygonData, setSelfPolygonData] = useState([]);
    const searchResultRef = useRef(null);
    const [next, setNext] = useState(false);
    const [error, setError] = useState({ name: '', description: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() !== '') {
            setLoading(true);
            setShowSearchResult(true);
            fetchDataFromNominatim();
            fetchGeoJSONDetails();
        }
    };

    useEffect(() => {
        if (polygonData.length > 0 || selfPolygonData.length > 0) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [polygonData, selfPolygonData]);

    const getPolygonCoordinates = (coordinates) => {
        const transformedData = coordinates.map(([lng, lat]) => ({ lat: lat, lng: lng }));
        setPolygonCoordinates(transformedData);
        if (transformedData.length > 0) {
            const coordinates = transformedData.map((coordinate) => [coordinate.lng, coordinate.lat]);
            const polyData = {
                geojson: {
                    type: "Polygon",
                    coordinates: [coordinates],
                },
            };
            setGeo(polyData);
        }
    };

    const closeSearchHandler = () => {
        setShowSearchResult(false);
    };

    const fetchDataFromNominatim = async () => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${search}&polygon_geojson=1&format=jsonv2`);
            const data = response.data.filter((item) => item.geojson.type === "Polygon");
            if (data.length > 0) {
                setPolygonData(data);
                !searchResultVisible && setSearchResultVisible(true);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setPolygonData([]);
        }
    };

    const fetchGeoJSONDetails = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.GeoJson(search));
            if (response?.error) return;

            const newData = response?.data.geojsonList.map((geo) => ({
                type: "mapospace",
                name: geo.name,
                display_name: geo.description,
                lat: geo.geojson.geometry.coordinates[0][0][1],
                lon: geo.geojson.geometry.coordinates[0][0][0],
                geojson: geo.geojson.geometry,
            }));

            setSelfPolygonData(newData);
            !searchResultVisible && setSearchResultVisible(true);
        } catch (err) {
            console.error("Error fetching user details:", err);
            setSelfPolygonData([]);
        }
    };

    const nextButtonHandler = () => {
        if (name.trim() === '' || description.trim() === '') {
            if (name.trim() === '') setError((prev) => ({ ...prev, name: 'This field is required.' }));
            if (description.trim() === '') setError((prev) => ({ ...prev, description: 'This field is required.' }));
        } else {
            setNext(true);
        }
    };

    const saveHandler = () => {
        console.log("saveHandler", geo);
    };

    return (

        <div
            className='py-l fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'

        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className={clsx('border rounded-bs h-[85vh] flex flex-col bg-white', !next ? ' w-[85vh]' : ' w-[85vw]')}
                >
                    {/* Header */}
                    <div className='p-l py-m text-f-2xl border-b relative'>
                        <div className="font-bold flex items-center justify-between">
                            <div>Create New View</div>
                            <button onClick={() => setAddNewView(false)}>
                                <IoCloseSharp className='w-xl h-xl' />
                            </button>
                        </div>
                        <p className="text-f-m text-neutral-900 mt-1">
                            Define and save a polygon on the map to segment and analyze specific areas.
                            Customize with colors and descriptions for streamlined geospatial insights and tracking.
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className='flex-1 py-m px-l '>
                        {!next ? (
                            <div className='w-full h-full bg-white p-4 rounded-md'>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-f-m font-semibold">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setError((prev) => ({ ...prev, name: '' }));
                                        }}
                                        className="w-full mt-1 p-2 border rounded-md border-effect"
                                        placeholder="Enter view name"
                                    />
                                    {error.name && <div className='mt-xs text-f-s text-red-500'>{error.name}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-f-m font-semibold">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                            setError((prev) => ({ ...prev, description: '' }));
                                        }}
                                        className="w-full mt-1 p-2 border rounded-md resize-none h-[200px] border-effect"
                                        placeholder="Enter description"
                                        maxLength={2000}
                                    />
                                    {error.description && <div className='mt-xs text-f-s text-red-500'>{error.description}</div>}
                                </div>
                            </div>
                        ) : (
                            <div className='w-full h-full flex gap-l'>
                                <div className='w-[95vh] h-full bg-white rounded-md'>
                                    <Maps
                                        setSaveFormVisible={null}
                                        setSearchResultVisible={setSearchResultVisible}
                                        setCurrentPolygon={setCurrentPolygon}
                                        polygonSaved={polygonSaved}
                                        polygonCoordinates={polygonCoordinates}
                                        latlng={latlng}
                                        setAppliedFilter={setGeo}
                                    />
                                </div>
                                <div className='flex-1 h-full'>
                                    <div className='w-full flex flex-col rounded-lg relative'>
                                        <div className='flex flex-1 bg-white rounded-lg border'>
                                            <input
                                                type="text"
                                                className="focus:outline-none py-s px-s text-f-l rounded-bs flex-1 border-0 text-black"
                                                placeholder="Search.."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <button className='text-secondary-900 py-xs px-xl flex items-center justify-center gap-s' onClick={handleSearch}>
                                                <ImSearch />
                                            </button>
                                        </div>
                                        <div className={'flex w-full flex-col items-center px-l z-20 top-xl transition-all duration-1000 ease-in'}>
                                            <div ref={searchResultRef} className='w-full'>
                                                {loading ? (
                                                    <div className="w-full py-l bg-white">
                                                        <div className='w-full text-neutral-900 border-b-2 pb-m border-neutral-200'>Searching For</div>
                                                        <Skeleton width={200} height={20} />
                                                        {[...Array(2)].map((_, index) => (
                                                            <Skeleton key={index} height={20} className="mb-2" />
                                                        ))}
                                                        <div className="w-full border-t-2 border-neutral-200 mt-m">
                                                            <Skeleton width={200} height={20} />
                                                            {[...Array(2)].map((_, index) => (
                                                                <Skeleton key={index} height={20} className="mb-2" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='w-full py-l'>
                                                        <div className='w-full text-neutral-900 border-b-2 pb-m border-neutral-200'>Searching For</div>
                                                        {polygonData.length > 0 || selfPolygonData.length > 0 ? (
                                                            <div className='w-full h-[45vh] overflow-y-scroll hide-scrollbar'>
                                                                {polygonData.length > 0 && (
                                                                    <>
                                                                        <div className="pt-l pb-m text-neutral-1100">Global Searching Results</div>
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
                                                                    </>
                                                                )}
                                                                {selfPolygonData.length > 0 && (
                                                                    <>
                                                                        <div className="border-t-2 border-neutral-200 mt-m pt-l pb-m text-neutral-1100">Saved Polygons Results</div>
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
                                                                    </>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="text-f-l text-gray-500 mt-m">No data found.</div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className='p-l py-m text-f-2xl border-t flex justify-between gap-s'>
                        {next ? (
                            <button className='default-button py-xs text-f-l border bg-white text-black hover:bg-white hover:border-secondary-900' onClick={() => setNext(false)}>Back</button>
                        ) : (
                            <div></div>
                        )}
                        {!next ? (
                            <button className='default-button py-xs text-f-l' onClick={nextButtonHandler}>Next</button>
                        ) : (
                            <button className='default-button py-xs text-f-l' onClick={saveHandler}>Save</button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

    );
};



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