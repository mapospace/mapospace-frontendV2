import { FaRobot, FaComments, FaMagic, FaLightbulb, FaSearch, FaBolt } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
const AIGeneration = () => {
    return (
        <div><LumoAIInstructions /></div>
    )
}

export default AIGeneration

const LumoAIInstructions = () => {
    const [query, setQuery] = useState("");
    const suggestions = [
        "Sum of amount split by currency and grouped by username",
        "Average amount by username",
        "Count of purchases by currency",
        "Total amount by username",
        "Sum of amount grouped by month",
        "Max amount by username",
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full py-24 px-6 sm:px-16 bg-white text-neutral-900"
        >
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-f-6xl font-bold text-neutral-900 mb-xl font-display tracking-tight"
                >
                    Meet <motion.span
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-gradient bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
                    >Lumo AI</motion.span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-neutral-600 text-f-xl max-w-3xl mx-auto mt-m"
                >
                    Your intelligent assistant to <span className="text-blue-600 font-medium">create</span>, <span className="text-blue-600 font-medium">explore</span>, and <span className="text-blue-600 font-medium">analyze</span> data using plain language. No SQL, no code — just ask and let AI do the work.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-4xl mx-auto mt-16"
            >
                <motion.div
                    whileHover={{ scale: 1.015 }}
                    className="flex items-center gap-3 bg-white p-m rounded-blg shadow-lg border border-gray-100 transition-shadow"
                >
                    <FaSearch className="text-indigo-400 text-f-xl ml-s" />
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none text-f-m text-neutral-800 placeholder:text-neutral-400"
                        placeholder="Try: 'Sum of amount split by currency and grouped by username'"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-xl py-s rounded-bs flex items-center gap-2 shadow-md"
                    >
                        <FaBolt /> Generate
                    </motion.button>
                </motion.div>
            </motion.div>

            <div className="mt-l text-neutral-600 text-f-m flex items-center gap-2 justify-center">
                <FaLightbulb className="text-indigo-400" /> Try these example queries:
            </div>

            <div className="mt-m flex flex-wrap justify-center gap-s">
                {suggestions.map((suggestion, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white border border-neutral-200 px-m py-s rounded-bs shadow-sm hover:shadow-md text-neutral-800 text-f-s transition-all"
                    >
                        {suggestion}
                    </motion.button>
                ))}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-gray-50 to-indigo-50 px-m py-s rounded-bs shadow-sm hover:shadow-md font-semibold text-indigo-700"
                >
                    Show Advanced Settings
                </motion.button>
            </div>

            <div className="grid grid-cols-1 sc-md:grid-cols-2 sc-xl:grid-cols-4 gap-4xl max-w-6xl mx-auto mt-20">
                {[FaMagic, FaComments, FaLightbulb, FaRobot].map((Icon, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index + 0.3, duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.04 }}
                        className="bg-white p-xl rounded-blg border border-gray-100 shadow-md flex flex-col items-center text-center hover:shadow-xl transition-transform"
                    >
                        <Icon className="text-indigo-500 text-f-4xl mb-m" />
                        <h3 className="text-f-xl font-semibold text-neutral-900 mb-s">
                            {[
                                "Instant Data Generation",
                                "Natural Language Queries",
                                "Smart Recommendations",
                                "AI-Powered Decisions"
                            ][index]}
                        </h3>
                        <p className="text-neutral-600 text-f-m">
                            {[
                                "Generate structured datasets with AI. Just describe what you want to analyze.",
                                "Type your questions naturally — \"What’s our top-selling product?\" — and get instant answers.",
                                "Discover trends, outliers, and improvement areas with automated insights.",
                                "Empower your team to make informed decisions backed by Lumo AI’s intelligence."
                            ][index]}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}