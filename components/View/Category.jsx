import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import DoughnutContainer from '../Common/Doughnut/DoughnutContainer';


const Category = ({ appliedFilter }) => {
    const [topCategory, setTopCategory] = useState([]);

    useEffect(() => {
        console.log("Category", appliedFilter)
        if (appliedFilter != null) {
            salesByCategoryHandler("totalRevenue", setTopCategory);
        }
    }, [appliedFilter])



    const salesByCategoryHandler = async (type, setValue) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.ViewCategory, { ...appliedFilter });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("view ByCategoryHandler", response?.data);
            setValue(response.data)


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
                            Categories View
                        </h3>

                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Category Name</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Total Views</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {topCategory.map((category, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= topCategory.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{category.category || "Undefined"}</div>
                                <div className='py-m px-l flex-1 text-center  '>{category.totalViews}</div>

                            </div>))}

                        </div>
                    </div>

                </div>

                <div className="col-span-2 h-full bg-white rounded-bs flex flex-col  ">




                    <DoughnutContainer endpoint={API_ENDPOINTS.ViewCategoryOverTime} appliedFilter={appliedFilter} label="View Categories Over Time" From="ViewCategory" />


                </div>
            </div>

        </div>
    )
}

export default Category