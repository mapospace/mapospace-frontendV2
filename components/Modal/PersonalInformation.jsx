import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import React, { useState } from 'react'

const PersonalInformation = ({ modalClose, detail, setUserDetails }) => {
    const [formData, setFormData] = useState({
        contactEmail: detail.contactEmail,
        contactPhone: detail.contactPhone,
        industry: detail.industry
    })
    const [error, setError] = useState({
        contactEmail: '',
        contactPhone: '',
        industry: ''
    });

    const ChangeHandler = (e) => {
        const { id, value } = e.target;
        let newErrors = { ...error };

        if (id === "contactEmail") {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                newErrors.contactEmail = "Email is required";
            } else if (!emailRegex.test(value)) {
                newErrors.contactEmail = "Invalid email format";
            } else {
                delete newErrors.contactEmail;
            }
        }

        if (id === "contactPhone") {
            // Phone number validation (allow only numbers and min 10 digits)
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!value) {
                newErrors.contactPhone = "Phone number is required";
            } else if (!phoneRegex.test(value)) {
                newErrors.contactPhone = "Invalid phone number (10-15 digits required)";
            } else {
                delete newErrors.contactPhone;
            }
        }

        if (id === "industry") {
            // Industry validation (required, at least 3 characters)
            if (!value) {
                newErrors.industry = "Industry is required";
            } else {
                delete newErrors.industry;
            }
        }

        setFormData({ ...formData, [id]: value });
        setError(newErrors);
    };

    const submitHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.putApiCallHandler(API_ENDPOINTS.PutTenant, formData);

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
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="custom-label">Email<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="email"
                            id="contactEmail"
                            className="border-effect"
                            placeholder="Enter your email"
                            value={formData.contactEmail}
                            onChange={ChangeHandler}
                        />
                        {error.contactEmail && <p className='custom-error'>{error.contactEmail}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="phone" className="custom-label">Phone<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="tel"
                            id="contactPhone"
                            className="border-effect"
                            placeholder="Enter your phone number"
                            value={formData.contactPhone}
                            onChange={ChangeHandler}
                        />
                        {error.contactPhone && <p className='custom-error'>{error.contactPhone}</p>}
                    </div>

                    {/* Industry Field */}
                    <div className="flex flex-col">
                        <label htmlFor="industry" className="custom-label">Industry<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="industry"
                            className="border-effect"
                            placeholder="Enter your industry"
                            value={formData.industry}
                            onChange={ChangeHandler}
                        />
                        {error.industry && <p className='custom-error'>{error.industry}</p>}
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

export default PersonalInformation