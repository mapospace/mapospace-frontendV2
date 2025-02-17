'use client'
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import Select from 'react-select';

const Filter = ({ close }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [mounted, setMounted] = useState(false);

    const categories = [
        { value: "electronics", label: "Electronics" },
        { value: "clothing", label: "Clothing" },
        { value: "clothing2", label: "Clothing" },
        { value: "clothing21", label: "Clothing" },
        { value: "clothing212", label: "Clothing" },
        { value: "clothing212e", label: "Clothing" },

        { value: "home_appliances", label: "Home Appliances" }
    ];

    const subCategories = [
        { value: "mobile", label: "Mobile Phones" },
        { value: "laptop", label: "Laptops" },
        { value: "tshirt", label: "T-Shirts" }
    ];

    const products = [
        { value: "iphone", label: "iPhone 14" },
        { value: "macbook", label: "MacBook Air" },
        { value: "samsung_tv", label: "Samsung 55\" TV" }
    ];

    useEffect(() => {
        setMounted(true); // Ensures that DatePicker only renders on the client
    }, []);

    const customStyles = {
        multiValue: (provided) => ({
            ...provided,
            display: "inline-flex", // Keeps the items in a single line
        }),
        multiValueContainer: (provided) => ({
            ...provided,
            overflowX: "auto", // Enables horizontal scrolling
            whiteSpace: "nowrap",
            maxWidth: "100%",
        }),

        valueContainer: (provided) => ({
            ...provided,
            display: "flex",
            flexWrap: "nowrap", // Prevents wrapping into new lines
            overflowX: "auto",
            maxWidth: "100%",
        }),
        control: (provided, state) => ({
            ...provided,
            borderWidth: "1px",
            overflowX: "auto",
            display: "flex",
            whiteSpace: "nowrap",
            borderColor: state.isFocused ? "#0136f8" : "#bfbfbf", // Blue border on focus
            // boxShadow: state.isFocused ? "0 0 5px rgba(74, 144, 226, 0.5)" : "none",
            "&:hover": {
                borderColor: "#0136f8",
            },
            borderRadius: "8px", // Rounded corners
            padding: "2px",
            fontSize: "14px"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#9CA3AF", // Custom placeholder color (gray-500)
            fontWeight: "400",
            fontSize: "14px"
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#4A90E2", // Change dropdown arrow color
            "&:hover": {
                color: "#1E40AF",
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#F3F4F6", // Light gray background
            borderRadius: "8px",
            fontSize: "14px"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#4A90E2" : state.isFocused ? "#E5E7EB" : "white",
            color: state.isSelected ? "white" : "black",
            "&:hover": {
                backgroundColor: "#E5E7EB",
                color: "black",
            },
        }),
    };

    if (!mounted) return null;
    return (
        <div className=' absolute w-[400px] z-30 bg-white border border-neutral-400 rounded-m top-16 right-0' >
            <div className=' p-m flex gap-s items-center justify-between border-b border-neutral-400'>
                <div className='flex gap-s items-center text-black'>
                    <FaFilter className='w-4 h-4 ' />
                    <span>Filter</span>
                </div>
                <button onClick={() => { close(false) }}>
                    <MdOutlineClose className='w-6 h-6 text-black' />
                </button>
            </div>

            <div className='h-[400px] overflow-y-scroll hide-scrollbar'>
                <div className=' p-m flex flex-col border-b border-neutral-400 gap-s'>
                    <div className='flex justify-between items-center text-f-m'>
                        <div>Date Range</div>
                        <button className='text-secondary-900'>Reset</button>
                    </div>
                    <div className=' flex gap-s '>

                        <div className="flex flex-1 flex-col gap-xs">
                            <label className="block text-sm font-medium text-gray-700">From</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="border  text-f-m  rounded-md p-2 w-full border-effect focus:border"
                                placeholderText="Start date and time"
                                popperPlacement="bottom-start"
                            />
                        </div>

                        {/* End Date Picker */}
                        <div className="flex flex-1 flex-col gap-xs">
                            <label className="block text-sm font-medium text-gray-700">To</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="border text-f-m rounded-md p-2 w-full border-effect "
                                placeholderText="End date and time"
                                popperPlacement="bottom-end"  // Change this for desired positioning

                            />
                        </div>
                    </div>
                </div>

                <div className=' p-m flex flex-col border-b border-neutral-400 gap-s'>
                    <div className='flex justify-between items-center text-f-m'>
                        <div>Categories</div>
                        <button className='text-secondary-900'>Reset</button>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <Select
                            options={categories}
                            isMulti
                            value={selectedCategories}
                            onChange={setSelectedCategories}
                            placeholder="Select categories"
                            styles={customStyles}
                        />
                    </div>
                </div>

                <div className=' p-m flex flex-col border-b border-neutral-400 gap-s'>
                    <div className='flex justify-between items-center text-f-m'>
                        <div>Subcategories</div>
                        <button className='text-secondary-900'>Reset</button>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <Select
                            options={subCategories}
                            isMulti
                            value={selectedSubCategories}
                            onChange={setSelectedSubCategories}
                            placeholder="Select subcategories"
                            styles={customStyles}
                        />
                    </div>
                </div>
                <div className=' p-m flex flex-col gap-s'>
                    <div className='flex justify-between items-center text-f-m'>
                        <div>Products</div>
                        <button className='text-secondary-900'>Reset</button>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <Select
                            options={products}
                            isMulti
                            value={selectedProducts}
                            onChange={setSelectedProducts}
                            placeholder="Select products"
                            styles={customStyles}
                        />
                    </div>
                </div>
            </div>
            <div className=' p-m flex gap-s items-center justify-between border-t border-neutral-400'>
                <button className='flex gap-s items-center text-f-s text-neutral-1200 bg-neutral-200 px-m py-xs rounded-md hover:bg-neutral-300'>
                    Reset
                </button>
                <button className='flex gap-s items-center text-f-s text-white bg-secondary-900 px-m py-xs rounded-md hover:bg-secondary-1000'>
                    Apply
                </button>
            </div>

        </div>
    )
}

export default Filter