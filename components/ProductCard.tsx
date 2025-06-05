"use client"

import { centsToDollar } from '@/lib/utils';
import { Product } from '@/types/type';
import { ArrowRightLeft, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'



const ProductCard = ({product} : {product: Product}) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <Link
            href={`/single-product/${product.id}`} 
            className="card w-[285px] h-[446px] bg-cardBackground relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
            <div className={`popup w-full h-full absolute bg-cardsPopupBackground duration-300 flex flex-col justify-center items-center ${isHovered ? 'top-0' : 'top-[446px]'}`}>
            <div className="w-5/6">
                <Link
                className="w-[202px] h-[48px] m-auto mb-5 bg-white text-primary flex justify-center items-center"
                href={`/single-product/${product.id}`}
                >
                <span>Add to cart</span>
                </Link>
                <div className="flex justify-between text-white font-semibold">
                <div className="flex items-center gap-px cursor-pointer">
                    <Share2 />
                    <span>Share</span>
                </div>
                <Link className="flex items-center gap-px" href="/compare">
                    <ArrowRightLeft size={18} />
                    <span>Compare</span>
                </Link>
                <div className="flex items-center gap-px cursor-pointer">
                    <Heart />
                    <span>Like</span>
                </div>
                </div>
            </div>
            </div>
            <div className="w-[286px] h-[301px]">
            <img src={product.productImage} alt="Product Image" />
            {product.discountedPercentage > 0 && (
                <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full text-white bg-cardDiscountBackground absolute top-4 right-4">
                <span>{product.discountedPercentage}%</span>
                </div>
            )}
            </div>
            <div className="w-[249px] h-[99px] flex flex-col justify-between m-auto mt-2">
            <p className="font-semibold text-2xl text-cardMainText">{product.productName}</p>
            <p className="text-cardSubText">{product.subDescription}</p>
            {product.discountedPrice > 0 ? (
                <div className="flex justify-between">
                <p className="text-xl text-cardMainText font-semibold">
                    {centsToDollar(product.discountedPrice)}$
                </p>
                <p className="text-xl text-cardDiscountText line-through">
                    {centsToDollar(product.price)}$
                </p>
                </div>
            ) : (
                <p className="text-xl text-cardMainText font-semibold">
                {centsToDollar(product.price)}$
                </p>
            )}
            </div>
        </Link>
    )
}

export default ProductCard