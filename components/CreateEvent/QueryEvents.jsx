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
import { FaArrowRightLong } from "react-icons/fa6";
import { FaMapMarkerAlt, FaClock, FaFilter, FaList } from "react-icons/fa";
import { motion } from "framer-motion";
import ChatBot from './ChatBot';

const QueryEvents = ({ queryData, setOpenQuery, setLoading }) => {
    const [uniqueKeys, setUniqueKeys] = useState([]);
    const [queryResult, setQueryResult] = useState([]);
    const [enableInsights, setEnableInsights] = useState(false);
    const [loadingInsights, setLoadingInsights] = useState(false);
    const [insightsData, setInsightsData] = useState(null)
    const [categorical, setCategorical] = useState(null);
    const [categoricalUniqueKeys, setCategoricalUniqueKeys] = useState([])
    const [page, setPage] = useState(1);
    const [conversationId, setConversationId] = useState([]);

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
            const endpoint = data.filterPrompt ? API_ENDPOINTS.AI.CustomEventsWithChat : API_ENDPOINTS.QueryBuilder.CustomEvents;
            const payload = data.filterPrompt ? {
                ...data,
            } : { ...data, "limit": 10, "page": 1, 'generateInsights': enableInsights }
            const response = await authService.postApiCallHandler(endpoint, payload);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("resolutionTimeOverTimeHandler", response.data)
            setQueryResult(response.data)


            const keys = getUniqueKeys(response.data.results)
            console.log("queryResult", keys)
            setUniqueKeys(keys);
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            conversationAnalysisHandler({ ...payload, filters: response.data.filters })
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

    const conversationAnalysisHandler = async (data) => {
        try {
            const authService = new AuthServices();
            const endpoint = API_ENDPOINTS.AI.ConversationAnalysis;
            const payload = {
                customEventTypeName: data.customEventTypeName,
                startDate: data.startDate,
                endDate: data.endDate,
                limit: 10,
                page: 1,
                filters: data.filters

            };
            const response = await authService.postApiCallHandler(endpoint, payload);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            setConversationId(response.data.conversationId)
            console.log("conversationAnalysisHandler", response.data)
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
        <div className='text-black  relative'>
            {queryData == null && uniqueKeys.length == 0 && <EventFilterInstructions setOpenQuery={setOpenQuery} />}

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
                            300,
                            '',
                            300,
                            'Discovering insights from your query...',
                            300,
                            '',
                            300,
                            'Processing natural language request...',
                            300,
                            '',
                            300,
                            'Generating visualization based on your data...',
                            300,
                            '',
                            300,
                            'Calculating metrics and aggregations...',
                            300,
                            '',
                            300,
                        ]}
                        speed={50}
                        className="lumo-ai-text"
                        style={{ fontSize: '48px' }}
                        repeat={Infinity}
                    />
                </div>
                {/* <div className='text-f-2xl mt-l mb-l pb-s border-b'>
                    <Skeleton height={30} borderRadius={8} baseColor='#dfccff' highlightColor="#efe6ff" duration={5} />
                </div> */}

                <div className="grid grid-cols-2  gap-m  text-gray-700 relative mt-xl">

                    <div className='  p-l px-2xl  border rounded-bs'>
                        <div className='text-neutral-600 text-f-xl mb-xl'>Loading insights, please wait...</div>
                        <Skeleton height={30} borderRadius={8} width='60%' />
                        <Skeleton height={70} borderRadius={8} width='80%' />
                        <Skeleton height={100} borderRadius={8} width='100%' />
                        <Skeleton height={50} borderRadius={8} width='100%' />
                        {/* <Skeleton height={200} borderRadius={8} /> */}
                    </div>
                    <div className=' p-l px-2xl  border rounded-bs'>
                        <div className='text-neutral-600 text-f-xl mb-xl'>Loading insights, please wait...</div>

                        <div className='flex  gap-l items-end '>
                            <Skeleton height={270} width={100} borderRadius={8} />
                            <Skeleton height={130} width={200} borderRadius={8} />
                            <Skeleton height={60} width={100} borderRadius={8} />
                            <Skeleton height={160} width={150} borderRadius={8} />
                        </div>


                    </div>


                </div>
                <div className='flex items-center justify-center text-black flex-col my-l'>

                    <Image
                        src='/loadai.gif'
                        alt="loading.."
                        width={20}
                        height={20}
                        className=" w-10xl rounded-bs "
                    />
                    <div>  Analyzing your data...</div>

                </div>

            </div>}

            {uniqueKeys.length > 0 && <>
                <div className='flex justify-between '>
                    <div></div>
                    <div>
                        {!(queryData.filterPrompt) && (
                            <button
                                className={clsx('flex rounded-bs items-center gap-s px-l py-xs  shadow-lg shadow-secondary-400 group  bg-secondary-900 hover:bg-secondary-1000')}
                                onClick={lumoInsightsHandler}
                            >

                                <Image
                                    src='/aistar.png'
                                    alt="loading.."
                                    width={20}
                                    height={20}
                                    className=" h-2xl w-2xl rounded-bs group-hover:scale-110 transition-all ease-in-out duration-300"
                                />
                                <div className='text-f-l font-normal text-white '>Generate Insights</div>
                            </button>
                        )}
                    </div>
                </div>
                {!loadingInsights && insightsData != null && enableInsights && <div><InsightsDetails insightsData={insightsData} /></div>}
                {categorical != null && enableInsights && categoricalUniqueKeys.length > 0 && <CategoricalAnalysis list={categoricalUniqueKeys} categoricalData={categorical} />}
                <div className='mb-2xl'>
                    <div className='pb-s border-b  mt-l  mb-xl'>
                        <div className='text-f-2xl '>Record</div>
                        <div className='text-f-l text-neutral-900'>
                            This table presents recorded entries related to system activity, providing insights into user interactions and access patterns. It helps in tracking and analyzing operational events for monitoring and security purposes.
                        </div>
                    </div>

                    <div className='border rounded-bs '>

                        {queryResult.results.length > 0 ? <div className="w-full   overflow-x-auto  hide-scrollbar ">
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
                        </div> : <div className='mb-2xl'>
                            <div className='pb-s  mt-l  mb-xl'>
                                <div className='text-f-4xl text-neutral-600 '>No data available</div>

                            </div>
                        </div>}
                    </div>
                    {/* <div className='py-s flex px-s justify-end gap-s'>
                        <button className='text-neutral-1200 hover:text-secondary-900'>
                            <FaArrowLeft />
                        </button>
                        <div className='p-xs px-s bg-secondary-900 text-white text-f-s'>
                            1
                        </div>

                        <button className='text-neutral-1200 hover:text-secondary-900'>
                            <FaArrowRight />
                        </button>
                    </div> */}
                </div>
            </>}
            {/* {uniqueKeys.length > 0 && */}
            <ChatBot conversationId={conversationId} />
            {/*   } */}
        </div >
    )
}

