'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import h3 from '@/public/dashboard/h3.png';
import { MdDeleteForever } from "react-icons/md";
import Select from "react-select";
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { customError, customSuccess } from '@/components/Common/Toast';
const valueRequired = [
    { value: "false", label: "False" },
    { value: "true", label: "True" }
];

const valueType = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" }
];

const Page = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [keyValuePairs, setKeyValuePairs] = useState([{ key: '', dataType: 'string', required: 'false' }]);
    const [customEventTypes, setCustomEventTypes] = useState([]);
    const [preDefined, setPreDefined] = useState(false)

    useEffect(() => {
        getEventHandler()
    }, [])

    const eventNameHandler = (value) => {
        setEventName(value);
    };
    const eventDescriptionHandler = (value) => {
        setEventDescription(value);
    };

    const getEventHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.CustomEvent.CustomEvents);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            // setCatalogList(response?.data)
            console.log("getEventHandler", response.data)
            setCustomEventTypes(response.data.customEventTypes)
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    };


    const handleKeyValueChange = (index, field, value) => {

        const updatedPairs = [...keyValuePairs];
        updatedPairs[index][field] = value;
        setKeyValuePairs(updatedPairs);

        console.log("handleKeyValueChange", index, field, value, updatedPairs)
        // Add new KeyValueTabs if both key and value are entered in the last pair
        if (index === keyValuePairs.length - 1 && updatedPairs[index].key.trim()) {
            setKeyValuePairs([...updatedPairs, { key: '', dataType: 'string', required: 'false' }]);
        }
    };

    const handleDeleteKeyValue = (index) => {
        const updatedPairs = keyValuePairs.filter((_, i) => i !== index);
        setKeyValuePairs(updatedPairs);
    };


    const onClickEventHandler = (event) => {
        setPreDefined(true)
        setEventName(event.name);
        setEventDescription(event.description)
        const updateKeyValue = event.properties.map((property) => {
            return {
                key: property.key,
                dataType: property.dataType,
                required: property.required
            }
        })
        console.log('onClickEventHandler', updateKeyValue)
        setKeyValuePairs(updateKeyValue)
    }

    const saveNewEventHandler = async () => {
        const newKeyValuePairs = keyValuePairs.filter((pair) => pair.key.trim() != '')
        const newData = {
            "name": eventName,
            "description": eventDescription,
            "properties": newKeyValuePairs

        }
        console.log("saveNewEventHandler", newData)
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CustomEvent.CreateCustomEvents, newData);

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("PerformClusteringHandler", response?.data);
            customSuccess("Event Created Successfully!");
            // setClusterData(response.data)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const addNewEventHandler = () => {
        setPreDefined(false);
        setEventName('');
        setEventDescription('');
        setKeyValuePairs([{ key: '', dataType: 'string', required: 'false' }]);
    }

    return (
        <div className='text-black py-9xl px-xl bg-white'>
            <div className='text-gray-900 font-semibold text-f-2xl'>📊 Create a Custom Event</div>
            <div className='text-f-l text-gray-700 mt-s'>
                Define and manage custom events by adding event names, keys, and properties. This will help track user interactions and behaviors effectively.
            </div>

            <div className='border p-xl rounded-lg mt-xl min-h-[600px] flex flex-col 0'>
                <div className='text-xl font-semibold border-b pb-4'>
                    Add New Event
                </div>

                <div className='grid grid-cols-2 gap-8 mt-xl flex-grow '>
                    {/* Left Column */}
                    <div className='col-span-1 flex flex-col '>
                        <div className='grid grid-cols-3 gap-l'>
                            <button className='default-button flex-nowrap' onClick={addNewEventHandler}>
                                + Add New Event
                            </button>

                            {customEventTypes.length > 0 && customEventTypes.map((event, index) => (
                                <button className='default-button flex-nowrap bg-neutral-200 hover:bg-neutral-300 text-black' key={index} onClick={() => onClickEventHandler(event)}>
                                    {event.name}
                                </button>
                            ))}
                        </div>


                        {!preDefined && <>
                            <div className="mt-l space-y-2">
                                <input
                                    type="text"
                                    className="p-2 border border-gray-300 rounded-md w-[50%] border-effect transition"
                                    placeholder="Enter event name"
                                    onChange={(e) => eventNameHandler(e.target.value)}
                                    value={eventName}
                                />
                            </div>
                            <div className="mt-l space-y-2">
                                <textarea
                                    className="p-2 border border-gray-300 rounded-md w-[80%] border-effect transition resize-none"
                                    placeholder="Enter event description"
                                    onChange={(e) => eventDescriptionHandler(e.target.value)}
                                    value={eventDescription}
                                    maxLength={200}
                                />
                            </div>
                        </>}
                        {eventName.trim() !== "" && eventDescription.trim() != '' &&
                            <div className="">
                                {keyValuePairs.map((pair, index) => (
                                    <KeyValueTabs
                                        key={index}
                                        index={index}
                                        pair={pair}
                                        onChange={handleKeyValueChange}
                                        onDelete={handleDeleteKeyValue}
                                        readOnly={preDefined}
                                    />
                                ))}
                            </div>
                        }




                        {eventName.trim() != "" && < div className='flex justify-end mt-2xl'>
                            <button className='default-button ' onClick={saveNewEventHandler}>
                                Save
                            </button>
                        </div>}

                    </div>

                    {/* Right Column */}
                    <div className="col-span-1 flex flex-col justify-center items-center rounded-bs">
                        <Image
                            src={h3}
                            alt="Illustration"
                            className="h-[350px] object-contain max-w-full rounded-bs"
                        />
                        <div className="text-center w-[500px] mt-4 text-gray-600">
                            Unveiling Behavioral Patterns: Harnessing Geospatial Clustering for Smarter Insights and Decision-Making
                        </div>
                    </div>
                </div>
            </div>


        </div >
    );
};

