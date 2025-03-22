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
            className="relative bg-transparent w-full py-16 px-8 sm:px-16 text-black "
        >
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-f-6xl font-bold text-primary-1600 mb-xl font-display tracking-wide"
                >
                    Meet <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-secondary-900"
                    >Lumo AI</motion.span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-neutral-1200 text-f-xl max-w-3xl mx-auto mt-m"
                >
                    Your intelligent assistant to create, explore, and analyze data using plain language. No SQL, no code — just ask and let AI do the work.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-4xl mx-auto mt-12"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 bg-white p-m rounded-blg shadow-md"
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
                    >
                        <FaBolt /> Generate Report
                    </motion.button>
                </motion.div>
            </motion.div>

            <div className="mt-l text-neutral-1200 text-f-m flex items-center gap-2">
                <FaLightbulb className="text-secondary-700" /> Try these example queries:
            </div>

            <div className="mt-m flex flex-wrap gap-s">
                {suggestions.map((suggestion, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white border border-neutral-300 px-m py-s rounded-bs shadow-sm hover:shadow-md"
                    >
                        {suggestion}
                    </motion.button>
                ))}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border border-neutral-300 px-m py-s rounded-bs shadow-sm hover:shadow-md font-semibold"
                >
                    Show Advanced Settings
                </motion.button>
            </div>


            <div className="grid grid-cols-1 sc-md:grid-cols-2 sc-xl:grid-cols-4 gap-4xl max-w-6xl mx-auto mt-12">
                {[FaMagic, FaComments, FaLightbulb, FaRobot].map((Icon, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index + 0.3, duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-xl rounded-blg shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-transform"
                    >
                        <Icon className="text-secondary-900 text-f-4xl mb-m" />
                        <h3 className="text-f-xl font-semibold text-neutral-1300 mb-s">
                            {[
                                "Instant Data Generation",
                                "Natural Language Queries",
                                "Smart Recommendations",
                                "AI-Powered Decisions"
                            ][index]}
                        </h3>
                        <p className="text-neutral-1000 text-f-m">
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
