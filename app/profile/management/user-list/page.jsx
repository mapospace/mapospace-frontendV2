'use client'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { TiUserAdd } from "react-icons/ti";
import AddUser from '@/components/Modal/AddUser';

const page = () => {

    const [userList, setUserList] = useState([])
    const [addUser, setAddUser] = useState(false);
    const [addNewUser, setAddNewUser] = useState(0);

    const fetchDetails = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.UserList);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("user list", response?.data.data.docs)
            setUserList(response?.data?.data?.docs);
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    };

    useEffect(() => {
        fetchDetails()
    }, [addNewUser])

    const addUserModalOpen = () => {
        setAddUser(true);
    }
    const addUserModalClose = () => {
        setAddUser(false);
    }
    return (
        <div className="mb-6 flex flex-col flex-grow gap-6 ">
            {addUser && <AddUser modalClose={addUserModalClose} setAddNewUser={setAddNewUser} />}
            <div className='text-black font-normal text-f-4xl border-b pb-m  flex justify-between items-center'>
                <div>
                    Users
                </div>
                <div className='flex items-end  gap-xs border border-black py-xs px-s rounded-md cursor-pointer' onClick={addUserModalOpen}>

                    <TiUserAdd className='w-6 h-6' />
                    {/* <p className='text-f-xl bg-red-300 text-end'>Add</p> */}
                </div>
            </div>
            <div className='bg-neutral-100 px-xl py-s relative' >
                <div className='absolute text-white top-2 rounded-md right-2 text-f-xl bg-secondary-900 flex border-b border-black px-s py-xs '>
                    Admin
                </div>
                {userList.map((user, index) => (user.rootUser && <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-l ">
                    <div className='text-black text-f-l '>
                        <div className='font-semibold'>First Name</div>
                        <div className='text-neutral-900'>{user.firstName}</div>
                    </div>
                    <div className='text-black text-f-l '>
                        <div className='font-semibold'>Last Name</div>
                        <div className='text-neutral-900'>{user.lastName}</div>
                    </div>
                    <div className='text-black text-f-l '>
                        <div className='font-semibold'>Email</div>
                        <div className='text-neutral-900'>{user.businessEmail}</div>
                    </div>
                </div>))}

            </div>
            <div className='text-neutral-900 text-f-xl border-b pb-xs'>
                List Of Users
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
                            <th className="px-l text-f-m py-m text-center">ID</th>
                            <th className="px-l text-f-m py-m text-center">FIRST NAME</th>
                            <th className="px-l text-f-m py-m text-center">LAST NAME</th>
                            <th className="px-l text-f-m py-m text-center">EMAIL</th>
                            <th className="px-l text-f-m py-m text-center">VERIFIED</th>
                            <th className="px-l text-f-m py-m text-center">ROOT USER</th>
                            <th className="px-l text-f-m py-m text-center">ACTIVE</th>
                            <th className="px-l text-f-m py-m text-center">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (!user.rootUser && <UserElement user={user} key={index} index={index} />))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default page;


const UserElement = ({ user, index }) => {
    const [isActive, setIsActive] = useState(user.active);

    const toggleHandler = async (user_Id) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.UserActiveToggle, { userId: user_Id });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("user list", response?.data)
            setIsActive(!isActive)
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    }

    return <tr className="border-t text-gray-700 text-sm">
        <td className="px-l text-f-l text-center py-m font-medium">{index}</td>
        <td className="px-l text-f-l text-center py-m font-medium">{user.firstName}</td>
        <td className="px-l text-f-l text-center py-m">{user.lastName}</td>
        <td className="px-l text-f-l text-center  py-m">{user.businessEmail}</td>
        <td className="px-l text-f-m text-center py-m text-xl  ">
            <div className='flex items-center justify-center'>
                {user.verified ? <IoMdCheckmarkCircle className='text-green-500  w-2xl h-2xl ' /> : <RxCross2 className='bg-red-500  w-xl h-xl text-white rounded-full' />}
            </div>
        </td>
        <td className="px-l text-center py-m text-xl ">
            <div className='flex items-center justify-center  rounded-full'>
                {user.rootUser ? <IoMdCheckmarkCircle className='text-green-500  w-2xl h-2xl ' /> : <RxCross2 className='bg-red-500  w-xl h-xl text-white rounded-full' />}

            </div>
        </td>
        <td className="px-l text-center py-m ">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={() => toggleHandler(user._id)}
                />
                <div className="w-10 h-5 bg-gray-300 peer-focus:ring-1 peer-focus:ring-purple-300 rounded-lg peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
        </td>

        <td className="px-l text-f-l text-center  py-m">NA</td>
    </tr>
}