import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaClock, FaLayerGroup, FaUndo } from "react-icons/fa";
import { motion } from "framer-motion";

const Retention = ({ queryRetentionData, setOpenQuery, setLoading, selectedRange }) => {
    const [retentionRate, setRetentionRate] = useState(null);

    useEffect(() => {
        if (queryRetentionData != null) {
            queryFunnelHandler({ ...queryRetentionData, ...selectedRange });

        }
    }, [queryRetentionData, selectedRange]);

    const queryFunnelHandler = async (data) => {
        try {

            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.QueryBuilder.CustomRetentionEvents, { ...data, "days": 10000 });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("queryFunnelHandler", response.data)
            // setQueryFunnelResult(response.data)
            setRetentionRate(parseFloat(response.data.retentionRate));
            setTimeout(() => {
                setLoading(false)
            }, 1000)

        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    }

    return (
        <div>

            {retentionRate !== null ? (
                <div className="mt-xl  rounded-bs border  w-[50%] min-w-[400px]  text-black">
                    <div className='text-f-xl py-l px-xl text-black border-b '>
                        <div>Retention Rate</div>

                    </div>
                    <p className="text-f-l text-gray-600  p-xl">
                        This represents the percentage of users who returned to your platform after their first visit within the selected timeframe.
                    </p>
                    <div className='p-l  flex justify-center'>
                        <p className="text-f-10xl font-bold text-secondary-900">
                            {retentionRate.toFixed(2)}%
                        </p>
                    </div>

                </div>
            ) : <RetentionFilterInstructions setOpenQuery={setOpenQuery} />}
        </div>
    )
}

export default Retention


const RetentionFilterInstructions = ({ setOpenQuery }) => {
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
                How to Use Retention Query Builder
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-2xl text-f-l text-center max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                Use the retention query builder to analyze user retention patterns. Select a base event type, return event type, set geographical filters, and adjust duration.
            </motion.p>

            <div className="grid grid-cols-2 gap-l w-full max-w-4xl">
                {[
                    {
                        Icon: FaLayerGroup,
                        title: "Base Event Type",
                        desc: "Select the initial event that marks the start of a user’s journey.",
                        iconClass: "text-secondary-900"
                    },
                    {
                        Icon: FaUndo,
                        title: "Return Event Type",
                        desc: "Define the follow-up event that determines user retention.",
                        iconClass: "text-green-700"
                    },
                    {
                        Icon: FaMapMarkerAlt,
                        title: "Geo Map",
                        desc: "Select geographical regions to analyze retention trends by location.",
                        iconClass: "text-orange-500"
                    },
                    {
                        Icon: FaClock,
                        title: "Duration",
                        desc: "Define the time frame for measuring user return rates.",
                        iconClass: "text-primary-900"
                    }
                ].map(({ Icon, title, desc, iconClass }, i) => (
                    <motion.div
                        key={i}
                        className="p-xl flex flex-col items-center border rounded-bs fancy-card"
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
                Start Retention Analysis
            </motion.button>
        </motion.div>
    );
};
