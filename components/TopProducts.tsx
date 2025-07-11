'use client'

import React from 'react'
import Data from '../data/db.json'
import { centsToDollar } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRightLeft, Heart, Share2 } from 'lucide-react';

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
                    <Link href={`/single-product/${item.id}`} onMouseEnter={cardsHoverHandler} key={item.id} className="card w-[285px] h-[446px] bg-cardBackground relative overflow-hidden">
                        <div className="popup w-full h-full absolute bg-cardsPopupBackground top-[446px] duration-300 flex flex-col justify-center items-center">
                            <div className="w-5/6">
                                <Link className='w-[202px] h-[48px] m-auto mb-5 bg-white text-primary flex justify-center items-center' href={`/single-product/${item.id}`} >
                                    <span>Add to cart</span>
                                </Link>
                                <div className="flex justify-between text-white font-semibold">
                                    <div className="flex items-center gap-px cursor-pointer">
                                        <Share2/>
                                        <span>Share</span>
                                    </div>
                                    <Link className='flex items-center gap-px' href={`/product-comparison/${item.id}`}>
                                        <ArrowRightLeft size={18}/>
                                        <span>Compare</span>
                                    </Link>
                                    <div className="flex items-center gap-px cursor-pointer">
                                        <Heart/>
                                        <span>Like</span>
                                    </div>
                                </div>
                            </div>
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
                    </Link> 
                ))
            }
        </div>
    )
}

export default TopProducts