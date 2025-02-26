"use client";

// import { GoogleMap, Polygon } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Select from "react-select";
import H3Map from "./H3Map";

const dataValues = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
];

const H3ClustingMap = ({ h3Data, setH3Resolution }) => {
    // const [polygons, setPolygons] = useState([]);
    const [selectedOption, setSelectedOption] = useState(dataValues[0]);

    // useEffect(() => {
    //     console.log("H3ClustingMap", h3Data)
    //     const parsedPolygons = h3Data.map((item) => ({
    //         path: item.coordinates.map(([lat, lng]) => ({ lat, lng })),
    //         color: getColorByValue(item.totalOrderValue),
    //     }));
    //     setPolygons(parsedPolygons);
    // }, [h3Data]);

    useEffect(() => {
        setH3Resolution(selectedOption.value)
    }, [selectedOption])

    // Function to color polygons based on totalOrderValue
    // const getColorByValue = (value) => {
    //     if (value > 40000) return "#FF0000"; // Red for high value
    //     if (value > 20000) return "#FFA500"; // Orange for medium value
    //     return "#00FF00"; // Green for low value
    // };

    return (
        <div className="col-span-2 h-full bg-white rounded-bs flex flex-col border">

            {/* <div className='flex justify-between px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                <h3 className="text-f-l font-semibold text-neutral-1200  ">
                    Heat Map Representation
                </h3>

            </div> */}

            <div className=' h-full relative'>
                <H3Map h3Data={h3Data} />
                <div className=' gap-s absolute  right-2 top-2 bg-white rounded-bs'>
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

export default H3ClustingMap;
