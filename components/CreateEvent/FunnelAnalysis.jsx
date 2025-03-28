import React, { use, useEffect, useState } from 'react'
import FunnelChart from '../Common/FunnelChart'
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import { FaSearch } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import clsx from 'clsx';
import { FaArrowRightLong } from "react-icons/fa6";
import Image from 'next/image';
import { FaMapMarkerAlt, FaClock, FaFilter, FaList } from "react-icons/fa";
import { motion } from "framer-motion";

const funnelData2 = [
    {
        "stage": "UserLogin",
        "count": 107,
        "conversionRate": 100
    },
    {
        "stage": "AddToCart",
        "count": 51,
        "conversionRate": 47.66355140186916
    },
    {
        "stage": "OrderProcessing",
        "count": 0,
        "conversionRate": 0
    }
]

const funnelAnalysisInsights23 = {
    "analysis": {
        "overview": {
            "totalUsers": 107,
            "completionRate": 0,
            "keyInsights": [
                "The funnel has a total of 107 users entering the UserLogin stage.",
                "The completion rate of the funnel is 0%.",
                "There are significant drop-offs at the AddToCart and OrderProcessing stages."
            ]
        },
        "stageAnalysis": [
            {
                "stage": "UserLogin",
                "insights": [
                    "UserLogin stage has 100% conversion rate with 107 users entering."
                ],
                "recommendations": [
                    "Optimize the UserLogin process to maintain high conversion rates."
                ]
            },
            {
                "stage": "AddToCart",
                "insights": [
                    "AddToCart stage has a conversion rate of 47.66% with 51 users entering.",
                    "There is a drop-off rate of 52.34% from UserLogin to AddToCart."
                ],
                "recommendations": [
                    "Investigate reasons for drop-offs from UserLogin to AddToCart.",
                    "Implement strategies to improve conversion rate at AddToCart stage."
                ]
            },
            {
                "stage": "OrderProcessing",
                "insights": [
                    "OrderProcessing stage has 0% conversion rate with 0 users completing the stage.",
                    "There is a 100% drop-off rate from AddToCart to OrderProcessing."
                ],
                "recommendations": [
                    "Identify and resolve issues causing drop-offs at OrderProcessing stage.",
                    "Streamline the OrderProcessing process to increase conversion rate."
                ]
            }
        ],
        "bottlenecks": [
            "AddToCart",
            "OrderProcessing"
        ],
        "recommendations": [
            "Address drop-offs at AddToCart and OrderProcessing stages to improve overall conversion rate.",
            "Implement A/B testing and user feedback mechanisms to optimize funnel performance."
        ],
        "performanceMetrics": {
            "topPerformingStage": "UserLogin",
            "lowestPerformingStage": "OrderProcessing",
            "averageConversionRate": 49.22
        }
    },
    "computedMetrics": {
        "totalStages": 3,
        "entryCount": 107,
        "exitCount": 0,
        "dropOffs": [
            {
                "fromStage": "UserLogin",
                "toStage": "AddToCart",
                "dropOff": 56,
                "dropOffRate": 52.336448598130836
            },
            {
                "fromStage": "AddToCart",
                "toStage": "OrderProcessing",
                "dropOff": 51,
                "dropOffRate": 100
            }
        ],
        "conversionRates": [
            {
                "fromStage": "UserLogin",
                "toStage": "AddToCart",
                "rate": 47.66355140186916
            },
            {
                "fromStage": "AddToCart",
                "toStage": "OrderProcessing",
                "rate": 0
            }
        ],
        "overallConversion": 0,
        "stageMetrics": [
            {
                "stage": "UserLogin",
                "count": 107,
                "conversionRate": 100,
                "percentageOfEntry": 100
            },
            {
                "stage": "AddToCart",
                "count": 51,
                "conversionRate": 47.66355140186916,
                "percentageOfEntry": 47.66355140186916
            },
            {
                "stage": "OrderProcessing",
                "count": 0,
                "conversionRate": 0,
                "percentageOfEntry": 0
            }
        ]
    }
}

