'use client'
import React, { useState } from 'react'

const page = () => {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        businessEmail: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newUser.firstName) newErrors.firstName = 'First name is required';
        if (!newUser.lastName) newErrors.lastName = 'Last name is required';
        if (!newUser.businessEmail) {
            newErrors.businessEmail = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(newUser.businessEmail)) {
            newErrors.businessEmail = 'Email is invalid';
        }
        if (!newUser.password) {
            newErrors.password = 'Password is required';
        } else if (newUser.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(newUser);
            setNewUser({ firstName: '', lastName: '', businessEmail: '', password: '' }); // Reset form
            setErrors({});
        }
    };

    return (
        <div className="mb-6 flex flex-col flex-grow gap-6 ">
            <div className='flex flex-col sc-sm:flex-row  justify-between sc-sm:items-center '>
                <h1 className="text-[32px] font-light text-black">
                    Add new User
                </h1>


            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                    type="email"
                    name="businessEmail"
                    placeholder="Business Email"
                    value={newUser.businessEmail}
                    onChange={handleInputChange}
                    className={`border p-2 rounded font-poppins border-effect ${errors.businessEmail ? 'border-red-500' : ''}`}
                />
                {errors.businessEmail && <p className="text-red-500 text-sm">{errors.businessEmail}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newUser.firstName}
                    onChange={handleInputChange}
                    className={`border p-2 rounded font-poppins border-effect ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newUser.lastName}
                    onChange={handleInputChange}
                    className={`border p-2 rounded font-poppins border-effect ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className={`border p-2 rounded font-poppins border-effect ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex justify-end space-x-2">
                {/* <button className="bg-gray-300 text-black px-4 py-2 rounded font-poppins">Cancel</button> */}
                <button onClick={handleSave} className=" text-white px-4 py-2 rounded font-poppins default-button">Save Changes</button>
            </div>
        </div>
    )
}

export default page