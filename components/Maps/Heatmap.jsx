import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";
import Select from "react-select";

;

const mapContainerStyle = {
    width: "100%",
    height: "100%"
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
    lng: 77.2
};

const Heatmap = ({ data, setBinSize }) => {
    const [selectedOption, setSelectedOption] = useState(dataValues[0]);
    const heatmapData = useMemo(() =>
        data.map(point => ({
            location: new window.google.maps.LatLng(
                point.location.coordinates[1],
                point.location.coordinates[0]
            ),
            weight: point.totalSales
        })), [data]);

    useEffect(() => {
        setBinSize(selectedOption.value)
    }, [selectedOption])

    return (
        <div className="col-span-2 h-full bg-white rounded-bs flex flex-col border">

            {/* <div className='flex justify-between px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                <h3 className="text-f-l font-semibold text-neutral-1200  ">
                    Heat Map Representation
                </h3>
                <div className='flex gap-s'>
                    <Select
                        options={dataValues}
                        value={selectedOption}
                        onChange={(selected) => setSelectedOption(selected)}
                        isSearchable={false}
                        className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black text-f-s"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: 'unset',  // Remove default min-height
                                height: 'auto',
                                padding: "2px",
                                margin: 0,
                                border: '1px solid #4d4d4d',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                padding: '2px', // Ensure no extra padding
                                margin: 0,
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                padding: '2px',
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                padding: '0px', // Removes space around the dropdown arrow
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
            </div> */}
            <div className='h-full relative'>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10} options={{
                    streetViewControl: false,
                    zoomControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false
                }}>
                    <HeatmapLayer
                        data={heatmapData.map(p => p.location)}
                        options={{
                            radius: 40,
                            opacity: 0.7,

                        }}
                    />
                </GoogleMap>
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
                                minHeight: 'unset',  // Remove default min-height
                                height: 'auto',
                                padding: "2px",
                                margin: 0,
                                border: '1px solid #4d4d4d',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                padding: '2px', // Ensure no extra padding
                                margin: 0,
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                padding: '2px',
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                padding: '0px', // Removes space around the dropdown arrow
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
