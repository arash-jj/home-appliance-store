'use client'

import React from 'react'
import Data from '../data/db.json'
import { centsToDollar } from '@/lib/utils';

const TopProducts = () => {
    const cardsHoverHandler = ()=>{
        const cards = document.querySelectorAll(".card")
        const popups = document.querySelectorAll(".popup")
        cards.forEach((card, index) => {
            card.addEventListener("mouseenter", () => {
            // Show only the hovered card's popup
            if (popups[index]) {
                popups[index].classList.add("!top-[0]")
            }
            });
            card.addEventListener("mouseleave", () => {
            if (popups[index]) {
                popups[index].classList.remove("!top-[0]")
            }
            });
        });
        
    }
    return (
        <div className='w-full h-[924px] flex flex-row flex-wrap gap-8'>
            {
                Data.slice(0,8).map((item) => (
                    <div onMouseEnter={cardsHoverHandler} key={item.id} className="card w-[285px] h-[446px] bg-cardBackground relative overflow-hidden">
                        <div className="popup w-full h-full absolute bg-cardsPopupBackground top-[446px] duration-300">
                            
                        </div>
                        <div className="w-[286px] h-[301px]">
                            <img src={item.productImage} alt="Product Image" />
                            {item.discountedPercentage > 0 && 
                            <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full text-white bg-cardDiscountBackground absolute top-4 right-4">
                                <span>{item.discountedPercentage}%</span>
                            </div>
                            }
                        </div>
                        <div className="w-[249px] h-[99px] flex flex-col justify-between m-auto mt-2">
                            <p className="font-semibold text-2xl text-cardMainText">{item.productName}</p>
                            <p className="text-cardSubText">{item.subDescription}</p>
                            {item.discountedPrice > 0 
                            ?  <div className='flex justify-between'>
                                    <p className='text-xl text-cardMainText font-semibold'>{centsToDollar(item.discountedPrice)}$</p>
                                    <p className='text-xl text-cardDiscountText line-through'>{centsToDollar(item.price)}$</p>
                                </div>
                            :  <p className='text-xl text-cardMainText font-semibold'>{centsToDollar(item.price)}$</p>
                            }
                        </div>
                    </div> 
                ))
            }
        </div>
    )
}

export default TopProducts