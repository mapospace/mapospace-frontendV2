'use client';

import { useEffect, useState } from "react";
import AuthServices from "@/utils/axios-api";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MapContainer from "@/components/Maps/MapContainer";
import clsx from "clsx";
import TotalViews from "@/components/View/TotalViews";
import Product from "@/components/View/Product";


const Dashboard = () => {
    const [catalogList, setCatalogList] = useState([]);
    const [appliedFilter, setAppliedFilter] = useState(null);

    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("type");
    const router = useRouter()

    const fetchCatalogsList = async () => {
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
        fetchCatalogsList();

    }, [])



    const chnageRouteHandler = (endpoint) => {
        router.push(endpoint);
    }

    return (
        <div className="p-8 bg-white min-h-screen pt-9xl" >
            <div className=' flex justify-between  items-end'>
                <div className='text-neutral-1300 font-semibold text-2xl'>{currentCategory == "products" ? "Product" : "Sale"} Analytics</div>
                <div className="flex text-black">
                    <div
                        className={clsx("border-b border-neutral-600  px-s py-xs text-f-m   cursor-pointer", currentCategory == "total_view" && 'bg-neutral-200 border-b-2 rounded-t-bxs')}
                        onClick={() => { chnageRouteHandler('/dashboard/views?type=total_view') }}
                    >
                        Overview
                    </div>
                    <div
                        className={clsx("border-b border-neutral-600  px-s py-xs text-f-m  cursor-pointer", currentCategory == "products" && 'bg-neutral-200 border-b-2 rounded-t-bxs')}
                        onClick={() => { chnageRouteHandler('/dashboard/views?type=products') }}
                    >
                        Product
                    </div>

                </div>
            </div>

            <div className=' hide-scrollbar my-xl'>
                <div className="text-neutral-1000  "><MapContainer catalogList={catalogList} setAppliedFilter={setAppliedFilter} appliedFilter={appliedFilter} /></div>
            </div>
            {currentCategory == "total_view" && <TotalViews appliedFilter={appliedFilter} />}
            {currentCategory == "products" && <Product appliedFilter={appliedFilter} />}



        </div >
    );
};

export default Dashboard;
