import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import DoughnutContainer from '../Common/Doughnut/DoughnutContainer';

const SubCategory = ({ appliedFilter }) => {
    const [topSubCategoryByQuantity, setTopSubCategoryByQuantity] = useState([]);
    const [topSubCategoryByRevenue, setTopSubCategoryByRevenue] = useState([]);

    useEffect(() => {
        console.log("appliedFilter", appliedFilter)
        if (appliedFilter != null) {
            salesByCategoryHandler("totalRevenue", setTopSubCategoryByRevenue);
            salesByCategoryHandler("totalQuantitySold", setTopSubCategoryByQuantity);
        }
    }, [appliedFilter])

    const salesByCategoryHandler = async (type, setValue) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.SalesBySubCategory, { ...appliedFilter, "limit": 10, sortBy: type });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("salesByCategoryHandler", response?.data);
            setValue(response.data)


        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }
    return (
        <div className='pb-4xl hide-scrollbar'>
            <div className=' gap-l grid  grid-cols-4 mt-xl'>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Top Sub Categories By Revenue
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Sub Category Name</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Total Revenue</div>
                            <div className='py-m flex-1 text-center px-l'>Total Quantity Sold</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {topSubCategoryByRevenue.map((subCategory, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= topSubCategoryByRevenue.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{subCategory.subcategory}</div>
                                <div className='py-m px-l flex-1 text-center  '>{subCategory.totalQuantitySold}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(subCategory.totalRevenue).toFixed(2)}</div>

                            </div>))}

                        </div>
                    </div>

                </div>

                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Top Sub Categories By Quantity
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Sub Category Name</div>
                            <div className='py-m flex-1 text-center px-l'>Total Quantity Sold</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Total Revenue</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                                {topSubCategoryByQuantity.map((subCategory, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= topSubCategoryByQuantity.length - 1 && 'border-b-0')} key={index} >
                                    <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                    <div className='py-m px-l flex-1 text-center  '>{subCategory.subcategory}</div>
                                    <div className='py-m px-l flex-1 text-center'>{Number(subCategory.totalRevenue).toFixed(2)}</div>
                                    <div className='py-m px-l flex-1 text-center  '>{subCategory.totalQuantitySold}</div>

                                </div>))}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className=' gap-l grid  grid-cols-4 mt-xl h-[500px]'>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">


                    <DoughnutContainer endpoint={API_ENDPOINTS.TopSellingSubCategoryOverTime} appliedFilter={appliedFilter} label="Top Selling Sub Categories Over Time" From="SaleSubCategory" />

                </div>

                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">

                    {/* <HistogramChart data={histogramData} bins={histogramRanges} setBins={setHistogramRanges} /> */}


                </div>

            </div>
        </div>
    )
}

export default SubCategory