const computedMetrics2 = {
    "totalStages": 3,
    "entryCount": 107,
    "exitCount": 0,
    "dropOffs": [
        {
            "fromStage": "UserLogin",
            "toStage": "AddToCart",
            "dropOff": 56,
            "dropOffRate": 52.336448598130836
        },
        {
            "fromStage": "AddToCart",
            "toStage": "OrderProcessing",
            "dropOff": 51,
            "dropOffRate": 100
        }
    ],
    "conversionRates": [
        {
            "fromStage": "UserLogin",
            "toStage": "AddToCart",
            "rate": 47.66355140186916
        },
        {
            "fromStage": "AddToCart",
            "toStage": "OrderProcessing",
            "rate": 0
        }
    ],
    "overallConversion": 0,
    "stageMetrics": [
        {
            "stage": "UserLogin",
            "count": 107,
            "conversionRate": 100,
            "percentageOfEntry": 100
        },
        {
            "stage": "AddToCart",
            "count": 51,
            "conversionRate": 47.66355140186916,
            "percentageOfEntry": 47.66355140186916
        },
        {
            "stage": "OrderProcessing",
            "count": 0,
            "conversionRate": 0,
            "percentageOfEntry": 0
        }
    ]
}

const FunnelAnalysis = ({ queryFunnelData, setOpenQuery, setLoading, selectedRange }) => {
    const [queryFunnelResult, setQueryFunnelResult] = useState(null)
    const [enableInsights, setEnableInsights] = useState(false);
    const [funnelData, setFunnelData] = useState(null)
    const [funnelAnalysisInsights, setFunnelAnalysisInsights] = useState(null)
    const [computedMetrics, setComputedMetrics] = useState(null)
    useEffect(() => {
        if (queryFunnelData != null) {
            queryFunnelHandler({ ...queryFunnelData, ...selectedRange });

        }
    }, [queryFunnelData, enableInsights, selectedRange]);

    const queryFunnelHandler = async (data) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.QueryBuilder.CustomFunnelEvents, { ...data, "limit": 10, "page": 1, 'generateInsights': enableInsights });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("queryFunnelHandler", response.data)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            setQueryFunnelResult(response.data)
            setFunnelData(response.data.funnelData)
            setFunnelAnalysisInsights(response.data.funnelAnalysisInsights.analysis)
            setComputedMetrics(response.data.funnelAnalysisInsights.computedMetrics)

        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    }

    // const lumoInsightsHandler = () => {
    //     if (queryData != null) {
    //         if (enableInsights) {

    //         }
    //         else {

    //             setLoadingInsights(true)
    //         }
    //         setEnableInsights((prev) => !prev)



    //     }

    // }

    return (
        <div className='pb-xl'>

            {!queryFunnelResult || queryFunnelData == null ? <FunnelFilterInstructions setOpenQuery={setOpenQuery} /> : <>
                <div className='flex justify-between '>
                    <div></div>
                    <div>
                        <button
                            className={clsx('flex rounded-bs items-center gap-s px-l py-xs  shadow-lg shadow-secondary-400 group  bg-secondary-900 hover:bg-secondary-1000')}
                        // onClick={lumoInsightsHandler}
                        >

                            <Image
                                src='/aistar.png'
                                alt="loading.."
                                width={20}
                                height={20}
                                className=" h-2xl w-2xl rounded-bs group-hover:scale-110 transition-all ease-in-out duration-300"
                            />
                            <div className='text-f-l font-normal text-white '>Generate Insights</div>
                            <FaArrowRightLong className='h-l w-l text-white pl-xs group-hover:translate-x-1 transition-all ease-in-out duration-300' />
                        </button>

                    </div>
                </div>
                <div className=' rounded-bs border mt-xl'>
                    <div className='text-f-xl py-l px-xl text-black border-b'>
                        <div>Funnel Analysis</div>
                        <div className='text-f-m text-neutral-1200 flex-1 '>
                            Funnel analysis is a method used to track, visualize, and analyze the step-by-step journey of users or customers through a process.
                        </div>
                    </div>

                    <div className='grid grid-cols-4 gap-l py-xl relative '>
                        <div className='col-span-4 '>   <FunnelChart funnelData={funnelData} /></div>



                    </div>


                </div>
                <FunnelDataAnalysis analysis={funnelAnalysisInsights} funnelData={funnelData} />

                <ComputedMetrics metrics={computedMetrics} />
            </>}



        </div>
    )
}

