'use client'
import React, { useEffect, useRef, useState } from 'react'

const companies = [
    { name: "LifeAt", imagePath: "/assets/asset_3.png" },
    { name: "Convy", imagePath: "/assets/asset_4.png" },
    { name: "Morgen", imagePath: "/assets/asset_5.png" },
    { name: "Campsite", imagePath: "/assets/asset_6.png" },
    { name: "Rise", imagePath: "/assets/asset_7.png" },
    { name: "ClickUp", imagePath: "/assets/asset_8.png" },
    { name: "Notion", imagePath: "/assets/asset_9.png" },
    { name: "Sunsama", imagePath: "/assets/asset_10.png" },
    { name: "Beeper", imagePath: "/assets/asset_11.png" },
    { name: "Cal", imagePath: "/assets/asset_12.png" },
    { name: "Unbounce1", imagePath: "/assets/asset_13.png" },
    { name: "Moises", imagePath: "/assets/asset_14.png" },
    { name: "Basedash", imagePath: "/assets/asset_15.png" },
    { name: "Cursor", imagePath: "/assets/asset_16.png" },
    { name: "Linear", imagePath: "/assets/asset_17.png" },
    { name: "Voiceflow", imagePath: "/assets/asset_18.png" },
    { name: "Kitemaker", imagePath: "/assets/asset_19.png" },
    { name: "Kite", imagePath: "/assets/asset_21.png" },
    { name: "Unicorn", imagePath: "/assets/asset_22.png" },
    { name: "Mapo", imagePath: "/assets/asset_23.png" },
    { name: "Space", imagePath: "/assets/asset_24.png" },
    { name: "Matrix", imagePath: "/assets/asset_25.png" },
];

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const PoweredCard = (props) => {
    const [shuffledCompanies, setShuffledCompanies] = useState([]);
    const containerRef = useRef(null); // Reference for the div
    const initialTranslateLTR = -48 * 4;
    const initialTranslateRTL = 36 * 4;
    useEffect(() => {
        setShuffledCompanies(shuffleArray(companies));
    }, []);

    const scrollerHandler = () => {
        const translateX = (window.innerHeight - containerRef.current.getBoundingClientRect().top) * props.speed;
        let totalTanslate = 0;
        if (props.ltr) {
            totalTanslate = translateX + initialTranslateLTR
        }
        else {
            totalTanslate = -(translateX + initialTranslateRTL)
        }
        containerRef.current.style.transform = `translateX(${totalTanslate}px)`
    }

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const isIntersecting = entries[0].isIntersecting
                // console.log(containerRef.current, isIntersecting)
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
        <div ref={containerRef} className={`flex gap-4 ${props.position} overflow-x-scroll hide-scrollbar transition-transform ease-linear`}>
            {shuffledCompanies.map((detail, index) => (
                <div
                    key={index}
                    className='bg-white flex flex-col items-center min-w-[120px] min-h-[120px] justify-center  rounded-xl border gap-2 md:min-w-[150px] md:min-h-[150px]'
                >
                    <img
                        src={detail.imagePath}
                        alt={detail.name}
                        className='w-14 h-14 md:w-20 md:h-20'
                    />
                    <div>{detail.name}</div>
                </div>
            ))}
        </div>
    );
};

export default PoweredCard;
