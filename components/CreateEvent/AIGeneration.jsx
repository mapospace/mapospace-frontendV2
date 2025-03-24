import {
    FaRobot,
    FaComments,
    FaMagic,
    FaLightbulb,
    FaSearch,
    FaBolt,
    FaSpinner,
    FaChartBar,
    FaDatabase,
    FaCog,
    FaArrowRight,
    FaRegularQuestionCircle,
    FaInfoCircle,
    FaExclamationCircle,
    FaCheck
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIChartRenderer from "./AIChartRenderer";
import AuthServices from "@/utils/axios-api";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import Select from "react-select";
import Skeleton from 'react-loading-skeleton'
import getUniqueKeys from "@/utils/get-unique-keys";
import toCapitalizedCase from "@/utils/capitalized-case";

const sampleData = {
    results: [
        {
            type: "bar",
            message: "Sales by Currency",
            data: [
                { label: "INR", value: 25762.7, message: "", percentage: 100 },
                { label: "USD", value: 15234.2, message: "", percentage: 80 },
            ],
        },
        {
            type: "pie",
            message: "Market Share",
            data: [
                { label: "Apple", value: 45, percentage: 45 },
                { label: "Samsung", value: 35, percentage: 35 },
                { label: "Other", value: 20, percentage: 20 },
            ],
        },
        {
            type: "line",
            message: "Visitors Over Time",
            data: [
                { x: "Jan", y: 200 },
                { x: "Feb", y: 400 },
                { x: "Mar", y: 600 },
            ],
        },
        {
            type: "timeSeries",
            data: [
                { timestamp: "2025-03-05T00:00:00.000Z", value: 835.46 },
                { timestamp: "2025-03-06T00:00:00.000Z", value: 900.12 },
            ],
        },
        {
            type: "scatter",
            message: "Height vs Weight",
            data: [
                { x: 150, y: 60 },
                { x: 160, y: 70 },
                { x: 170, y: 80 },
            ],
        },
        {
            type: "message",
            message: "This is just a message without any chart.",
        },
        {
            type: "heatmap",
            message: "Heatmap sample",
            data: [
                { x: "A", y: "1", value: 30 },
                { x: "B", y: "1", value: 40 },
                { x: "c", y: "1", value: 80 },
            ],
        },
    ],
};

const style = {
    control: (provided) => ({
        ...provided,
        minHeight: 'unset',
        height: 'auto',
        padding: "2px",
        margin: 0,
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#fff',
        color: '#bfbfbf',
        borderRadius: '8px'
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999, // Ensures dropdown appears above everything
        backgroundColor: '#ffffff', // Matches parent container background
        borderRadius: '8px',
        // border: '1px solid #bfbfbf',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '4px',
        color: '#000',
        fontSize: '12px'
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999, // Ensures dropdown appears on top
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '2px',
        margin: 0,
        color: '#bfbfbf', // Matches text color
        borderRadius: '8px'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        padding: '5px',
        color: '#bfbfbf',
        borderRadius: '8px',

    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0px',
        margin: 0,
        color: '#bfbfbf',
        borderRadius: '8px',
        fontSize: '12px',

    }),
    singleValue: (provided) => ({
        ...provided,
        paddingLeft: '4px',
        margin: 0,
        borderRadius: '8px',

    }),
    multiValueRemove: (provided) => ({
        ...provided,
        padding: 0, // Removes padding around the cross icon
    }),
}

const AIGeneration = () => {
    const [eventNameList, setEventNameList] = useState([]);
    const [result, setResult] = useState([]);
    const [selectedValueOption, setSelectedValueOption] = useState(null);
    const [query, setQuery] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [tableData, setTableData] = useState(null);
    const [uniqueKeys, setUniqueKeys] = useState([]);

    const handleGenerate = () => {
        if (!selectedValueOption) {
            setError("Please select an event type");
            return;
        }
        if (!query.trim()) {
            setError("Please enter a query");
            return;
        }

        setError("");
        setIsGenerating(true);
        generateAITableHandler()
        generateAIVisualizationHandler()
            .finally(() => {
                setIsGenerating(false);
            });
    };

    useEffect(() => {
        setError("");
    }, [query, selectedValueOption]);

    useEffect(() => {

        getEventHandler();
    }, [])


    const getEventHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.getApiCallHandler(API_ENDPOINTS.CustomEvent.CustomEvents);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }

            const data = response.data.customEventTypes.map((event) => {
                return { value: event.name, label: event.name }
            })
            // setEventList(response.data.customEventTypes)
            setEventNameList(data)
            setSelectedValueOption(data[0].value)

            // setCustomEventTypes(response.data.customEventTypes)
        } catch (err) {
            console.error("Error fetching user details:", err);
            // setError(err.message);
        }
    };
    const generateAITableHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.AI.CustomEventsWithChat, {
                filterPrompt: query,
                customEventTypeName: selectedValueOption,
                startDate: "2023-01-01T00:00:00Z",
                endDate: "2026-02-28T23:59:59Z",
            });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                setUniqueKeys([]); // Reset to empty on error
                return;
            }

            console.log("generateAITableHandler", response.data);

            const Unique = getUniqueKeys(response.data.results || []);
            setUniqueKeys(Unique);
            console.log("query results Handler", response.data, Unique);
            setTableData(response.data.results || []);
        } catch (err) {
            console.error("Error fetching user details:", err);
            setUniqueKeys([]); // Reset to empty on exception
        }
    };

    const generateAIVisualizationHandler = async (period) => {
        try {
            setLoading(true);
            setShowResult(false);
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.AI.CustomEvents, {
                aggregationPrompt: query,
                customEventTypeName: selectedValueOption,
                "startDate": "2023-01-01T00:00:00Z",
                "endDate": "2026-02-28T23:59:59Z",
            });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("total sales over all", response?.data);
            setTimeout(() => {
                setLoading(false);
                setShowResult(true)
            }, 1500)
            setResult(response?.data.results)
        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    return (
        <div className="relative">

            {/* bottom Search Bar */}
            {(showResult || loading) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="max-w-4xl mx-auto mt-xl"
                >
                    <div className="relative bg-white/70 backdrop-blur-xl p-2 rounded-2xl border border-gray-100 shadow-xl shadow-blue-500/5">
                        <div className="flex items-center gap-2">
                            <div className="relative min-w-[200px]">
                                <Select
                                    options={eventNameList}
                                    value={eventNameList.find(option => option.value === selectedValueOption)}
                                    onChange={(selected) => setSelectedValueOption(selected.value)}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    isSearchable={false}
                                    className="!border-0"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            background: 'transparent',
                                            border: 'none',
                                            borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                                            borderRadius: 0,
                                            minHeight: '22px',
                                            cursor: 'pointer',
                                            padding: '0 8px',
                                        }),
                                        singleValue: (base) => ({
                                            ...base,
                                            color: '#1F2937',
                                        }),
                                        dropdownIndicator: (base) => ({
                                            ...base,
                                            color: '#6B7280',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            background: 'rgba(255, 255, 255, 0.98)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                            borderRadius: '1rem',
                                            padding: '4px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#F3F4F6' : 'transparent',
                                            color: state.isSelected ? 'white' : '#1F2937',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            '&:active': {
                                                backgroundColor: '#3B82F6',
                                            },
                                        }),
                                    }}
                                />
                            </div>

                            <div className="relative flex-1 flex items-center ">
                                <FaSearch className="absolute left-4 text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Try: 'Sum of amount split by currency and grouped by username'"
                                    className={`w-full bg-transparent text-gray-800 placeholder-gray-400 pl-12 pr-4  outline-none ${error && !query.trim() ? 'border-red-500' : ''}`}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                animate={isGenerating ? {
                                    scale: [1, 1.02, 1],
                                    transition: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                } : {}}
                                className={` ai_button relative flex items-center gap-2 px-6 py-xl bg-gradient-to-b from-secondary-700 to-secondary-900 rounded-xl font-medium text-white shadow-lg transition-all duration-200
                                        ${isGenerating ? 'shadow-blue-500/40 cursor-wait' : 'shadow-blue-500/25 hover:shadow-blue-500/40'}`}
                                onClick={handleGenerate}
                            >
                                <div className="dots_border"></div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="sparkle"
                                >
                                    <path
                                        className="path"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        stroke="black"
                                        fill="black"
                                        d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                                    ></path>
                                    <path
                                        className="path"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        stroke="black"
                                        fill="black"
                                        d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                                    ></path>
                                    <path
                                        className="path"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        stroke="black"
                                        fill="black"
                                        d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                                    ></path>
                                </svg>
                                <span className="text_button">Generate </span>

                                {/* Error tooltip */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-2"
                                    >
                                        <FaExclamationCircle />
                                        {error}
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-red-500" />
                                    </motion.div>
                                )}
                            </motion.button>
                        </div>

                        {/* Shimmer Effect */}
                        <AnimatePresence>
                            {isGenerating && !error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-secondary-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-2"
                                >
                                    <FaInfoCircle className="text-blue-100" />
                                    <span className="flex items-center gap-2">
                                        Processing your request
                                        <motion.span
                                            animate={{
                                                opacity: [0.4, 1, 0.4]
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            ...
                                        </motion.span>
                                    </span>
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-blue-500" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </motion.div>
            )}
            {/* )} */}

            {/* loading */}
            {loading &&
                <div className="p-4 space-y-6 min-h-screen">
                    {/* Title */}
                    <div className="w-1/3">
                        <Skeleton height={30} />
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((_, idx) => (
                            <div key={idx} className="p-4 rounded-lg border  shadow-sm">
                                <Skeleton height={20} width="50%" />
                                <Skeleton height={30} width="80%" className="mt-2" />
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="mt-6">
                        <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} />
                    </div>
                </div>
            }

            {/* Results */}
            {showResult && result.length > 0 &&
                <div className="mt-xl mb-xl ">
                    <div className="text-f-4xl font-bold mb-xl pb-s text-black  border-b">
                        <div>AI-Generated Data Insights</div>
                        <p className="text-f-l text-neutral-600 font-normal">These visualizations are automatically created using Lumo to help you quickly understand your data.</p>
                    </div>
                    <AIChartRenderer results={result} />
                </div>
            }


            {!loading && !showResult && <LumoAIInstructions
                eventNameList={eventNameList}
                selectedValueOption={selectedValueOption}
                setSelectedValueOption={setSelectedValueOption}
                query={query}
                setQuery={setQuery}
                handleGenerate={handleGenerate}
                error={error}
                isGenerating={isGenerating}
            />}

            {uniqueKeys.length > 0 &&

                <div className='grid grid-cols-1 gap-xl '>
                    <div className='col-span-1'>
                        <UserTable data={tableData} uniqueKeys={uniqueKeys} />
                    </div>

                </div>
            }
        </div>
    )
}

