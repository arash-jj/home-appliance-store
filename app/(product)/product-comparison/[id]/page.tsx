"use client"

import React,{ useState} from 'react'
import { notFound } from "next/navigation";
import Data from '@/data/db.json';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import Image from 'next/image';
import { centsToDollar } from '@/lib/utils';
import { ChevronDown, Star } from 'lucide-react';

interface PageProps {
    params?: {
        id?: number
    }
}

const page = ({ params } : PageProps) => {
    const [chosenProductId, setChosenProductId] = useState(1)
    const [isOpen , setIsOpen] = useState(false)
    const chosenProduct = Data.find(item => item.id == chosenProductId)
    const product = Data.find(item => String(item.id) === String(params?.id));
    if(!product) notFound()
    if (!chosenProduct) return <div>Loading...</div>
    return (
        <div>
            <PageHeader currentPage='Product Comparison'/>
            <div className="flex flex-row justify-evenly items-center gap-6 py-5">
                <div className="w-[280px] h-[177px]">
                    <h2 className="text-3xl tracking-wider">Go to Product page for more Products</h2>
                    <Link href="/shop" className='text-footerSubTexts pr-1 py-0.5 text-[20px] border-b border-footerSubTexts'>View More</Link>
                </div>
                <div className="w-[280px] flex flex-col gap-2.5">
                    <div className="w-full h-[300px] overflow-hidden rounded-2xl bg-filterSectionBackground">
                        <Image src={product.productImage} alt={product.productName} width={280} height={177}/>
                    </div>
                    <h1 className="text-2xl line-clamp-1">{product.productName}</h1>
                    <p className="text-lg tracking-wide">{centsToDollar(product.price)} $</p>
                    <div className="flex items-center gap-4 mb-6 relative">
                        <div className="flex gap-1">
                            <span>{product.rate}</span>
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={20}
                                    className={`${
                                        index < (product.rate || 0)
                                            ? 'fill-yellow-400 text-yellow-400' 
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500 before:content-['|'] before:absolute before:left-[135px]">
                            {`${product.customerReview} Review`}
                        </span>
                    </div>
                    <Link className='m-auto bg-primary text-white text-xl px-7 py-2.5' href={`/single-product/${product.id}`}>Add to Cart</Link>
                </div>
                <div className="w-[280px] flex flex-col gap-2.5">
                    <div className="w-full h-[300px] overflow-hidden rounded-2xl bg-filterSectionBackground">
                        <Image src={chosenProduct.productImage} alt={chosenProduct.productName} width={280} height={177}/>
                    </div>
                    <h1 className="text-2xl line-clamp-1">{chosenProduct.productName}</h1>
                    <p className="text-lg tracking-wide">{centsToDollar(chosenProduct.price)} $</p>
                    <div className="flex items-center gap-4 mb-6 relative">
                        <div className="flex gap-1">
                            <span>{chosenProduct.rate}</span>
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={20}
                                    className={`${
                                        index < (chosenProduct.rate || 0)
                                            ? 'fill-yellow-400 text-yellow-400' 
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500 before:content-['|'] before:absolute before:left-[135px]">
                            {`${chosenProduct.customerReview} Review`}
                        </span>
                    </div>
                    <Link className='m-auto bg-primary text-white text-xl px-7 py-2.5' href={`/single-product/${chosenProductId}`}>Add to Cart</Link>
                </div>
                <div className="w-[280px] h-[177px] relative ">
                    <p className="text-2xl font-semibold mt-2">Add a Product</p>
                    <div className="relative inline-block w-auto text-left">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-60 py-2 px-1 bg-primary text-white text-[20px] rounded-lg cursor-pointer flex flex-row justify-between items-center"
                            >
                            Choose a Product
                            <ChevronDown size={20}/>
                        </button>
                    </div>
                    {isOpen && (
                    <div className="absolute m-auto w-60 max-h-60 rounded-md shadow-lg bg-white border border-gray-200 z-10 overflow-y-scroll">
                        <ul className="py-1 text-sm text-gray-700">
                            {Data.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => {setChosenProductId(option.id); setIsOpen(false)}}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 line-clamp-1"
                            >
                                {option.productName}
                            </li>
                            ))}
                        </ul>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page