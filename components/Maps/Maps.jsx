"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScriptNext, Polygon, DrawingManager, OverlayView } from "@react-google-maps/api";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlineDataSaverOn } from "react-icons/md";

const containerStyle = {
    width: "100%",
    height: "80vh",
};

const center = {
    lat: 28.6139, // New Delhi
    lng: 77.2090,
};

const mapStyle = [
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    }
];

const Maps = ({ setSaveForm, setCurrentPolygon, polygonSaved }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const [polygonPaths, setPolygonPaths] = useState([]); // Temporary polygon coordinates
    // const [savedPolygons, setSavedPolygons] = useState([]); // Stores confirmed polygons
    const [showButtons, setShowButtons] = useState(false); // Controls visibility of save/cancel buttons
    const [centroid, setCentroid] = useState(null); // Stores centroid position

    const mapRef = useRef(null);
    const drawingManagerRef = useRef(null);
    const polygonRef = useRef(null); // Store the drawn polygon instance
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
    const [drawingMode, setDrawingMode] = useState(["polygon"]);

    useEffect(() => {
        if (window.google && window.google.maps) {
            setIsGoogleLoaded(true);
        }
    }, []);

    // Function to calculate centroid of polygon
    const calculateCentroid = (coordinates) => {
        let latSum = 0, lngSum = 0;
        let minlng = 100000;
        let maxlng = 0
        let maxlat = 0
        coordinates.forEach(coord => {
            console.log(coord);
            minlng = Math.min(minlng, coord.lng)
            maxlng = Math.max(maxlng, coord.lng)
            maxlat = Math.max(maxlat, coord.lat)
            latSum += coord.lat;
            lngSum += coord.lng;
        });
        console.log("calculateCentroid", minlng, maxlat, maxlng)
        return {
            lat: maxlat,
            lng: (minlng + maxlng) / 2,
        };
    };

    // Function to handle polygon completion
    const onPolygonComplete = (polygon) => {
        const path = polygon.getPath().getArray().map(coord => ({
            lat: coord.lat(),
            lng: coord.lng()
        }));
        setPolygonPaths(path);
        setCentroid(calculateCentroid(path)); // Update centroid
        setShowButtons(true); // Show Save & Cancel buttons
        polygonRef.current = polygon; // Store the polygon instance
        setDrawingMode(null);
    };

    // Cancel Handler: Remove the polygon from the map
    const cancelHandler = () => {
        if (polygonRef.current) {
            polygonRef.current.setMap(null); // Remove from the map
            polygonRef.current = null;
        }
        setPolygonPaths([]); // Clear temporary polygon
        setShowButtons(false); // Hide buttons
        setCentroid(null); // Clear centroid
    };

    // Save Handler: Store the polygon and remove temporary one
    const saveHandler = () => {
        // setSavedPolygons([...savedPolygons, polygonPaths]); // Save the polygon
        setSaveForm(true);
        setCurrentPolygon()
        //    cancelHandler();
        setCurrentPolygon(polygonPaths)
    };

    // Prevent duplicate DrawingManager instances
    const onDrawingManagerLoad = (drawingManager) => {
        if (!drawingManagerRef.current) {
            drawingManagerRef.current = drawingManager;
        }
    };

    if (!apiKey) return <p>Loading Google Maps...</p>;

    return (
        <LoadScriptNext googleMapsApiKey={apiKey} libraries={["drawing"]} onLoad={() => setIsGoogleLoaded(true)}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={{
                    styles: mapStyle,
                    streetViewControl: false,
                    zoomControl: true,
                    fullscreenControl: false,
                }}
                onLoad={(map) => (mapRef.current = map)}
            >
                {/* Drawing Manager */}
                {isGoogleLoaded && !drawingManagerRef.current && (
                    <DrawingManager
                        onLoad={onDrawingManagerLoad}
                        options={{

                            drawingControl: true,
                            drawingControlOptions: {
                                position: window.google.maps.ControlPosition.RIGHT_TOP,
                                drawingModes: drawingMode,
                            },
                            polygonOptions: {
                                fillColor: "#0136f8",
                                fillOpacity: 0.4,
                                strokeWeight: 2,
                                clickable: true,
                                editable: false,
                                draggable: false,
                            },
                        }}
                        onPolygonComplete={onPolygonComplete}
                    />
                )}

                {polygonPaths.length > 0 && (
                    <Polygon
                        paths={polygonPaths}
                        options={{
                            fillColor: "#99affc",
                            fillOpacity: 0.4,
                            strokeColor: "#0136f8",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
                )}

                {/* Overlay Buttons at Polygon Centroid */}
                {showButtons && centroid && (
                    <OverlayView
                        position={centroid}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className="flex items-center gap-2 p-2  shadow-md rounded-lg">
                            <button
                                onClick={cancelHandler}
                                className="bg-neutral-800 text-white  rounded-full relative group "
                            >
                                <IoIosCloseCircle className="w-9 h-9" />
                                <p className='absolute text-white py-xs px-l hidden group-hover:block bg-neutral-700  rounded-lg  -top-7  text-f-s'>Close</p>
                            </button>
                            {!polygonSaved && <button
                                onClick={saveHandler}
                                className="bg-neutral-800 relative group  text-white rounded-full"
                            >
                                <MdOutlineDataSaverOn className="w-9 h-9" />
                                <p className='absolute text-white py-xs px-l hidden group-hover:block bg-neutral-700  rounded-lg  -top-7  text-f-s'>Save</p>
                            </button>}
                        </div>
                    </OverlayView>
                )}
            </GoogleMap>
        </LoadScriptNext>
    );
};

export default Maps;