export default AIGeneration



const LumoAIInstructions = ({ eventNameList, selectedValueOption, setSelectedValueOption, query, setQuery, isGenerating, error, handleGenerate }) => {


    const suggestions = [
        {
            icon: FaChartBar,
            text: "Sum of amount split by currency and grouped by payment method"
        },
        {
            icon: FaDatabase,
            text: "Average amount by username"
        },
        {
            icon: FaCog,
            text: "Count of purchases by currency"
        },
        {
            icon: FaChartBar,
            text: "Total amount by username"
        },
        {
            icon: FaDatabase,
            text: "Sum of amount grouped by month"
        },
        {
            icon: FaLightbulb,
            text: "Max amount by username"
        }
    ];



    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full min-h-screen bg-white overflow-hidden px-4 py-4xl"
        >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-100/30 to-purple-100/30 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-100/30 to-blue-100/30 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-100 mb-6"
                    >
                        <span className="text-sm font-medium text-blue-700">AI-Powered Analytics</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text"
                    >
                        Meet Lumo AI
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Your intelligent assistant for data analysis. No SQL needed — just ask in plain English.
                    </motion.p>
                </div>

                {eventNameList.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative bg-white/70 backdrop-blur-xl p-2 rounded-2xl border border-gray-100 shadow-xl shadow-blue-500/5">
                            <div className="flex items-center gap-2">
                                <div className="relative min-w-[200px]">
                                    <Select
                                        options={eventNameList}
                                        value={eventNameList.find(option => option.value === selectedValueOption)}
                                        onChange={(selected) => setSelectedValueOption(selected.value)}
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        isSearchable={false}
                                        className="!border-0"
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                background: 'transparent',
                                                border: 'none',
                                                borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                                                borderRadius: 0,
                                                minHeight: '22px',
                                                cursor: 'pointer',
                                                padding: '0 8px',
                                            }),
                                            singleValue: (base) => ({
                                                ...base,
                                                color: '#1F2937',
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                color: '#6B7280',
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                background: 'rgba(255, 255, 255, 0.98)',
                                                backdropFilter: 'blur(8px)',
                                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                                borderRadius: '1rem',
                                                padding: '4px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#F3F4F6' : 'transparent',
                                                color: state.isSelected ? 'white' : '#1F2937',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer',
                                                '&:active': {
                                                    backgroundColor: '#3B82F6',
                                                },
                                            }),
                                        }}
                                    />
                                </div>

                                <div className="relative flex-1 flex items-center ">
                                    <FaSearch className="absolute left-4 text-gray-400 text-lg" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Try: 'Sum of amount split by currency and grouped by username'"
                                        className={`w-full bg-transparent text-gray-800 placeholder-gray-400 pl-12 pr-4  outline-none ${error && !query.trim() ? 'border-red-500' : ''}`}
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    animate={isGenerating ? {
                                        scale: [1, 1.02, 1],
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    } : {}}
                                    className={` ai_button relative flex items-center gap-2 px-6 py-xl bg-gradient-to-b from-secondary-700 to-secondary-900 rounded-xl font-medium text-white shadow-lg transition-all duration-200
                                        ${isGenerating ? 'shadow-blue-500/40 cursor-wait' : 'shadow-blue-500/25 hover:shadow-blue-500/40'}`}
                                    onClick={handleGenerate}
                                >
                                    <div className="dots_border"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="sparkle"
                                    >
                                        <path
                                            className="path"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            stroke="black"
                                            fill="black"
                                            d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                                        ></path>
                                        <path
                                            className="path"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            stroke="black"
                                            fill="black"
                                            d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                                        ></path>
                                        <path
                                            className="path"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            stroke="black"
                                            fill="black"
                                            d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                                        ></path>
                                    </svg>
                                    <span className="text_button">Generate </span>

                                    {/* Error tooltip */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-2"
                                        >
                                            <FaExclamationCircle />
                                            {error}
                                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-red-500" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            </div>

                            {/* Shimmer Effect */}
                            <AnimatePresence>
                                {isGenerating && !error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-2"
                                    >
                                        <FaInfoCircle className="text-blue-100" />
                                        <span className="flex items-center gap-2">
                                            Processing your request
                                            <motion.span
                                                animate={{
                                                    opacity: [0.4, 1, 0.4]
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                ...
                                            </motion.span>
                                        </span>
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-blue-500" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mt-6 flex items-center gap-4 justify-center text-gray-600"
                        >
                            <div className="flex items-center gap-2">
                                <FaLightbulb className="text-yellow-500" />
                                <span className="text-sm font-medium">Try these examples:</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 justify-center">
                                {suggestions.map(({ icon: Icon, text }, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: 'rgba(255, 255, 255, 1)',
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-3 py-1.5 bg-white/80 rounded-lg text-sm text-gray-600 transition-all duration-200 border border-gray-100 shadow-sm hover:shadow-md flex items-center gap-2 group"
                                        onClick={() => setQuery(text)}
                                    >
                                        <Icon className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                                        <span className="truncate max-w-[200px]">{text}</span>
                                        <FaArrowRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-24">
                    {[
                        {
                            Icon: FaMagic,
                            title: "Instant Analysis",
                            description: "Get insights from your data in seconds",
                            gradient: "from-purple-500 to-indigo-500"
                        },
                        {
                            Icon: FaComments,
                            title: "Natural Language",
                            description: "Ask questions in plain English",
                            gradient: "from-blue-500 to-cyan-500"
                        },
                        {
                            Icon: FaLightbulb,
                            title: "Smart Insights",
                            description: "Discover patterns automatically",
                            gradient: "from-emerald-500 to-teal-500"
                        },
                        {
                            Icon: FaRobot,
                            title: "AI Assistant",
                            description: "Get intelligent recommendations",
                            gradient: "from-orange-500 to-pink-500"
                        }
                    ].map(({ Icon, title, description, gradient }, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index + 0.8, duration: 0.6 }}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl  flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="text-black text-f-4xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}


const UserTable = ({ data, uniqueKeys }) => {

    return (
        <div className="w-full  bg-white border rounded-xl mb-2xl">
            <div className='text-f-xl py-l px-xl text-black border-b'>
                <div>Event Data Insights</div>

            </div>
            <div className='w-full px-l py-xl  '>
                <div className='overflow-x-auto rounded-t-bs hide-scrollbar'>
                    <div className='flex  '>
                        <div className="min-w-[200px] bg-neutral-200  text-center flex-1 py-s text-f-m font-medium text-black">S. No</div>
                        {uniqueKeys.map((value, index) => (
                            <div key={index} className="min-w-[200px] bg-neutral-200  text-center flex-1 py-s text-f-m font-medium text-black border-x border-neutral-600">{toCapitalizedCase(value)}</div>
                        ))}

                    </div>
                    <div className='flex flex-col max-h-[400px] overflow-y-scroll overflow-x-hidden hide-scrollbar '>
                        {data.map((item, index) => (
                            <div className='flex '
                                key={index}
                            >
                                <div className="min-w-[200px] text-center flex-1 py-s text-f-m text-black">{index + 1}</div>
                                {uniqueKeys.map((value, index) => (
                                    <div key={index} className="min-w-[200px] text-center flex-1 py-s text-f-m  text-black">
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