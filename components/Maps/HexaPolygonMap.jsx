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

const HexaPolygonMap = ({ h3Data, setH3Resolution, label, type }) => {
    const [selectedOption, setSelectedOption] = useState(dataValues[0]);

    useEffect(() => {
        setH3Resolution(selectedOption.value)
    }, [selectedOption])



    return (
        <div className="col-span-2 h-full bg-white rounded-bs flex flex-col border">



            <div className=' h-full relative'>
                <H3Map h3Data={h3Data} label={label} type={type} />
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

export default HexaPolygonMap;
