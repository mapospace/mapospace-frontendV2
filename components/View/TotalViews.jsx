import React, { useEffect, useState } from 'react'
import InfoToast from '../Common/InfoToast'
import AuthServices from '@/utils/axios-api';
import { customError } from '../Common/Toast';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import toCapitalizedCase from '@/utils/capitalized-case';
import LineChart from '../Common/LineChart';
import clsx from 'clsx';
import SankeyChart from '../Common/SankeyChart';
import HistogramChart from '../Common/HistogramChart';

const TotalViews = ({ appliedFilter }) => {
    const [totalViews, setTotalViews] = useState({
        "totalViews": 0,
    });
    const [totalViewsOverTime, setTotalViewsOverTime] = useState([]);
    const [totalViewsValue, setTotalViewsValue] = useState([]);
    const [linelabels, setLineLabels] = useState([]);
    const [linePeriod, setLinePeriod] = useState('day');
    const [sankeyData, setSankeyData] = useState([]);
    const [histogramRanges, setHistogramRanges] = useState([0, 10, 100, 1000, 10000, 100000]);
    const [histogramData, setHistogramData] = useState([]);

    useEffect(() => {
        if (appliedFilter != null) {
            totalViewsHandler();
            viewSankeyHandler();
        }
    }, [appliedFilter]);

    useEffect(() => {
        if (appliedFilter != null) {
            totalViewLineOverTimeHandler(linePeriod)
        }
    }, [linePeriod, appliedFilter]);

    useEffect(() => {
        if (appliedFilter != null) {
            orderValueDistributionHandler(histogramRanges)
        }
    }, [histogramRanges, appliedFilter])


    function formatNumber(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + 'B'; // Billion
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M'; // Million
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K'; // Thousand
        }
        return num.toString(); // If less than 1000, return as is
    }

    const totalViewsHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TotalViews, appliedFilter);

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("total sales => ", response?.data);
            setTotalViews(response.data[0])


        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const totalViewLineOverTimeHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TotalViewsOverTime, { ...appliedFilter, "period": period });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("total sales over all", response?.data);
            setTotalViewsOverTime(response.data);
            let getlabels = response.data.map(data => { return data._id })
            let getTotalViews = response.data.map(data => { return data.totalViews })

            setLineLabels(getlabels);
            setTotalViewsValue([getTotalViews])

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const viewSankeyHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.ViewsSankeySwitch, { ...appliedFilter, "groupBy": "productName" });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("sale Sankey Handler => ", response?.data.sankeyDiagramData);
            // setTotalSales(response.data[0])
            setSankeyData(response?.data.sankeyDiagramData)


        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }
    const orderValueDistributionHandler = async (ranges) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TopViewsRangeDistribution, { ...appliedFilter, "ranges": ranges });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("orderValueDistributionHandler", response?.data);
            const data = response.data.map((data) => { return data.count })
            setHistogramData(data)


        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    return (
        <div className='pb-4xl hide-scrollbar'>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-xl mt-xl h-[400px]">

                <div className="col-span-1 h-full relative bg-white text-neutral-1200  rounded-bs flex justify-between flex-col border border-neutral-200 ">
                    <div className='px-xl'>
                        <div className='text-f-8xl px-xl text-center font-semibold  text-neutral-1200 pt-l'>Total Views</div>
                        {/* <div className='text-f-8xl px-xl text-center font-semibold  text-neutral-1200 '> Order Value</div> */}
                        <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(totalViews.totalViews)}</div>
                    </div>

                    <InfoToast info="This indicates the average order value of sales recorded in the system." top={2} right={2} innerRight={-70} />
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-xl text-neutral-900 text-f-xl text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                </div>
                <div className="col-span-2 h-full bg-white rounded-bs flex flex-col border">

                    <HistogramChart data={histogramData} bins={histogramRanges} setBins={setHistogramRanges} label="Top Views Range Distribution" />


                </div>
            </div>

            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-xl mt-xl h-[400px] ">
                <div className='col-span-2'>
                    {linelabels.length > 0 && totalViewsValue.length > 0 && <LineChart labels={linelabels} values={totalViewsValue} labelName="Total Views" period={setLinePeriod} />}
                </div>

                <div className="col-span-2  bg-white rounded-bs flex flex-col border border-neutral-200 ">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Total Views
                    </div>
                    <div className='p-xl pt-s h-full '>

                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b border-neutral-200 '>
                            <div className='py-m flex-[0.5] text-center px-l'>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>{toCapitalizedCase(linePeriod)}</div>
                            <div className='py-m flex-1 text-center px-l'>Total Views</div>

                        </div>

                        <div className='flex text-f-m  h-[270px]  flex-col overflow-y-scroll hide-scrollbar bg-white'>
                            {totalViewsOverTime.map((view, index) => (<div className={clsx(' flex  border-b border-neutral-200  text-neutral-1200', index >= totalViewsOverTime.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.5] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{view._id}</div>
                                <div className='py-m px-l flex-1 text-center'>{view.totalViews}</div>

                            </div>))}
                        </div>

                    </div>


                </div>
            </div>
            <div className=' gap-l grid  grid-cols-4 mt-xl'>
                <div className="col-span-4 h-full bg-white rounded-bs flex flex-col border  ">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Sankey of View Product
                    </div>
                    <div className='p-xl pt-s h-[450px] '>
                        {sankeyData.length > 0 && <SankeyChart data={sankeyData} />}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TotalViews