export default FunnelAnalysis



const FunnelDataAnalysis = ({ analysis, funnelData }) => {
    if (!analysis || !analysis) return <p>Loading...</p>;

    // const { analysis, computedMetrics } = data;

    return (
        <div className="min-h-screen bg-white py-xl">
            {/* Overview Section */}
            <div className='grid grid-cols-2 gap-xl'>
                <div className='col-span-1   '>
                    {analysis.overview && (
                        <div className="bg-white rounded-bs border ">
                            <h2 className="text-f-xl py-l px-xl text-black border-b">Overview</h2>
                            <div className='px-xl py-l h-[350px]'>
                                <p className="text-gray-600 text-f-xl "><span className='font-semibold'>Total Users:</span> {analysis.overview.totalUsers}</p>
                                <p className="text-gray-600 text-f-xl "><span className='font-semibold'>Completion Rate:</span> {analysis.overview.completionRate}%</p>
                                <div>
                                    <ul className="mt-3 text-gray-700">
                                        {analysis.overview.keyInsights.map((insight, index) => (
                                            <li key={index} className="list-disc ml-6">{insight}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                        </div>
                    )}
                </div>
                <div className='col-span-1 '>
                    <div className="bg-white  rounded-bs border mb-6">
                        <h2 className="text-f-xl py-l px-xl text-black border-b">Overview</h2>
                        <div className='px-xl py-l text-black h-[350px]'>
                            <div className='flex bg-neutral-300 rounded-t-bs '>
                                <div className='flex-1 py-m text-center '>S No.</div>
                                <div className='flex-1 py-m text-center'>Stage</div>
                                <div className='flex-1 py-m text-center'>Count</div>
                                <div className='flex-1 py-m text-center'>Conversion Rate</div>
                            </div>
                            <div className='max-h-[250px] overflow-y-scroll hide-scrollbar'>
                                {funnelData2.map((data, index) => (
                                    <div className='flex ' key={index}>
                                        <div className='flex-1  py-m text-center border-x'>{index}</div>
                                        <div className='flex-1  py-m text-center border-x'>{data.stage}</div>
                                        <div className='flex-1  py-m text-center border-x'>{data.count}</div>
                                        <div className='flex-1  py-m text-center border-x'>{data.conversionRate.toFixed(2)}</div>
                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* Stage Analysis */}
            {analysis.stageAnalysis?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {analysis.stageAnalysis.map((stage, index) => (
                        <div key={index} className="bg-white  rounded-bs border">
                            <h3 className="text-f-xl py-l px-xl text-black border-b">{stage.stage}</h3>
                            <div className='px-xl py-l'>
                                <p className="text-gray-600 font-semibold text-f-xl">Insights:</p>
                                <ul className="text-gray-700 mt-l">
                                    {stage.insights.map((insight, idx) => (
                                        <li key={idx} className="list-disc ml-xl">{insight}</li>
                                    ))}
                                </ul>
                                <p className="text-gray-600 font-semibold mt-xl text-f-xl">Recommendations:</p>
                                <ul className="text-gray-700 mt-l">
                                    {stage.recommendations.map((rec, idx) => (
                                        <li key={idx} className="list-disc ml-xl">{rec}</li>
                                    ))}
                                </ul>


                            </div>

                        </div>
                    ))}

                </div>
            )}

            {/* Bottlenecks */}
            {/* {analysis.bottlenecks?.length > 0 && (
                <div className="bg-white p-6 rounded-bs border mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Bottlenecks</h2>
                    <ul className="text-gray-700 mt-2">
                        {analysis.bottlenecks.map((bottleneck, index) => (
                            <li key={index} className="list-disc ml-6">{bottleneck}</li>
                        ))}
                    </ul>
                </div>
            )} */}

            {/* Recommendations */}
            {/* {analysis.recommendations?.length > 0 && (
                <div className="bg-white p-6 rounded-bs border mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Recommendations</h2>
                    <ul className="text-gray-700 mt-2">
                        {analysis.recommendations.map((rec, index) => (
                            <li key={index} className="list-disc ml-6">{rec}</li>
                        ))}
                    </ul>
                </div>
            )} */}

            {/* Performance Metrics */}
            {analysis.performanceMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-xl rounded-bs border">
                        <h3 className="text-f-2xl font-semibold text-gray-800">Top Performing Stage</h3>
                        <p className="text-gray-700 text-f-4xl mt-s">{analysis.performanceMetrics.topPerformingStage}</p>
                    </div>
                    <div className="bg-white p-xl rounded-bs border">
                        <h3 className="text-f-2xl font-semibold text-gray-800">Lowest Performing Stage</h3>
                        <p className="text-gray-700 text-f-4xl mt-s">{analysis.performanceMetrics.lowestPerformingStage}</p>
                    </div>
                    <div className="bg-white p-xl rounded-bs border">
                        <h3 className="text-f-2xl font-semibold text-gray-800">Avg. Conversion Rate</h3>
                        <p className="text-gray-700 text-f-4xl mt-s">{analysis.performanceMetrics.averageConversionRate.toFixed(2)}%</p>
                    </div>
                </div>
            )}

            {/* Drop-Off & Conversion Rates */}
            {/* {computedMetrics.dropOffs?.length > 0 && (
                <div className="mt-6 bg-white p-6 rounded-bs border">
                    <h2 className="text-xl font-semibold text-gray-800">Drop-Off Rates</h2>
                    {computedMetrics.dropOffs.map((drop, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-gray-600">{drop.fromStage} → {drop.toStage}</p>
                            <div className="relative w-full bg-gray-200 rounded-md h-6 mt-2">
                                <div
                                    className="h-6 bg-red-500 rounded-md text-center text-white text-sm"
                                    style={{ width: `${drop.dropOffRate}%` }}
                                >
                                    {drop.dropOffRate.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )} */}

            {/* {computedMetrics.conversionRates?.length > 0 && (
                <div className="mt-6 bg-white p-6 rounded-bs border">
                    <h2 className="text-xl font-semibold text-gray-800">Conversion Rates</h2>
                    {computedMetrics.conversionRates.map((conv, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-gray-600">{conv.fromStage} → {conv.toStage}</p>
                            <div className="relative w-full bg-gray-200 rounded-md h-6 mt-2">
                                <div
                                    className="h-6 bg-green-500 rounded-md text-center text-white text-sm"
                                    style={{ width: `${conv.rate}%` }}
                                >
                                    {conv.rate.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};


const ComputedMetrics = ({ metrics }) => {
    if (!metrics) return <p>Loading...</p>;

    return (
        <div className="bg-white">

            {/* General Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-xl rounded-bs border">
                    <h3 className="text-f-2xl font-semibold text-gray-700">Total Stages</h3>
                    <p className="text-f-4xl text-gray-900 mt-s">{metrics.totalStages}</p>
                </div>
                <div className="bg-white p-xl rounded-bs border">
                    <h3 className="text-f-2xl font-semibold text-gray-700">Total Entries</h3>
                    <p className="text-f-4xl text-gray-900 mt-s">{metrics.entryCount}</p>
                </div>
                <div className="bg-white p-xl rounded-bs border">
                    <h3 className="text-f-2xl font-semibold text-gray-700">Total Exits</h3>
                    <p className="text-f-4xl text-gray-900 mt-s">{metrics.exitCount}</p>
                </div>
            </div>

            {/* Drop-Off Rates */}
            <div className='grid grid-cols-2 gap-xl'>
                <div className='col-span-1'>
                    {metrics.dropOffs?.length > 0 && (
                        <div className="mb-xl border rounded-bs">
                            <h3 className="text-f-xl py-l px-xl text-black border-b">Drop-Off Rates</h3>
                            {metrics.dropOffs.map((drop, index) => (
                                <div key={index} className="px-xl py-l">
                                    <p className="text-gray-600 text-f-xl">{drop.fromStage} → {drop.toStage}</p>
                                    <div className="relative w-full bg-neutral-300 rounded-md h-10xl mt-2">
                                        <div
                                            className="h-10xl bg-red-500 rounded-md text-center text-white text-sm flex justify-center items-center "
                                            style={{ width: `${drop.dropOffRate % 100}%` }}
                                        >
                                            <div className='text-f-2xl'>
                                                {drop.dropOffRate.toFixed(2)}%
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='col-span-1'>
                    {/* Conversion Rates */}
                    {metrics.conversionRates?.length > 0 && (
                        <div className="mb-xl border rounded-bs">
                            <h3 className="text-f-xl py-l px-xl text-black border-b">Conversion Rates</h3>
                            {metrics.conversionRates.map((conv, index) => (
                                <div key={index} className="px-xl py-l">
                                    <p className="text-gray-600 text-f-xl">{conv.fromStage} → {conv.toStage}</p>
                                    <div className="relative w-full bg-neutral-300 rounded-md h-10xl mt-2">
                                        <div
                                            className="h-10xl bg-green-500 rounded-md text-center text-white text-sm flex justify-center items-center "
                                            style={{ width: `${conv.rate % 100}%` }}
                                        >
                                            <div className={clsx('text-f-2xl', conv.rate.toFixed(2) == 0 && ' ml-[100px]')}>
                                                {conv.rate.toFixed(2)}%
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>




            {/* Overall Conversion */}
            <div className="bg-neutral-100 p-xl rounded-lg text-center">
                <h3 className="text-neutral-900 text-gray-70 text-f-4xl">Overall Conversion</h3>
                <p className="text-f-10xl  text-gray-900">{metrics.overallConversion.toFixed(2)}%</p>
            </div>

            {/* Stage Metrics */}
            {metrics.stageMetrics?.length > 0 && (
                <div className="mt-xl border rounded-bs">
                    <h3 className="text-f-xl py-l px-xl text-black border-b">Stage Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-l px-xl">
                        {metrics.stageMetrics.map((stage, index) => (
                            <div key={index} className="p-xl bg-gray-100 rounded-lg shadow-sm">
                                <h4 className="text-f-2xl font-semibold text-gray-700">{stage.stage}</h4>
                                <p className="text-gray-600 text-f-xl mt-l">Users: {stage.count}</p>
                                <p className="text-gray-600 text-f-xl">Conversion Rate: {stage.conversionRate.toFixed(2)}%</p>
                                <p className="text-gray-600 text-f-xl">Entry %: {stage.percentageOfEntry.toFixed(2)}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const FunnelFilterInstructions = ({ setOpenQuery }) => {
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
                How to Use Funnel Query Builder
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-2xl text-f-l text-center max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                Use the funnel query builder to analyze user journeys across multiple stages. Select predefined custom event stages, set geographical filters, adjust duration, and configure event properties.
            </motion.p>

            <div className="grid grid-cols-2 gap-l w-full max-w-4xl">
                {[
                    {
                        Icon: FaFilter,
                        title: "Custom Event Stages",
                        desc: "Define different event stages to track user progression within the funnel.",
                        iconClass: "text-primary-900"
                    },
                    {
                        Icon: FaMapMarkerAlt,
                        title: "Geo Map",
                        desc: "Select geographical regions to analyze funnel data based on location.",
                        iconClass: "text-brand1-700"
                    },
                    {
                        Icon: FaClock,
                        title: "Duration",
                        desc: "Specify time frames to track user behavior across different funnel stages.",
                        iconClass: "text-secondary-900"
                    },
                    {
                        Icon: FaList,
                        title: "Event Stage Properties",
                        desc: "Configure specific event stage attributes for detailed funnel analysis.",
                        iconClass: "text-primary-900"
                    }
                ].map(({ Icon, title, desc, iconClass }, i) => (
                    <motion.div
                        key={i}
                        className="p-xl flex flex-col items-center border rounded-bs"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        <Icon className={`${iconClass} mb-s`} size={32} />
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
                Start Building Funnels
            </motion.button>
        </motion.div>
    );
};
