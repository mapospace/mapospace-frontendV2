import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import h3 from '@/public/dashboard/h3.png';
import { RiCloseFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Select from "react-select";
import { customError, customSuccess } from '../Common/Toast';

const valueRequired = [
    { value: "false", label: "False" },
    { value: "true", label: "True" }
];

const valueType = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" }
];

const EventManager = () => {
    const [customEventTypes, setCustomEventTypes] = useState([]);
    const [eventTag, setEventTag] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [addProperty, setAddProperty] = useState(false)
    const [keyValuePairs, setKeyValuePairs] = useState([{ key: '', dataType: 'string', required: 'false' }]);
    const [error, setError] = useState({ 'tag': true, 'name': true, 'description': true })
    const [showError, setShowError] = useState(false)
    const [addNewEvent, setAddNewEvent] = useState(false)
    useEffect(() => {
        getEventHandler()
    }, [])

    const eventTagHandler = (value) => {
        setEventTag(value);
        if (value.trim() == "") {
            setError((prev) => {
                return { ...prev, 'tag': true }
            })
        } else {
            setError((prev) => {
                return { ...prev, 'tag': false }
            })
        }
    };
    const eventNameHandler = (value) => {
        setEventName(value);
        if (value.trim() == "") {
            setError((prev) => {
                return { ...prev, 'name': true }
            })
        } else {
            setError((prev) => {
                return { ...prev, 'name': false }
            })
        }
    };
    const eventDescriptionHandler = (value) => {
        setEventDescription(value);
        if (value.trim() == "") {
            setError((prev) => {
                return { ...prev, 'description': true }
            })
        } else {
            setError((prev) => {
                return { ...prev, 'description': false }
            })
        }
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


    const saveNewEventHandler = async () => {
        const newKeyValuePairs = keyValuePairs.filter((pair) => pair.key.trim() != '')
        const newData = {
            "tag": eventTag,
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

    const nextButtonHandler = () => {
        if (error.name || error.description || error.tag) {
            console.log("nextButtonHandler", error.name, error.description, error.tag)
            setShowError(true)
        }
        else {
            setAddProperty(true)
        }
    }

    const backButtonHandler = () => {
        setKeyValuePairs([{ key: '', dataType: 'string', required: 'false' }])
        setAddProperty(false)
    }

    const closeHandler = () => {
        setKeyValuePairs([{ key: '', dataType: 'string', required: 'false' }])
        setEventDescription('')
        setEventName('')
        setEventTag('')
        setAddProperty(false);
        setAddNewEvent(false)
    }

    return (
        <div className='text-black py-l'>
            <div className='flex justify-between items-center ' >
                <div>
                    <div className='text-f-2xl font-semibold'>
                        Event Manager
                    </div>
                    <div className='text-f-m'>
                        Create and manage event definitions for tracking
                    </div>
                </div>
                <button className='default-button py-s text-center' onClick={() => { setAddNewEvent(true) }}>
                    <span className='pr-l text-f-xl '>+</span> Create Event
                </button>

            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-xl mt-xl  ">
                {customEventTypes.length > 0 && customEventTypes.map((eventData, index) => (<Card key={index} data={eventData} />))}
            </div>
            {addNewEvent && <div className='fixed top-0 left-0 inset-0 bg-black z-50 bg-opacity-50 flex items-center justify-center'>
                <div className='w-[80vw] bg-white   rounded-bs'>
                    <div className='p-l font-normal text-f-2xl border-b  flex justify-between items-center'>
                        <div>Create New Event
                        </div>
                        <RiCloseFill className='w-6 h-6 cursor-pointer' onClick={closeHandler} />
                    </div>
                    {!addProperty ? <div className='flex p-l gap-l min-h-[450px]'>
                        <div className='flex-1 '>
                            <div className=" space-y-1">
                                <div className='text-f-m'>Tag</div>
                                <input
                                    type="text"
                                    className="p-2 border border-gray-300 rounded-md w-[60%] border-effect transition"
                                    placeholder="Enter the tag"
                                    onChange={(e) => eventTagHandler(e.target.value)}
                                    value={eventTag}
                                />
                                {error.tag && showError && <div className='text-f-s text-red-500'>This field is required.</div>}
                            </div>
                            <div className="mt-l space-y-1">
                                <div className='text-f-m'>Event Name</div>
                                <input
                                    type="text"
                                    className="p-2 border border-gray-300 rounded-md w-[80%] border-effect transition"
                                    placeholder="Enter event name"
                                    onChange={(e) => eventNameHandler(e.target.value)}
                                    value={eventName}
                                />
                                {error.name && showError && <div className='text-f-s text-red-500'>This field is required.</div>}
                            </div>
                            <div className="mt-l space-y-1">
                                <div className='text-f-m'>Event Description</div>
                                <textarea
                                    className="p-2 border border-gray-300 rounded-md w-full h-[200px] border-effect transition resize-none"
                                    placeholder="Enter event description"
                                    onChange={(e) => eventDescriptionHandler(e.target.value)}
                                    value={eventDescription}
                                    maxLength={200}
                                />
                                {error.description && showError && <div className='text-f-s text-red-500'>This field is required.</div>}
                            </div>
                        </div>
                        <div className=' flex flex-col flex-1 justify-center items-center'>
                            <Image
                                src={h3}
                                alt="Illustration"
                                className="w-[80%] object-contain max-w-full rounded-bs"
                            />
                            <div className="text-center  mt-4 text-gray-600 ">
                                Unveiling Behavioral Patterns: Harnessing Geospatial Clustering for Smarter Insights and Decision-Making
                            </div>
                        </div>

                    </div> : <div className='flex p-l  gap-xl min-h-[450px]'>
                        <div className='flex flex-1 flex-col'>
                            <div className=' text-black    flex '>
                                <div className='bg-secondary-900 text-white px-xl py-s rounded-bs border-2 border-secondary-900'>
                                    Event Name
                                </div>
                            </div>
                            <div className='w-full h-xl  flex justify-end '>
                                <div className=' h-full w-[90%] relative  border-l-2  border-secondary-900'>

                                </div>
                            </div>
                            {eventName.trim() !== "" && eventDescription.trim() != '' &&
                                <div className=" pb-l h-[350px] overflow-scroll hide-scrollbar">
                                    {keyValuePairs.map((pair, index) => (
                                        <KeyValueTabs
                                            key={index}
                                            index={index}
                                            pair={pair}
                                            onChange={handleKeyValueChange}
                                            onDelete={handleDeleteKeyValue}
                                        />
                                    ))}
                                </div>
                            }

                        </div>
                        <div className=' flex flex-col flex-1 justify-center items-center '>
                            <Image
                                src={h3}
                                alt="Illustration"
                                className="w-[80%] object-contain max-w-full rounded-bs"
                            />
                            <div className="text-center  mt-4 text-gray-600 ">
                                Unveiling Behavioral Patterns: Harnessing Geospatial Clustering for Smarter Insights and Decision-Making
                            </div>
                        </div>

                    </div>}
                    {!addProperty ? <div className='p-l flex justify-between border-t'>
                        <button className='default-button' onClick={closeHandler}>Cancel</button>
                        <button className='default-button px-xl' onClick={nextButtonHandler}>Next</button>
                    </div> : <div className='p-l flex justify-between border-t'>
                        <button className='default-button' onClick={backButtonHandler}>Back</button>
                        <button className='default-button px-xl' onClick={saveNewEventHandler}>Save</button>
                    </div>}
                </div>

            </div>}
        </div>
    )
}

export default EventManager;


const Card = ({ data }) => {
    return <div className='col-span-1 rounded-bs p-l border'>

        <div className='flex justify-between items-center '>
            <div className='bg-secondary-900 text-white text-f-m px-s py-xs rounded-bs'>Active</div>
            <div className='bg-white border text-black text-f-m px-s py-xs rounded-bs'>{data.tag ? data.tag : "Undefined"}</div>
        </div>
        <div className='pt-s text-f-l font-semibold'>
            {data.name ? data.name : "Undefined"}
        </div>
        <div className='pt-xs text-f-m text-neutral-900 '>
            {data.description ? data.description.length > 50 ? data.description.slice(0, 50) + ".." : data.description : "Undefined"}
        </div>
        <div className='pt-xs text-f-m text-neutral-1200 flex justify-between items-center'>
            <div>
                Properties :
            </div>
            <div className='border  px-xs rounded-full'>
                {data.properties.length}
            </div>
        </div>
        <div className='flex flex-wrap pt-s gap-s'>
            {data.properties.length > 3 ?
                data.properties.slice(0, 3).map((property, index) => (<div key={index} className='text-f-m bg-neutral-100 px-s rounded-bs text-neutral-1200'>{property.key}</div>))
                : data.properties.map((property, index) => (<div key={index} className='text-f-m bg-neutral-100 px-s rounded-bs text-neutral-1200'>{property.key}</div>))}

            {data.properties.length > 3 && <button className='text-f-m bg-neutral-100 px-s rounded-bs text-neutral-1200 hover:bg-neutral-200'>+{data.properties.length - 3} more</button>}
        </div>
        <div className='pt-l text-f-m text-neutral-900'>
            Updated : {data.updatedAt.split('T')[0]}
        </div>
    </div>
}


const KeyValueTabs = ({ index, pair, onChange, onDelete }) => {
    const [selectedOption, setSelectedOption] = useState(valueRequired[0].value);
    const [selectedValueOption, setSelectedValueOption] = useState(valueType[0].value);

    return <div className='w-full h-5xl  flex justify-end '>
        <div className=' h-full w-[90%] relative  border-l-2 border-b-2  border-secondary-900'>
            <div className='flex gap-l w-[90%] justify-end  mt-l right-0  absolute -bottom-4 items-center bg-white '>
                <div className='flex-1'>
                    <div className='text-f-xs mb-xs text-neutral-900'>Key</div>
                    <input
                        type="text"
                        className=" border border-gray-300 rounded-bs w-full border-effect transition text-f-s"
                        placeholder="Key"
                        value={pair.key}
                        onChange={(e) => onChange(index, 'key', e.target.value)}
                    />
                </div>
                <div className='flex-1'>
                    <div className='text-f-xs mb-xs text-neutral-900'>Required</div>
                    <Select
                        options={valueType}
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
                <button className=' bg-white' onClick={() => onDelete(index)}>
                    <div className='text-f-xs mb-xs  text-white'>Delete</div>
                    <MdDeleteForever className='w-6 h-6  bg-white' />
                </button>

            </div>
        </div>

    </div>
}