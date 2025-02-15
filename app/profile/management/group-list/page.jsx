'use client'
import React, { useEffect, useState } from 'react'
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { MdGroupAdd } from "react-icons/md";
import AddGroup from '@/components/Modal/AddGroup';
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

const page = () => {

    const [groupList, setGroupList] = useState([])
    const [addGroup, setAddGroup] = useState(false);
    const [addNewGroup, setAddNewGroup] = useState(0);
    const [userList, setUserList] = useState([])

    const fetchDetails = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.GroupList);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("user list", response?.data.data)
            setGroupList(response?.data?.data);
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    };

    const fetchUserList = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.UserListWithoutRoot);

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
        fetchUserList()
    }, [])

    useEffect(() => {
        fetchDetails();
    }, [addNewGroup])

    const addUserModalOpen = () => {
        setAddGroup(true);
    }
    const addUserModalClose = () => {
        setAddGroup(false);
    }
    return (
        <div className="mb-6 flex flex-col flex-grow gap-6 ">
            {addGroup && <AddGroup modalClose={addUserModalClose} setAddNewGroup={setAddNewGroup} userList={userList} />}
            <div className='text-black font-normal text-f-4xl border-b pb-m  flex justify-between items-center'>
                <div>
                    Groups
                </div>
                <div className='flex items-end  gap-xs border border-black py-xs px-s rounded-md cursor-pointer' onClick={addUserModalOpen}>

                    <MdGroupAdd className='w-6 h-6' />
                    {/* <p className='text-f-xl bg-red-300 text-end'>Add</p> */}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
                            <th className="px-l text-f-m py-m text-center">ID</th>
                            <th className="px-l text-f-m py-m text-center">GROUP NAME</th>
                            <th className="px-l text-f-m py-m text-center">ADMIN</th>
                            <th className="px-l text-f-m py-m text-center">USER</th>

                            <th className="px-l text-f-m py-m text-center">ACTIVE</th>
                            <th className="px-l text-f-m py-m text-center">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList.map((group, index) => (<GroupElement group={group} setAddNewGroup={setAddNewGroup} key={index} index={index + 1} />))}
                    </tbody>

                </table>
            </div>


        </div>
    )
}

export default page;


const GroupElement = ({ group, index, setAddNewGroup }) => {
    const [isActive, setIsActive] = useState(group.active);

    const toggleHandler = async (group_Id) => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.GroupActiveToggle(group_Id));

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

    const deleteHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.deleteApiCallHandler(API_ENDPOINTS.GroupDelete(group._id));

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("user list", response?.data)
            // setIsActive(!isActive)
            setAddNewGroup(prev => prev + 1)
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    }
    return <tr className="border-t text-gray-700 text-sm">
        <td className="px-l text-f-l text-center py-m font-medium">{index}</td>
        <td className="px-l text-f-l text-center py-m">{group.name}</td>
        <td className="px-l text-f-l text-center py-m">{group.groupAdmin.firstName} {group.groupAdmin.lastName}</td>
        <td className="px-l text-f-l text-center py-m "> {group.users.length}</td>
        <td className="px-l text-center py-m ">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={() => toggleHandler(group._id)}
                />
                <div className="w-10 h-5 bg-gray-300 peer-focus:ring-1 peer-focus:ring-purple-300 rounded-lg peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
        </td>

        <td className="px-l text-f-l text-center  py-m ">
            <div className='flex items-center justify-center gap-s'>
                <MdDelete className='w-5 h-5 cursor-pointer  hover:text-secondary-900' onClick={deleteHandler} />
                <RiEditFill className='w-5 h-5 cursor-pointer  hover:text-secondary-900' />
            </div>
        </td>
    </tr>
}