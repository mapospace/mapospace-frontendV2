'use client'
import AuthServices from '@/utils/axios-api';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import Select from 'react-select';

const Filter = ({ close, catalogList, applyFilterHandler, appliedFilter }) => {
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [mounted, setMounted] = useState(false);

    const categories = catalogList.categories.map((category) => {
        return { value: category.category, label: category.category }
    });


    const subCategories = catalogList.subcategories.map((subcategory) => {
        return { value: subcategory.subcategory, label: subcategory.subcategory }
    });

    const products = catalogList.productCategories.map((productCategory) => {
        return { value: productCategory.productName, label: productCategory.productName }
    });

    useEffect(() => {
        console.log("applied Filter", appliedFilter)
        if (appliedFilter?.categories && appliedFilter?.categories.length > 0) {
            const categories = appliedFilter?.categories.map((category) => {
                return { value: category, label: category }
            });
            console.log("applied categories", categories, appliedFilter?.categories)
            setSelectedCategories(categories)
        }
        if (appliedFilter?.subCategories && appliedFilter?.subCategories.length > 0) {
            const subCategories = appliedFilter?.subCategories.map((subCategory) => {
                return { value: subCategory, label: subCategory }
            });
            console.log("applied subCategories", subCategories, appliedFilter?.subCategories)
            setSelectedSubCategories(subCategories)
        }
        if (appliedFilter?.products && appliedFilter?.products.length > 0) {
            const products = appliedFilter?.products.map((product) => {
                return { value: product, label: product }
            });
            console.log("applied products", products, appliedFilter?.products)
            setSelectedProducts(products)
        }
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
            backgroundColor: "white", // Light gray background
            borderRadius: "8px",
            fontSize: "14px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#4A90E2" : state.isFocused ? "#E5E7EB" : "transparent",
            color: state.isSelected ? "white" : "black",
            "&:hover": {
                backgroundColor: "#E5E7EB",
                color: "black",
            },
        }),
    };

    const resetHandler = () => {
        // setStartDate(null);
        // setEndDate(null)
        setSelectedCategories([])
        setSelectedSubCategories([])
        setSelectedProducts([])
    }

    // const dateTimeConverter = (data) => {
    //     const date = new Date(data);
    //     const isoDate = date.toISOString();
    //     return isoDate;
    // }
    const applyHandler = () => {
        // const startdateTime = startDate ? dateTimeConverter(startDate) : "";
        // const endDateTime = endDate ? dateTimeConverter(endDate) : "";
        // let newData = { "startDate": startdateTime, "endDate": endDateTime };
        let newData = {};
        if (selectedCategories.length > 0) {
            const categories = selectedCategories.map((category) => { return category.value })
            newData = { ...newData, "categories": categories }
        } else {
            newData = { ...newData, "categories": [] }
        }

        if (selectedSubCategories.length > 0) {
            const subCategories = selectedSubCategories.map((subCategory) => { return subCategory.value })
            newData = { ...newData, "subCategories": subCategories }
        } else {
            newData = { ...newData, "subCategories": [] }
        }


        if (selectedProducts.length > 0) {
            const product = selectedProducts.map((product) => { return product.value })
            newData = { ...newData, "products": product }
        }
        else {
            newData = { ...newData, "products": [] }
        }

        console.log("apply Handler", newData)
        applyFilterHandler(newData)
        close(false)
    }
    if (!mounted) return null;

    return (
        <div id='map-container' className='absolute w-[400px] z-30 bg-white border border-neutral-400 rounded-m top-20 right-0' >
            <div className=' p-m flex gap-s items-center justify-between border-b border-neutral-400'>
                <div className='flex gap-s items-center text-black'>
                    <FaFilter className='w-4 h-4 ' />
                    <span>Filter</span>
                </div>
                <button onClick={() => { close(false) }}>
                    <MdOutlineClose className='w-6 h-6 text-black' />
                </button>
            </div>

            <div className='max-h-[400px] relative overflow-y-scroll hide-scrollbar'>


                <div className=' p-m flex flex-col border-b border-neutral-400 gap-s'>
                    <div className='flex justify-between items-center text-f-m'>
                        <div>Categories</div>
                        <button className='text-secondary-900' onClick={() => { setSelectedCategories([]) }}>Reset</button>
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
                        <button className='text-secondary-900' onClick={() => { setSelectedSubCategories([]) }}>Reset</button>
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
                        <button className='text-secondary-900' onClick={() => { setSelectedProducts([]) }}>Reset</button>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <Select
                            options={products}
                            isMulti
                            value={selectedProducts}
                            onChange={setSelectedProducts}
                            placeholder="Select products"
                            styles={customStyles}
                            menuPlacement="auto" // Automatically adjusts the dropdown direction
                            menuShouldScrollIntoView={false}  // Prevents auto-scrolling
                        />
                    </div>
                </div>
            </div>
            <div className=' p-m flex gap-s items-center justify-between border-t border-neutral-400'>
                <button className='flex gap-s items-center text-f-s text-neutral-1200 bg-neutral-200 px-m py-xs rounded-md hover:bg-neutral-300' onClick={resetHandler}>
                    Reset
                </button>
                <button className='flex gap-s items-center text-f-s text-white bg-secondary-900 px-m py-xs rounded-md hover:bg-secondary-1000' onClick={applyHandler}>
                    Apply
                </button>
            </div>

        </div>
    )
}

export default Filter