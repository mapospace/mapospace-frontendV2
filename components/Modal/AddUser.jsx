import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import React, { useState } from 'react'

const AddUser = ({ modalClose, setAddNewUser }) => {
    const [formData, setFormData] = useState({
        businessEmail: '',
        firstName: '',
        lastName: '',
        password: ''
    })
    const [error, setError] = useState({
        businessEmail: '',
        firstName: '',
        lastName: '',
        password: ''
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
        else {
            if (!value) {
                newErrors.industry = "This field is required";
            }
            else {
                delete newErrors.industry;
            }
        }



        setFormData({ ...formData, [id]: value });
        setError(newErrors);
    };

    const submitHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.AddUser, formData);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("response?.data", response?.data)
            // setUserDetails(response?.data.tenant);
            setAddNewUser(prev => prev + 1)
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
                <div className='border-y border-neutral-400 p-xl flex flex-col gap-m'>
                    <div className='flex gap-s'>
                        <div className="flex flex-col flex-1 ">
                            <label htmlFor="firstName" className="custom-label">First Name<span className='text-red-500 ml-xs'>*</span></label>
                            <input
                                type="text"
                                id="firstName"
                                className="border-effect"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={ChangeHandler}
                            />
                            {error.firstName && <p className='custom-error'>{error.firstName}</p>}
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="lastName" className="custom-label">Last Name<span className='text-red-500 ml-xs'>*</span></label>
                            <input
                                type="text"
                                id="lastName"
                                className="border-effect"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={ChangeHandler}
                            />
                            {error.lastName && <p className='custom-error'>{error.lastName}</p>}
                        </div>

                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="businessEmail" className="custom-label">Email<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="businessEmail"
                            className="border-effect"
                            placeholder="Enter your business email"
                            value={formData.businessEmail}
                            onChange={ChangeHandler}
                        />
                        {error.businessEmail && <p className='custom-error'>{error.businessEmail}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="custom-label">Password<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="password"
                            className="border-effect"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={ChangeHandler}
                        />
                        {error.password && <p className='custom-error'>{error.password}</p>}
                    </div>

                </div>
                <div className='p-l text-f-xl text-black flex gap-s justify-end'>
                    <button className='px-s py-xs text-f-l  text-black border border-secondary-900 hover:border-secondary-500  rounded-lg' onClick={modalClose}>Cancel</button>
                    <button className='px-s py-xs text-f-l bg-secondary-900 hover:bg-secondary-800 text-white border border-secondary-900 rounded-lg' onClick={submitHandler}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddUser