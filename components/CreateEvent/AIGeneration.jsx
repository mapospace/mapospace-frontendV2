import { FaRobot, FaComments, FaMagic, FaLightbulb, FaSearch, FaBolt, FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIChartRenderer from "./AIChartRenderer";
import AuthServices from "@/utils/axios-api";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import Select from "react-select";
import Skeleton from 'react-loading-skeleton'
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
            // setCatalogList(response?.data)
            // console.log("getEventHandler", response.data)
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

    const totalSaleLineOverTimeHandler = async (period) => {
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
            {/* bottom Search Bar */}
            {(showResult || loading) && (
                <div className="w-full fixed bottom-0 z-30 right-0">
                    <div className="h-full w-full ml-6xl bg-transparent py-s">
                        <div className="max-w-5xl px-xl py-s bg-white h-full mx-auto rounded-bs border">
                            {(eventNameList.length > 0 || query) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="mx-auto flex flex-wrap gap-xl items-center"
                                >
                                    {/* Select Box */}
                                    <motion.div whileHover={{ scale: 1.02 }} className=" bg-transparent flex gap-s ">
                                        {/* <div className="text-f-s mb-xs font-semibold text-black">Custom Event Type</div> */}
                                        <Select
                                            options={eventNameList}
                                            value={eventNameList.find(option => option.value === selectedValueOption)}
                                            onChange={(selected) => {
                                                setSelectedValueOption(selected.value);
                                            }}
                                            menuPortalTarget={document.body}
                                            menuPosition="fixed"
                                            isSearchable={false}
                                            className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black !text-f-s z-30 "
                                            styles={{
                                                ...style,
                                                control: (provided) => ({
                                                    ...provided,
                                                    minHeight: 'unset',
                                                    width: '200px',
                                                    height: 'auto',
                                                    padding: '4px',
                                                    margin: 0,
                                                    border: '1px solid #bfbfbf',
                                                    boxShadow: 'none',
                                                    backgroundColor: '#fff',
                                                    color: '#bfbfbf',
                                                    borderRadius: '8px',
                                                }),
                                            }}
                                        />
                                    </motion.div>

                                    {/* Input + Button */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className=" flex-1"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="flex items-center gap-3 bg-white border pl-m  border-neutral-600 rounded-bs hover:border-secondary-900"
                                        >
                                            <FaSearch className="text-neutral-600 text-f-xl ml-s" />
                                            <input
                                                type="text"
                                                className="w-full outline-none text-f-m text-neutral-800"
                                                placeholder="Try: 'Sum of amount split by currency and grouped by username'"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-secondary-900 hover:bg-secondary-1000 text-white px-xl py-s rounded-bs flex items-center gap-2"
                                                onClick={totalSaleLineOverTimeHandler}
                                            >
                                                <FaBolt /> Generate
                                            </motion.button>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            {showResult && result.length > 0 &&
                <div className="mt-xl mb-[100px]">
                    <h1 className="text-f-3xl font-bold mb-6 text-black">AI Visualizations</h1>
                    <AIChartRenderer results={result} />
                </div>
            }


            {!loading && !showResult && <LumoAIInstructions
                eventNameList={eventNameList}
                selectedValueOption={selectedValueOption}
                setSelectedValueOption={setSelectedValueOption}
                query={query}
                setQuery={setQuery}
                totalSaleLineOverTimeHandler={totalSaleLineOverTimeHandler}
            />}
        </div>
    )
}

export default AIGeneration

const ShimmerEffect = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute -bottom-24 left-0 right-0 mx-auto max-w-3xl"
    >
        <div className="relative h-16 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
                animate={{
                    x: ['-100%', '100%'],
                    backgroundPosition: ['100%', '-100%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-3 h-3 rounded-full bg-blue-400/50"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [1, 0.5, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-3 h-3 rounded-full bg-indigo-400/50"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-3 h-3 rounded-full bg-purple-400/50"
                />
            </div>
        </div>
    </motion.div>
);

const LumoAIInstructions = ({ eventNameList, selectedValueOption, setSelectedValueOption, query, setQuery, totalSaleLineOverTimeHandler }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");

    const suggestions = [
        "Sum of amount split by currency and grouped by username",
        "Average amount by username",
        "Count of purchases by currency",
        "Total amount by username",
        "Sum of amount grouped by month",
        "Max amount by username",
    ];

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
        totalSaleLineOverTimeHandler()
            .finally(() => {
                setIsGenerating(false);
            });
    };

    // Clear error when user types or selects
    useEffect(() => {
        setError("");
    }, [query, selectedValueOption]);

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 overflow-hidden px-4 py-20"
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
                        <FaRobot className="text-blue-600" />
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
                                                minHeight: '52px',
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

                                <div className="relative flex-1 flex items-center">
                                    <FaSearch className="absolute left-4 text-gray-400 text-lg" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Try: 'Sum of amount split by currency and grouped by username'"
                                        className={`w-full bg-transparent text-gray-800 placeholder-gray-400 pl-12 pr-4 py-4 outline-none ${error && !query.trim() ? 'border-red-500' : ''}`}
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
                                    className={`relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-medium text-white shadow-lg transition-all duration-200
                                        ${isGenerating ? 'shadow-blue-500/40 cursor-wait' : 'shadow-blue-500/25 hover:shadow-blue-500/40'}`}
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <>
                                            <motion.div
                                                animate={{
                                                    rotate: 360
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            >
                                                <FaSpinner className="text-white text-lg" />
                                            </motion.div>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <FaBolt className="text-yellow-300" />
                                            Generate
                                        </>
                                    )}

                                    {/* Error tooltip */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap"
                                        >
                                            {error}
                                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-red-500" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            </div>
                            
                            {/* Shimmer Effect */}
                            <AnimatePresence>
                                {isGenerating && <ShimmerEffect />}
                            </AnimatePresence>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mt-6 flex items-center gap-4 justify-center text-gray-600"
                        >
                            <FaLightbulb className="text-yellow-500" />
                            <div className="text-sm">
                                Try these examples:
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {suggestions.map((suggestion, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-3 py-1.5 bg-white/80 hover:bg-white rounded-lg text-sm text-gray-600 transition-colors duration-200 border border-gray-100 shadow-sm hover:shadow-md"
                                            onClick={() => setQuery(suggestion)}
                                        >
                                            {suggestion}
                                        </motion.button>
                                    ))}
                                </div>
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
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="text-white text-xl" />
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
