import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import DoughnutContainer from '../Common/Doughnut/DoughnutContainer';
import Select from "react-select";

const dataValues = [
    { value: "revenue", label: "Revenue" },
    { value: "quantity", label: "Quantity" },
];
const Category = ({ appliedFilter }) => {
    const [topCategoryByQuantity, setTopCategoryByQuantity] = useState([]);
    const [topCategoryByRevenue, setTopCategoryByRevenue] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState(dataValues[0]);
    const [topCategory, setTopCategory] = useState([]);

    useEffect(() => {
        console.log("Category", appliedFilter)
        if (appliedFilter != null) {
            salesByCategoryHandler("totalRevenue", setTopCategoryByRevenue);
            salesByCategoryHandler("totalQuantitySold", setTopCategoryByQuantity);
        }
    }, [appliedFilter])

    useEffect(() => {
        topCategoryByRevenue && topCategoryByQuantity && selectedSortOption.value == "revenue" ? setTopCategory(topCategoryByRevenue) : setTopCategory(topCategoryByQuantity);
    }, [selectedSortOption, topCategoryByQuantity, topCategoryByRevenue])

    const salesByCategoryHandler = async (type, setValue) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.SalesByCategory, { ...appliedFilter, "limit": 10, sortBy: type });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("salesByCategoryHandler", response?.data);
            setValue(response.data)
            // setProductList(response?.data)
            // setTopProductsByQuantity(response?.data.topProductsByQuantity)
            // setTopProductsByRevenue(response?.data.topProductsByRevenue)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }
    return (
        <div className=' hide-scrollbar '>
            <div className=' gap-l grid  grid-cols-4 mt-xl'>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border border-neutral-200">
                    <div className='flex justify-between px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        <h3 className="text-f-l font-semibold text-neutral-1200  ">
                            Top Product By {selectedSortOption.label}
                        </h3>
                        <div className='flex gap-s'>
                            <Select
                                options={dataValues}
                                value={selectedSortOption}
                                onChange={(selected) => setSelectedSortOption(selected)}
                                isSearchable={false}
                                className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black text-f-s"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        minHeight: 'unset',  // Remove default min-height
                                        height: 'auto',
                                        padding: "2px",
                                        margin: 0,
                                        border: '1px solid #4d4d4d',
                                        boxShadow: 'none',
                                        backgroundColor: 'transparent',
                                    }),
                                    valueContainer: (provided) => ({
                                        ...provided,
                                        padding: '2px', // Ensure no extra padding
                                        margin: 0,
                                    }),
                                    indicatorsContainer: (provided) => ({
                                        ...provided,
                                        padding: '2px',
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        padding: '0px', // Removes space around the dropdown arrow
                                        margin: 0,
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        padding: 0,
                                        margin: 0,
                                    }),
                                }}
                            />

                        </div>
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Category Name</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Total Revenue</div>
                            <div className='py-m flex-1 text-center px-l'>Total Quantity Sold</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {topCategory.map((category, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= topCategoryByRevenue.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{category.category}</div>
                                <div className='py-m px-l flex-1 text-center  '>{category.totalQuantitySold}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(category.totalRevenue).toFixed(2)}</div>

                            </div>))}

                        </div>
                    </div>

                </div>

                <div className="col-span-2 h-full bg-white rounded-bs flex flex-col  ">




                    <DoughnutContainer endpoint={API_ENDPOINTS.TopSellingCategoryOverTime} appliedFilter={appliedFilter} label="Top Selling Categories Over Time" From="SaleCategory" />


                </div>
            </div>

        </div>
    )
}

export default Category