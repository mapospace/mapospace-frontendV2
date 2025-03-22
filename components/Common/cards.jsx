'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Cards = ({ menuItems, title }) => {
    const router = useRouter();

    const handleCardClick = (path) => {
        if (path) router.push(path);
    };

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    return (
        <div className="flex flex-col flex-grow gap-6">
            <div className="flex flex-col sc-sm:flex-row justify-between sc-sm:items-center">
                <h1 className="text-f-5xl font-light text-neutral-1100">{title}</h1>
            </div>

            <motion.div
                className="grid grid-cols-2 sc-xs:grid-cols-3 sc-md:grid-cols-4 w-full gap-6"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {menuItems?.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={cardAnimation}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => handleCardClick(item.url)}
                        className="cursor-pointer rounded-blg bg-brand1-10 hover:bg-secondary-100 transition-all duration-300 shadow-sm group"
                    >
                        <div className="flex flex-col justify-center items-center p-xl rounded-md bg-white border border-neutral-200 group-hover:shadow-md">
                            <div className="flex justify-center items-center w-14 h-14 bg-primary-50 group-hover:bg-primary-100 rounded-full mb-m">
                                <span className="text-primary-600 text-2xl">{item.icon}</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <p className="text-f-l font-semibold text-neutral-1100">
                                    {item.title}
                                </p>
                                <p className="text-f-s text-neutral-700 leading-tight">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Cards;
