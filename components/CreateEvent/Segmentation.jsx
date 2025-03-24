import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import AuthServices from '@/utils/axios-api';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { FaMapMarkerAlt, FaClock, FaFilter, FaLayerGroup } from "react-icons/fa";
import { motion } from "framer-motion";
import getUniqueKeys from '@/utils/get-unique-keys';
import toCapitalizedCase from '@/utils/capitalized-case';
import { boolean } from 'yup';
import getColorForValue from '@/utils/get-color-for-value';

// Register the components needed for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// const barData = [
//     { make: "Huawei", userCount: 20 },
//     { make: "Apple", userCount: 17 },
//     { make: "Samsung", userCount: 17 },
//     { make: "Google", userCount: 14 },
//     { ipAddress: "2", make: "OnePlus", userCount: 2 },
//     { ipAddress: "192.168.1.1", make: "OnePlus", userCount: 1 },
//     { ipAddress: "1", make: "OnePlus", userCount: 1 },
//     { ipAddress: "3", make: "OnePlus", userCount: 1 },
//     { ipAddress: "4", make: "OnePlus", userCount: 1 },
// ];

const Segmentation = ({ querySegmentsData, setOpenQuery, setLoading }) => {
    const [segmentData, setSegmentData] = useState(null);
    const [uniqueKeys, setUniqueKeys] = useState([]);
    useEffect(() => {
        if (querySegmentsData != null) {
            queryFunnelHandler(querySegmentsData);

        }
    }, [querySegmentsData]);

    const queryFunnelHandler = async (data) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.QueryBuilder.CustomSegmentationEvents, { ...data, "limit": 10, "page": 1 });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            // setQueryFunnelResult(response.data)
            const Unique = getUniqueKeys(response.data);
            setUniqueKeys(Unique)
            console.log("query Segmentation Handler", response.data, Unique)
            setSegmentData(response.data)
            setTimeout(() => {
                setLoading(false)
            }, 1000)

        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    }


    return (
        <div className=" ">

            {uniqueKeys.length > 0 ? <div className='border  rounded-bs '>
                <div className='text-f-xl py-l px-xl text-black border-b'>
                    <div>Segmentation Analysis</div>
                    <div className='text-f-m text-neutral-1200 flex-1 '>
                        Segmentation analysis involves dividing a target market or user base into distinct groups based on specific characteristics such as demographics, behavior, or preferences. By identifying these segments, businesses can tailor marketing strategies, products, and services to better meet the needs of each group, enhancing engagement and improving outcomes.
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-xl p-xl'>
                    <div className='col-span-1'>
                        <UserSegment data={segmentData} uniqueKeys={uniqueKeys} />
                    </div>

                </div>
                <div className='grid grid-cols-1 gap-xl p-xl pt-0'>
                    <div className='col-span-1'>
                        <UserSegmentChart barData={segmentData} uniqueKeys={uniqueKeys} />
                    </div>
                </div>
            </div> : <SegmentationFilterInstructions setOpenQuery={setOpenQuery} />}
        </div>
    )
}

export default Segmentation

const UserSegmentChart = ({ barData, uniqueKeys }) => {
    // Prepare data for the bar chart
    const [data, setData] = useState({ labels: [], datasets: [] });


    useEffect(() => {
        if (!barData || barData.length === 0) return;
        const labels = barData.map((item, index) => { return `Segment ${index + 1}` });
        const values = barData.map((item) => item.userCount);

        // Create a single dataset
        const maxValue = Math.max(...values);
        const dataset = {
            label: 'Segment',
            data: values,
            backgroundColor: values.map(value => getColorForValue(value, maxValue))
        };

        setData({
            labels, // Labels for the X axis
            datasets: [dataset], // Adding the dataset
        });

    }, [barData]);

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        return `${tooltipItems[0].label}`;
                    },
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        const item = barData[index];

                        const lines = uniqueKeys.map(key => {
                            let value = item[key];

                            // Handle null/undefined
                            if (value === null || value === undefined) {
                                value = 'N/A';
                            }
                            // Handle boolean values
                            else if (typeof value === 'boolean') {
                                value = toCapitalizedCase(value.toString());
                            }

                            // Capitalize the key name
                            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                            return `${formattedKey}: ${value}`;
                        });

                        return lines;
                    },
                },
            },
            datalabels: {
                display: false,
            },
        },

    };

    return (
        <div className="w-full  bg-white border rounded-xl">
            <div className='text-f-xl py-l px-xl text-black border-b'>
                <div>User Segment Chart</div>

            </div>
            <div className='p-xl  h-[450px]'>
                <Bar data={data} options={barOptions} />
            </div>

        </div>
    );
};


const UserSegment = ({ data, uniqueKeys }) => {

    return (
        <div className="w-full  bg-white border rounded-xl">
            <div className='text-f-xl py-l px-xl text-black border-b'>
                <div>User Segment Data</div>

            </div>
            <div className='w-full px-l py-xl  '>
                <div className='overflow-x-auto rounded-t-bs hide-scrollbar'>
                    <div className='flex  '>
                        <div className="min-w-[200px] bg-neutral-200  text-center flex-1 py-s text-f-l font-medium text-black">S. No</div>
                        {uniqueKeys.map((value, index) => (
                            <div key={index} className="min-w-[200px] bg-neutral-200  text-center flex-1 py-s text-f-l font-medium text-black border-x border-neutral-600">{toCapitalizedCase(value)}</div>
                        ))}

                    </div>
                    <div className='flex flex-col max-h-[400px] overflow-y-scroll overflow-x-hidden hide-scrollbar '>
                        {data.map((item, index) => (
                            <div className='flex '
                                key={index}
                            >
                                <div className="min-w-[200px] text-center flex-1 py-s text-f-l  text-black">{index + 1}</div>
                                {uniqueKeys.map((value, index) => (
                                    <div key={index} className="min-w-[200px] text-center flex-1 py-s text-f-l  text-black">
                                        {item[value] === true
                                            ? "True"
                                            : item[value] === false
                                                ? "False"
                                                : item[value]
                                                    ? item[value]
                                                    : "NA"}
                                    </div>
                                ))}

                            </div>
                        ))}


                    </div>
                </div>

            </div>
        </div>
    );
};


const SegmentationFilterInstructions = ({ setOpenQuery }) => {
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
                How to Use Segmentation Query Builder
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-2xl text-f-l text-center max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                Use the segmentation query builder to analyze user groups based on behavior, geography, and time. Select predefined custom event stages, set geographical filters, adjust duration, and segment based on properties.
            </motion.p>

            <div className="grid grid-cols-2 gap-l w-full max-w-4xl">
                {[
                    {
                        Icon: FaFilter,
                        title: "Custom Event Stages",
                        desc: "Define different event stages to segment user behavior.",
                        iconClass: "text-primary-700"
                    },
                    {
                        Icon: FaMapMarkerAlt,
                        title: "Geo Map",
                        desc: "Select geographical regions to segment user data based on location.",
                        iconClass: "text-brand1-700"
                    },
                    {
                        Icon: FaClock,
                        title: "Duration",
                        desc: "Specify time frames to segment user behavior over a selected period.",
                        iconClass: "text-secondary-900"
                    },
                    {
                        Icon: FaLayerGroup,
                        title: "Segmentation Properties",
                        desc: "Define properties to create user segments based on specific attributes.",
                        iconClass: "text-primary-800"
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
                Start Segmenting Users
            </motion.button>
        </motion.div>
    );
};