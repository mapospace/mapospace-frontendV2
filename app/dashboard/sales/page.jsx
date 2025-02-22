'use client';

import { useEffect, useState } from "react";
import AuthServices from "@/utils/axios-api";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import TotalSales from "@/components/Sales/TotalSales";
import { useSearchParams } from "next/navigation";
import Product from "@/components/Sales/Product";


const Dashboard = () => {
    const [catalogList, setCatalogList] = useState([]);
    const [appliedFilter, setAppliedFilter] = useState(null);
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");

    const fetchDetails = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.Catalogs);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            setCatalogList(response?.data)
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    };

    useEffect(() => {
        fetchDetails()
    }, [])

    useEffect(() => {
        console.log("Dashboard", appliedFilter)
    }, [appliedFilter])

    return (
        <div className="p-8 bg-gray-100 min-h-screen pt-10xl" >
            <div className='pb-m mb-xl border-b flex justify-between'>
                <div className='text-neutral-1300 font-semibold text-3xl'>Sales</div>
                <div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className="bg-neutral-200 border border-neutral-1200 text-neutral-1200 flex items-center py-xs px-s rounded-md ">
                        From:  {appliedFilter.startDate.split('T')[0]}  To: {appliedFilter.endDate.split('T')[0]}
                    </div>}
                </div>
            </div>

            {currentCategory == "total_sale" && <TotalSales catalogList={catalogList} setAppliedFilter={setAppliedFilter} appliedFilter={appliedFilter} />}
            {currentCategory == "products" && <Product catalogList={catalogList} setAppliedFilter={setAppliedFilter} appliedFilter={appliedFilter} />}


        </div >
    );
};

export default Dashboard;
