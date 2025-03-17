import { API_ENDPOINTS } from '@/utils/api-endpoints'
import AuthServices from '@/utils/axios-api'
import toCapitalizedCase from '@/utils/capitalized-case'
import getUniqueKeys from '@/utils/get-unique-keys'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import Skeleton from 'react-loading-skeleton'
import { TypeAnimation } from 'react-type-animation'
import InsightsDetails from './InsightsDetails'
import CategoricalAnalysis from './CategoricalAnalysis'

const QueryEvents = ({ queryData }) => {
    const [uniqueKeys, setUniqueKeys] = useState([]);
    const [queryResult, setQueryResult] = useState([]);
    const [enableInsights, setEnableInsights] = useState(false);
    const [loadingInsights, setLoadingInsights] = useState(false);
    const [insightsData, setInsightsData] = useState(null)
    const [categorical, setCategorical] = useState(null);
    const [categoricalUniqueKeys, setCategoricalUniqueKeys] = useState([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (queryData != null) {
            queryHandler(queryData);

        }
    }, [queryData, enableInsights]);

    function formatTimestamp(timestamp) {
        if (!timestamp) return 'NA'; // Handle empty or undefined values
        const [date, time] = timestamp.split('T'); // Split by 'T'
        return `${date} - ${time.replace('.Z', '')}`; // Remove 'Z' and return formatted value
    }

    function isISODateTime(value) {
        return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value);
    }

    const queryHandler = async (data) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.QueryBuilder.CustomEvents, { ...data, "limit": 10, "page": 1, 'generateInsights': enableInsights });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("resolutionTimeOverTimeHandler", response.data)
            setQueryResult(response.data)


            const keys = getUniqueKeys(response.data.results)
            console.log("queryResult", keys)
            setUniqueKeys(keys);
            if (enableInsights) {
                setInsightsData(response.data.insights.insights)
                setCategorical(response.data.insights.computedMetrics.categorical)
                const uniqueData = Object.keys(response.data.insights.computedMetrics.categorical);
                setCategoricalUniqueKeys(uniqueData);
                console.log("setCategoricalUniqueKeys", uniqueData)
                setTimeout(() => { setLoadingInsights(false) }, 1000)
            }

        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    }

    const lumoInsightsHandler = () => {
        if (queryData != null) {
            if (enableInsights) {

            }
            else {

                setLoadingInsights(true)
            }
            setEnableInsights((prev) => !prev)



        }

    }

    return (
        <div className='text-black py-l relative'>
            <div className='flex justify-between '>
                <div></div>
                <div>
                    <button
                        className={clsx('flex rounded-bs items-center gap-s px-m py-xs  border border-primary-500 shadow-lg shadow-primary-100  hover:border-primary-600 hover:scale-105 transition-all ease-in-out duration-300', enableInsights ? 'bg-purple-200' : 'bg-purple-50')}
                        onClick={lumoInsightsHandler}
                    >

                        <Image
                            src='/lumo_loading.gif'
                            alt="loading.."
                            width={20}
                            height={20}
                            className=" h-xl w-xl rounded-bs "
                        />
                        <div className='text-f-xl font-bold lumo-ai-text '>Generate Lumo Insights</div>
                    </button>

                </div>
            </div>
            {uniqueKeys.length > 0 && <div className='flex justify-between items-center mt-l'>
                <div>
                    <div className='text-f-4xl text-black'>
                        Activity Analysis
                    </div>
                    <div className='text-f-l text-neutral-900'>Analysis of login activities with insights and patterns</div>
                </div>
                <div>
                    <div className='bg-neutral-200 py-xs px-l rounded-blg'>Records {queryResult.total}</div>
                </div>

            </div>}
            {loadingInsights && <div className='w-full'>
                <div className='flex items-center justify-center  mt-m'>
                    <TypeAnimation
                        sequence={[
                            "Analyzing your data patterns...",
                            1000,
                            '',
                            1000,
                            'Discovering insights from your query...',
                            1000,
                            '',
                            1000,
                            'Processing natural language request...',
                            1000,
                            '',
                            1000,
                            'Generating visualization based on your data...',
                            1000,
                            '',
                            1000,
                            'Calculating metrics and aggregations...',
                            1000,
                            '',
                            1000,
                        ]}
                        speed={50}
                        className="lumo-ai-text"
                        style={{ fontSize: '24px' }}
                        repeat={Infinity}
                    />
                </div>
                <div className='text-f-2xl mt-l mb-l pb-s border-b'>
                    <Skeleton height={30} borderRadius={8} baseColor='#dfccff' highlightColor="#efe6ff" duration={5} />
                </div>
                <div className='flex items-center justify-center text-black flex-col mb-l'>

                    <Image
                        src='/ai.gif'
                        alt="loading.."
                        width={20}
                        height={20}
                        className=" h-10xl w-10xl rounded-bs "
                    />
                    <div>  Analyzing your data...</div>

                </div>
                <div className="grid grid-cols-2  gap-m  text-gray-700 relative ">
                    <div className='p-l border rounded-bs'>
                        <Skeleton height={150} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                    </div>
                    <div className='p-l  border rounded-bs'>
                        <Skeleton height={150} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                    </div>

                    <div className='  p-l px-2xl  border rounded-bs'>
                        <Skeleton height={30} borderRadius={8} width='60%' baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={30} borderRadius={8} width='80%' baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={300} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                    </div>
                    <div className='flex gap-l  items-end p-l px-2xl  border rounded-bs'>
                        <Skeleton height={300} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={30} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={60} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={160} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={200} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={180} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={230} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={160} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                        <Skeleton height={220} width={50} borderRadius={8} baseColor='#dfccff' duration={5} highlightColor="#efe6ff" />
                    </div>


                </div>

            </div>}


            {
                !loadingInsights && insightsData != null && enableInsights && <div>
                    <InsightsDetails insightsData={insightsData} />
                </div>
            }
            {categorical != null && enableInsights && categoricalUniqueKeys.length > 0 && <CategoricalAnalysis list={categoricalUniqueKeys} categoricalData={categorical} />}

            {
                uniqueKeys.length > 0 && <div>
                    <div className='pb-s border-b  mt-l  mb-xl'>
                        <div className='text-f-2xl '>Record</div>
                        <div className='text-f-l text-neutral-900'>
                            This table presents recorded entries related to system activity, providing insights into user interactions and access patterns. It helps in tracking and analyzing operational events for monitoring and security purposes.
                        </div>
                    </div>

                    <div className='border rounded-bs'>

                        <div className="w-full   overflow-x-auto  hide-scrollbar ">
                            <div className='flex  rounded-bs'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex bg-yellow-300 w-full '>
                                        {uniqueKeys.map((labels, index) => (
                                            <div className={clsx('min-w-[200px] flex-1 bg-neutral-300 text-center py-s ', index % 2 != 0 && 'border-x border-neutral-600')} key={index}>{toCapitalizedCase(labels)}</div>
                                        ))}

                                    </div>
                                    <div className='flex flex-col'>
                                        {queryResult.results.map((result, index) => (
                                            <div className='flex' key={index}>

                                                {uniqueKeys.map((labels, index) => (
                                                    <div className={clsx('min-w-[200px] flex-1 bg-white text-center py-s border-b', index % 2 != 0 && 'border-x ')} key={index}>
                                                        {typeof result[labels] === 'boolean'
                                                            ? result[labels].toString()
                                                            : (isISODateTime(result[labels]) ? formatTimestamp(result[labels]) : (result[labels] ?? 'NA'))}
                                                    </div>
                                                ))}

                                            </div>
                                        ))}
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div className='py-s flex px-s justify-end gap-s'>
                        <button className='text-neutral-1200 hover:text-secondary-900'>
                            <FaArrowLeft />
                        </button>
                        <div className='p-xs px-s bg-secondary-900 text-white text-f-s'>
                            1
                        </div>

                        <button className='text-neutral-1200 hover:text-secondary-900'>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            }



        </div >
    )
}

export default QueryEvents


