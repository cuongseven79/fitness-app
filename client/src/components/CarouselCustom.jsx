import React, { useState } from "react";
import img1 from "../images/program/yoga.png";
import img2 from "../images/trainer2.jpg";
import img3 from "../images/trainer3.jpg";
import img4 from "../images/trainer4.jpg";
import img5 from "../images/trainer5.jpg";
import img6 from "../images/trainer6.jpg";

export const programs_img = [img1, img2, img3, img4, img5, img6];   

const CarouselCustom = () => {
    const [index, setIndex] = useState(0);

    const handlePrevious = () => {
        setIndex((prevValue) => {
            if (prevValue <= 0) {
                return programs_img.length - 1;
            } else {
                return prevValue - 1;
            }
        });
    };

    const handleNext = () => {
        setIndex((prevValue) => {
            if (prevValue >= programs_img.length - 1) {
                return 0;
            } else {
                return prevValue + 1;
            }
        });
    };

    return (
        <div className="relative ">
            <div className="relative rounded-lg">
                <div className={"duration-700 ease-in-out"}>
                    <img src={programs_img[index]} className="rounded-3xl" alt="..." />
                </div>
            </div>

            {/* Slider controls */}
            <button onClick={handlePrevious} type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button onClick={handleNext} type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default CarouselCustom;