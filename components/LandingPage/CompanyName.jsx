'use client'
import React, { useEffect, useRef, useState } from 'react'

import { GoDotFill } from "react-icons/go";

const CompanyName = () => {
    const containerRef = useRef(null); // Reference for the div
    const initialTranslateLTR = -96 * 4;


    const scrollerHandler = () => {
        const translateX = (window.innerHeight - containerRef.current.getBoundingClientRect().top) * .2;
        let totalTanslate = 0;
        totalTanslate = translateX + initialTranslateLTR

        containerRef.current.style.transform = `translateX(${totalTanslate}px)`
    }

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const isIntersecting = entries[0].isIntersecting
                console.log(isIntersecting)
                console.log("blae", containerRef.current, isIntersecting)
                if (isIntersecting) {
                    document.addEventListener('scroll', scrollerHandler);
                }
                else {
                    document.removeEventListener('scroll', scrollerHandler);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            intersectionObserver.observe(containerRef.current);
            console.log("containerRef.current)", containerRef.current.getBoundingClientRect())
        }

        return () => {
            if (containerRef.current) {
                intersectionObserver.unobserve(containerRef.current);

            }
        };
    }, []);

    return (
        <div className='text-black max-w-7xl mx-auto px-10 my-12'>
            <div className={`flex gap-4 rounded-lg bg-neutal-50  border w-full px-6 py-12 overflow-hidden `}>
                <div ref={containerRef} className='flex gap-4 text-black -translate-x-96  items-center transition-transform ease-linear '>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">React.js</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Node.js</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Angular</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Vue.js</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Next.js</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Tailwind CSS</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Django</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Flask</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Ruby on Rails</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Spring Boot</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Laravel</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Express.js</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Kubernetes</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Docker</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">GraphQL</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">TypeScript</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Kubernetes</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Django</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Flask</div>
                    <span><GoDotFill /></span>
                    <div className="whitespace-nowrap font-bold text-2xl mx-12">Ruby on Rails</div>


                </div>


            </div>

        </div>

    );
};

export default CompanyName;
