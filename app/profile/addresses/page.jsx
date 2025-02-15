'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../../public/assets/logo.png'
import { API_ENDPOINTS } from '@/utils/api-endpoints'
import AuthServices from '@/utils/axios-api'
import PersonalInformation from '@/components/Modal/PersonalInformation'
import Address from '@/components/Modal/Address'

const page = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [personalInformationModal, setPersonalInformationModal] = useState(false);
    const [addressModal, setAddressModal] = useState(false);

    const fetchDetails = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.GetTenant);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("response?.data", response?.data)
            setUserDetails(response?.data.data);
        } catch (err) {
            console.error("Error fetching user details:", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [])

    const personalInformationModalOpen = () => {
        setPersonalInformationModal(true);
    }
    const personalInformationModalClose = () => {
        setPersonalInformationModal(false);
    }

    const addressModalOpen = () => {
        setAddressModal(true);
    }
    const addressModalClose = () => {
        setAddressModal(false);
    }

    return (
        <div className=" bg-white  w-full flex flex-col rounded-lg overflow-hidden pb-2xl ">
            {/* <div className="w-full bg-white shadow-md rounded-lg p-6"> */}
            {/* User Header */}
            {personalInformationModal && <PersonalInformation modalClose={personalInformationModalClose} detail={userDetails} setUserDetails={setUserDetails} />}
            {addressModal && <Address modalClose={addressModalClose} detail={userDetails} setUserDetails={setUserDetails} />}

            <div className='text-black font-normal text-f-4xl border-b pb-m mb-xl'>
                Information
            </div>
            {userDetails ? <>
                <div className="flex items-center space-x-4 p-m border rounded-lg  shadow  bg-white">
                    <Image
                        src={logo} // Replace with actual image path
                        alt="User"

                        className="rounded-full object-contain  border w-6xl h-6xl p-s"
                    />
                    <div className="flex-1">
                        <h2 className="text-f-xl font-semibold text-gray-900 uppercase">{userDetails.companyName}</h2>
                        <p className="text-f-m text-gray-600">{userDetails.address.state}</p>
                        <p className="text-f-m text-gray-600">{userDetails.address.country}, {userDetails.address.zipCode}</p>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="mt-4 bg-white border rounded-lg shadow  ">
                    <div className="flex justify-between items-center border-b p-m">
                        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                        <button className="bg-secondary-900  text-white px-l py-xs text-sm rounded hover:bg-secondary-800" onClick={personalInformationModalOpen}>Edit</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4  p-m text-gray-700">
                        <div>
                            <p className="text-f-l font-normal">Email</p>
                            <p className="text-sm">{userDetails.contactEmail}</p>
                        </div>
                        <div>
                            <p className="text-f-l font-normal">Phone no.</p>
                            <p className="text-sm">{userDetails.countryCode} {userDetails.contactPhone}</p>
                        </div>
                        {/* <div>
                            <p className="text-f-l font-normal">Business Email Domain</p>
                            <p className="text-sm">{userDetails.businessEmailDomain}</p>
                        </div> */}
                        <div>
                            <p className="text-f-l font-normal">Industry</p>
                            <p className="text-sm">{userDetails.industry}</p>
                        </div>

                    </div>
                </div>

                {/* Address Section */}
                <div className="mt-4 bg-white border rounded-lg shadow">
                    <div className="flex justify-between items-center p-m border-b">
                        <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                        <button className="bg-secondary-900 px-4 py-1 text-sm rounded hover:bg-secondary-800" onClick={addressModalOpen}>Edit</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-m text-gray-700">
                        <div>
                            <p className="text-f-l font-normal">Street</p>
                            <p className="text-sm">{userDetails.address.street}</p>
                        </div>
                        <div>
                            <p className="text-f-l font-normal">State</p>
                            <p className="text-sm">{userDetails.address.state}</p>
                        </div>
                        <div>
                            <p className="text-f-l font-normal">Country</p>
                            <p className="text-sm">{userDetails.address.country}</p>
                        </div>
                        <div>
                            <p className="text-f-l font-normal">City</p>
                            <p className="text-sm">{userDetails.address.city}</p>
                        </div>
                        <div>
                            <p className="text-f-l font-normal">Postal Code</p>
                            <p className="text-sm">{userDetails.address.zipCode}</p>
                        </div>
                    </div>
                </div>
            </> : <div>No Details Found</div>}

            {/* </div> */}
        </div>
    )
}

export default page