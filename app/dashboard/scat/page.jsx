'use client';

import { useEffect, useState } from "react";
import AuthServices from "@/utils/axios-api";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MapContainer from "@/components/Maps/MapContainer";
import Analysis from "@/components/CSAT/Analysis";


const Dashboard = () => {
    const [catalogList, setCatalogList] = useState([]);
    const [appliedFilter, setAppliedFilter] = useState(null);

    const searchParams = useSearchParams();

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
        }
    };

    useEffect(() => {
        fetchCatalogsList();

    }, [])





    return (
        <div className="p-8 bg-white min-h-screen pt-9xl" >
            <div className=' flex justify-between  items-end'>
                <div className='text-neutral-1300 font-semibold text-2xl'>CSAT Analytics</div>

            </div>

            <div className=' hide-scrollbar my-xl'>
                <div className="text-neutral-1000  "><MapContainer catalogList={catalogList} setAppliedFilter={setAppliedFilter} appliedFilter={appliedFilter} /></div>
            </div>
            <Analysis appliedFilter={appliedFilter} />

        </div >
    );
};

export default Dashboard;
