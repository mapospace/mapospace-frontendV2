import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import React, { useState } from 'react'

const Address = ({ modalClose, detail, setUserDetails }) => {
    const [formData, setFormData] = useState({
        street: detail.address.street,
        city: detail.address.city,
        state: detail.address.state,
        zipCode: detail.address.zipCode,
        country: detail.address.country
    })
    const [error, setError] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const ChangeHandler = (e) => {
        const { id, value } = e.target;
        let newErrors = { ...error };



        // if (id === "industry") {
        // Industry validation (required, at least 3 characters)
        if (!value) {
            newErrors.industry = "Industry is required";
        } else {
            delete newErrors.industry;
        }
        // }

        setFormData({ ...formData, [id]: value });
        setError(newErrors);
    };

    const submitHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.putApiCallHandler(API_ENDPOINTS.PutTenant, { address: formData });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("response?.data", response?.data)
            setUserDetails(response?.data.tenant);
            modalClose()
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
        console.log("submitHandler", formData)
    }

    return (
        <div className='absolute inset-0 top-0 left-0 bg-black bg-opacity-50 z-50 overflow-hidden flex items-center justify-center'>
            <div className='max-w-[550px] bg-white w-full md:w-[600px] rounded-lg'>
                <div className='p-l text-f-xl text-black'>
                    Personal Information
                </div>
                <div className='border-y border-neutral-400 p-xl'>
                    <div className="flex flex-col">
                        <label htmlFor="street" className="custom-label">Street<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="street"
                            className="border-effect"
                            placeholder="Enter your street"
                            value={formData.street}
                            onChange={ChangeHandler}
                        />
                        {error.street && <p className='custom-error'>{error.street}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="city" className="custom-label">City<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="city"
                            className="border-effect"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={ChangeHandler}
                        />
                        {error.street && <p className='custom-error'>{error.street}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="state" className="custom-label">State<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="state"
                            className="border-effect"
                            placeholder="Enter your state"
                            value={formData.state}
                            onChange={ChangeHandler}
                        />
                        {error.street && <p className='custom-error'>{error.street}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="country" className="custom-label">Country<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="country"
                            className="border-effect"
                            placeholder="Enter your country"
                            value={formData.country}
                            onChange={ChangeHandler}
                        />
                        {error.street && <p className='custom-error'>{error.street}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="zipCode" className="custom-label">ZipCode<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="zipCode"
                            className="border-effect"
                            placeholder="Enter your zipCode"
                            value={formData.zipCode}
                            onChange={ChangeHandler}
                        />
                        {error.street && <p className='custom-error'>{error.street}</p>}
                    </div>
                </div>
                <div className='p-l text-f-xl text-black flex gap-s justify-end'>
                    <button className='px-s py-xs text-f-l  text-black border border-secondary-900 hover:border-secondary-500  rounded-lg' onClick={modalClose}>Cancel</button>
                    <button className='px-s py-xs text-f-l bg-secondary-900 hover:bg-secondary-800 text-white border border-secondary-900 rounded-lg' onClick={submitHandler}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Address