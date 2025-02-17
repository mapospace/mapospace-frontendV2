import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const AddGroup = ({ modalClose, setAddNewGroup, userList }) => {
    const [formData, setFormData] = useState({
        name: '',
        userIds: [],
        groupAdminId: ''
    });
    const [error, setError] = useState({
        name: '',
        userIds: [],
        groupAdminId: ''
    });
    const [users, setUsers] = useState([]);



    useEffect(() => {
        setUsers(userList.map(user => ({ value: user._id, label: user.firstName + " " + user.lastName })));
    }, []);

    const handleSingleSelectChange = (selectedOption) => {
        setFormData(prevState => ({ ...prevState, groupAdminId: selectedOption ? selectedOption.value : '' }));
    };

    const handleMultiSelectChange = (selectedOptions) => {
        setFormData(prevState => ({ ...prevState, userIds: selectedOptions ? selectedOptions.map(option => option.value) : [] }));
    };

    const ChangeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const submitHandler = async () => {
        try {
            setFormData({ ...formData, userIds: [...formData.userIds, formData.groupAdminId] });
            console.log("submitHandler", formData)
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.GroupCreate, formData);
            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            setAddNewGroup(prev => prev + 1);
            modalClose();
        } catch (err) {
            console.error("Error submitting group details:", err);
        }
    };

    return (
        <div className='absolute inset-0 top-0 left-0 bg-black bg-opacity-50 z-50 overflow-hidden flex items-center justify-center'>
            <div className='max-w-[550px] bg-white w-full md:w-[600px] rounded-lg p-l'>
                <div className='text-f-xl text-black'>
                    Group Details
                </div>
                <div className='border-y border-neutral-400 p-xl flex flex-col gap-m'>
                    <div className="flex flex-col flex-1 ">
                        <label htmlFor="firstName" className="custom-label">Group Name<span className='text-red-500 ml-xs'>*</span></label>
                        <input
                            type="text"
                            id="name"
                            className="border-effect"
                            placeholder="Enter your group name"
                            value={formData.name}
                            onChange={ChangeHandler}
                        />
                        {error.firstName && <p className='custom-error'>{error.firstName}</p>}
                    </div>

                    <div className="flex flex-col flex-1 ">
                        <label htmlFor="firstName" className="custom-label">Group Admin<span className='text-red-500 ml-xs'>*</span></label>
                        <Select
                            options={users}
                            value={users.find(option => option.value === formData.groupAdminId)}
                            onChange={handleSingleSelectChange}
                            placeholder='Select the Group Admin'
                            isClearable
                            className='text-black '
                        />
                        {error.firstName && <p className='custom-error'>{error.firstName}</p>}
                    </div>

                    <div className="flex flex-col flex-1 ">
                        <label htmlFor="firstName" className="custom-label">Group Users<span className='text-red-500 ml-xs'>*</span></label>
                        <Select
                            options={users}
                            value={users.filter(option => formData.userIds.includes(option.value))}
                            onChange={handleMultiSelectChange}
                            placeholder='Select Users'
                            isMulti
                            className='text-black'
                        />
                        {error.firstName && <p className='custom-error'>{error.firstName}</p>}
                    </div>



                </div>
                <div className='p-l text-f-xl text-black flex gap-s justify-end'>
                    <button className='px-s py-xs text-f-l text-black border border-secondary-900 hover:border-secondary-500 rounded-lg' onClick={modalClose}>Cancel</button>
                    <button className='px-s py-xs text-f-l bg-secondary-900 hover:bg-secondary-800 text-white border border-secondary-900 rounded-lg' onClick={submitHandler}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddGroup;