export default QueryEvents


const EventFilterInstructions = ({ setOpenQuery }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                type: "spring",
            }
        }),
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full p-xl bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                className="text-f-4xl font-semibold text-neutral-1200 mb-l"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                How to Use Event Query Builder
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-2xl text-f-l text-center max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                Use the event query builder to filter and analyze events. Select predefined custom events, set geographical filters, adjust duration, and configure event properties.
            </motion.p>

            <div className="grid grid-cols-2 gap-l w-full max-w-4xl">
                {[{
                    Icon: FaFilter,
                    title: "Custom Events",
                    desc: "Choose predefined event types or create your own custom events.",
                    iconClass: "text-secondary-900"
                }, {
                    Icon: FaMapMarkerAlt,
                    title: "Geo Map",
                    desc: "Select geographical regions to filter event data based on location.",
                    iconClass: "text-green-700"
                }, {
                    Icon: FaClock,
                    title: "Duration",
                    desc: "Specify time frames to refine event analytics over a selected period.",
                    iconClass: "text-orange-500"
                }, {
                    Icon: FaList,
                    title: "Event Properties",
                    desc: "Configure specific event attributes for advanced filtering.",
                    iconClass: "text-primary-900"
                }].map(({ Icon, title, desc, iconClass }, i) => (
                    <motion.div
                        key={i}
                        className="p-xl flex flex-col items-center border rounded-bs"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        <Icon className={`${iconClass} mb-2`} size={32} />
                        <h3 className="text-f-xl font-medium text-gray-700">{title}</h3>
                        <p className="text-gray-500 text-f-l text-center mt-2">{desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.button
                className="default-button mt-xl"
                onClick={() => setOpenQuery(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
            >
                Start Building Queries
            </motion.button>
        </motion.div>
    );
};