export default Page;


const KeyValueTabs = ({ index, pair, onChange, onDelete, readOnly }) => {
    const [selectedOption, setSelectedOption] = useState(valueRequired[0].value);
    const [selectedValueOption, setSelectedValueOption] = useState(valueType[0].value);

    return <div className='w-full h-5xl  flex justify-end '>
        <div className=' h-full w-[90%] relative  border-l-2 border-b-2 border-secondary-900'>
            <div className='flex gap-l w-[90%] justify-end  mt-l right-0  absolute -bottom-4 items-center bg-white '>
                <div className='flex-1'>
                    <div className='text-f-xs mb-xs text-neutral-900'>Key</div>
                    <input
                        type="text"
                        className=" border border-gray-300 rounded-bs w-full border-effect transition text-f-s"
                        placeholder="Key"
                        value={pair.key}
                        onChange={(e) => onChange(index, 'key', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div className='flex-1'>
                    <div className='text-f-xs mb-xs text-neutral-900'>Required</div>
                    <Select
                        options={valueType}
                        isDisabled={readOnly}
                        value={valueType.filter(selectedValue => selectedValue.value == selectedValueOption)}
                        onChange={(selected) => {
                            onChange(index, 'dataType', selected.value);
                            setSelectedValueOption(selected.value)
                        }
                        }
                        isSearchable={false}
                        className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black text-f-s"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: 'unset',  // Remove default min-height
                                height: 'auto',
                                padding: "2px",
                                margin: 0,
                                border: '1px solid #bfbfbf',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                color: '#bfbfbf',
                                borderRadius: '8px'
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                padding: '2px', // Ensure no extra padding
                                margin: 0,
                                color: '#bfbfbf',
                                borderRadius: '8px'
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                padding: '5px',
                                color: '#bfbfbf',
                                borderRadius: '8px'
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                padding: '0px', // Removes space around the dropdown arrow
                                margin: 0,
                                color: '#bfbfbf'
                                , borderRadius: '8px'
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                paddingLeft: '4px',
                                margin: 0,
                                borderRadius: '8px'

                            }),
                        }}
                    />
                </div>
                <div className='flex-1'>
                    <div className='text-f-xs mb-xs text-neutral-900'>Required</div>
                    <Select
                        options={valueRequired}
                        isDisabled={readOnly}
                        value={valueRequired.filter(selectedValue => selectedValue.value == selectedOption)}
                        onChange={(selected) => {
                            onChange(index, 'required', selected.value);
                            setSelectedOption(selected.value)
                        }
                        }
                        isSearchable={false}
                        className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black text-f-s"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: 'unset',  // Remove default min-height
                                height: 'auto',
                                padding: "2px",
                                margin: 0,
                                border: '1px solid #bfbfbf',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                color: '#bfbfbf',
                                borderRadius: '8px'
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                padding: '2px', // Ensure no extra padding
                                margin: 0,
                                color: '#bfbfbf',
                                borderRadius: '8px'
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                padding: '5px',
                                color: '#bfbfbf',
                                borderRadius: '8px'
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                padding: '0px', // Removes space around the dropdown arrow
                                margin: 0,
                                color: '#bfbfbf'
                                , borderRadius: '8px'
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                paddingLeft: '4px',
                                margin: 0,
                                borderRadius: '8px'

                            }),
                        }}
                    />
                </div>
                <div className=' bg-white' onClick={() => onDelete(index)}>
                    <div className='text-f-xs mb-xs  text-white'>Delete</div>
                    <MdDeleteForever className='w-6 h-6  bg-white' />
                </div>

            </div>
        </div>

    </div>
}