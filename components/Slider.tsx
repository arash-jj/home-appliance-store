'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import image1 from '../public/slider/image1.png'
import image2 from '../public/slider/image2.png'
import image3 from '../public/slider/image3.png'
import { ArrowRight, ChevronLeft, ChevronRight, Minus } from 'lucide-react'


const Slider = () => {
    const [sliderIndex, setSliderIndex] = useState(0)
    const images = [
        { image: image1, text: "Inner Peace" },
        { image: image2, text: "Inner Peace" },
        { image: image3, text: "Inner Peace" }
    ]
    function setCardsStyle(index: number) {
        let cardsBasicStyle = "absolute transition-all duration-300";
        if (index === sliderIndex) {
            cardsBasicStyle += " left-1/4 -translate-x-1/2 w-[404px] h-[582px] scale-100 opacity-100";
        } else if (index === sliderIndex + 1) {
            cardsBasicStyle += " left-150 -translate-x-1/2 w-[372px] h-[486px] scale-90";
        } else if (index === sliderIndex + 2) {
            cardsBasicStyle += " left-238 -translate-x-1/2 w-[372px] h-[486px] scale-90";
        } else {
            cardsBasicStyle += " opacity-0 pointer-events-none";
        }
        return cardsBasicStyle;
    }
    return (
        <div className='flex flex-row h-full'>
            <div className="w-2/5 flex flex-col justify-center items-center">
                <div className="w-[400px]">
                    <p className="font-bold text-[40px] leading-10">50+ Beautiful rooms inspiration</p>
                    <p className="text-[#616161] mt-2">Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
                    <button className='px-[60px] py-[15px] bg-primary font-bold text-white mt-3 cursor-pointer'>Explore More</button>
                </div>
            </div>
            <div className="w-3/5 h-full flex items-center justify-center gap-2 relative overflow-hidden">
                {
                    images.map((img, index) => (
                        <div key={index} className={setCardsStyle(index)}>
                            <Image src={images[index].image} alt="bedroom" className="h-full w-full object-cover" />
                            {index === sliderIndex && (
                                <div>
                                    <div className="w-[200px] h-[120px] bg-[#fafafaab] absolute bottom-5 left-2 p-5 flex flex-col justify-center items-center">
                                        <p className="text-[#616161] flex justify-center items-center">
                                            0{index + 1}
                                            <Minus />
                                            Bed Room
                                        </p>
                                        <p className="font-semibold text-[28px] text-[#3A3A3A]">
                                            {img.text}
                                        </p>
                                    </div>
                                    <div
                                        className="w-[48px] h-[48px] bg-primary absolute bottom-5 right-37 flex justify-center items-center cursor-pointer"
                                    >
                                        <ArrowRight color="white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }
                {sliderIndex > 0 && (
                    <button 
                        className="w-[48px] h-[48px] rounded-full bg-white absolute left-5 top-1/2 flex justify-center items-center z-20"
                        onClick={() => setSliderIndex(sliderIndex - 1)}>
                        <ChevronLeft color='#B88E2F'/>
                    </button>
                )}
                {sliderIndex < images.length - 1 && (
                    <button 
                        className="w-[48px] h-[48px] rounded-full bg-white absolute right-5 top-1/2 flex justify-center items-center z-20"
                        onClick={() => setSliderIndex(sliderIndex + 1)}>
                        <ChevronRight color='#B88E2F'/>
                    </button>
                )}
                <div className="w-[120px] flex flex-row justify-evenly items-center absolute bottom-15 left-110">
                    {
                        images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => { setSliderIndex(index) }}
                                className={`w-[27px] h-[27px] rounded-full flex justify-center items-center cursor-pointer border-primary ${sliderIndex === index ? "border-2" : "border-0"}`}>
                                <div className={`w-[11px] h-[11px] rounded-full ${sliderIndex === index ? "bg-primary" : "bg-[#D8D8D8]"}`} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Slider