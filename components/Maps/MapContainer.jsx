import React, { useState } from 'react'
import Maps from './Maps'
import { IoCloseSharp } from "react-icons/io5";
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { customSuccess } from '../Common/Toast';

const MapContainer = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })
    const [error, setError] = useState({
        name: "",
        description: "",
    });

    const [saveForm, setSaveForm] = useState(false)
    const [currentPolygon, setCurrentPolygon] = useState([]);
    const [polygonSaved, setPolygonSaved] = useState(false);

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

    const saveHandler = async () => {
        if (isValidatedHandler) {
            setSaveForm(false)
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

    return (
        <div className='relative overflow-hidden'>
            <Maps setSaveForm={setSaveForm} setCurrentPolygon={setCurrentPolygon} polygonSaved={polygonSaved} />
            {saveForm && <div className='absolute w-[350px] h-full -right-0 top-0 bg-white flex justify-between flex-col transition-transform rounded-l-md'>
                <div className=' px-m'>
                    <div className='py-s text-f-xl text-black border-b font-semibold flex justify-between'>
                        <div>Save</div>
                        <IoCloseSharp className='cursor-pointer w-5 h-5' onClick={() => { setSaveForm(false) }} />
                    </div>
                    <div className="flex flex-col  mt-xl mb-4">
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
                    <div className="flex flex-col mb-4">
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
                <div className='px-m py-l border-t flex justify-end'>
                    <button className='bg-secondary-900 text-white px-m py-xs rounded-lg' onClick={saveHandler}>
                        {polygonSaved ? "Saved" : "Save"}
                    </button>
                </div>

            </div>}
        </div >
    )
}

export default MapContainer