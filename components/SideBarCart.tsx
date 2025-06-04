"use client"

import { X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const SideBarCart = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    return (
        <div className="relative">
            <button 
            className="cursor-pointer"
            onClick={()=>setIsSideBarOpen(true)}>
                <img src="/navbar/Shopping-cart.svg" alt="Shopping-cart Logo" />
            </button>
                {isSideBarOpen && (
                    <div className={`w-[400px] min-h-[750px] bg-white absolute right-[-17px] top-0 z-10 shadow-2xl rounded-2xl`}>
                    <div className="p-5">
                        <div className="flex flex-row justify-between items-center border-b pb-5 border-footerSubTexts">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <X
                            className='text-footerSubTexts cursor-pointer'
                            onClick={()=>setIsSideBarOpen(false)}
                            />
                        </div>
                        <div className="w-full min-h-130 px-2 mt-2 overflow-y-scroll" style={{scrollbarWidth : "none"}}>
                            {/* ToDo : added to cart products components */}
                        </div>
                        <div className="flex flex-row justify-between items-center p-1.5">
                            <p className="">Subtotal</p>
                            <p className="text-primary font-semibold">
                                {/* ToDo : total money */}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly items-center">
                        <Link className='px-7 py-2 border rounded-4xl' href="/cart">Cart</Link>
                        <Link className='px-7 py-2 border rounded-4xl' href="/checkout">Checkout</Link>
                        <Link className='px-7 py-2 border rounded-4xl' href="/product-comparison">Comparison</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SideBarCart