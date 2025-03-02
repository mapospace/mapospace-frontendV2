import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, HeatmapLayer, Marker, InfoWindow } from "@react-google-maps/api";
import Select from "react-select";

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const dataValues = [
    { value: 0.01, label: "0.01" },
    { value: 0.02, label: "0.02" },
    { value: 0.03, label: "0.03" },
    { value: 0.04, label: "0.04" },
    { value: 0.05, label: "0.05" },
    { value: 0.06, label: "0.06" },
    { value: 0.07, label: "0.07" },
    { value: 0.08, label: "0.08" },
    { value: 0.09, label: "0.09" },
];

const center = {
    lat: 28.65,
    lng: 77.2,
};

const Heatmap = ({ data, setBinSize, label, Icon }) => {
    const [selectedOption, setSelectedOption] = useState(dataValues[0]);
    const [hoveredPoint, setHoveredPoint] = useState(null); // Track hovered location

    const heatmapData = useMemo(() =>
        data.map(point => ({
            location: new window.google.maps.LatLng(
                point.location.coordinates[1],
                point.location.coordinates[0]
            ),
            weight: point.totalSales,
            totalSales: point.totalSales, // Store sales for hover display
        })), [data]);

    useEffect(() => {
        setBinSize(selectedOption.value);
    }, [selectedOption, setBinSize]);

    return (
        <div className="col-span-2 h-full bg-white rounded-bs flex flex-col border">
            <div className="h-full relative">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                    options={{
                        streetViewControl: false,
                        zoomControl: false,
                        fullscreenControl: false,
                        mapTypeControl: false,
                    }}
                >
                    {/* Heatmap Layer */}
                    <HeatmapLayer
                        data={heatmapData.map(p => p.location)}
                        options={{
                            radius: 40,
                            opacity: 0.7,
                        }}
                    />

                    {/* Add markers to allow hover effect */}
                    {heatmapData.map((point, index) => (
                        <Marker
                            key={index}
                            position={point.location}
                            icon={{
                                path: window.google.maps.SymbolPath.CIRCLE,
                                scale: 10, // Small dot for hover detection
                                fillColor: "red",
                                fillOpacity: .1,
                                strokeWeight: 0,
                            }}
                            onMouseOver={() => setHoveredPoint(point)} // Show info on hover
                            onMouseOut={() => setHoveredPoint(null)} // Hide info on hover out
                        />
                    ))}

                    {/* InfoWindow to show total sales on hover */}
                    {hoveredPoint && (
                        <div
                            style={{
                                position: "absolute",
                                top: `10px`,
                                left: `10px`,
                                background: "rgba(256,256,256)",
                                color: "#fff",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                pointerEvents: "none",
                                // transform: "translate(-50%, -50%)"
                            }}
                            className="flex flex-col items-center justify-center border border-secondary-900"
                        >
                            <Icon className="text-black w-10 h-10" />
                            <div className="text-black text-f-2xl font-normal">
                                {label}
                            </div>
                            <div className="text-secondary-900 text-f-2xl font-semibold">
                                {hoveredPoint.totalSales.toFixed(2)}
                            </div>

                        </div>
                        // <InfoWindow position={hoveredPoint.location} >
                        //     <div className="p-2 text-sm font-semibold text-gray-900">
                        //         <p>📍 <strong>Sales:</strong> {hoveredPoint.totalSales}</p>
                        //     </div>
                        // </InfoWindow>
                    )}
                </GoogleMap>

                {/* Bin Size Dropdown */}
                <div className="absolute right-2 top-2 bg-white rounded-bs">
                    <Select
                        options={dataValues}
                        value={selectedOption}
                        onChange={(selected) => setSelectedOption(selected)}
                        isSearchable={false}
                        className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black text-f-s"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: 'unset',
                                height: 'auto',
                                padding: "2px",
                                margin: 0,
                                border: '1px solid #4d4d4d',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                padding: '2px',
                                margin: 0,
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                padding: '2px',
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                padding: '0px',
                                margin: 0,
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                padding: 0,
                                margin: 0,
                            }),
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Heatmap;
