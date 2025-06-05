"use client"

import { X, XCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Data from '@/data/db.json';
import { centsToDollar } from '@/lib/utils';

interface CartItem {
    productId: number;
    quantity: number;
    color: string;
    size: string;
}

const SideBarCart = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    useEffect(() => {
        const items = localStorage.getItem("cart")
        if (items) {
            setCartItems(JSON.parse(items))
        }
        const handleStorage = (event: StorageEvent) => {
            if (event.key === "cart") {
                setCartItems(event.newValue ? JSON.parse(event.newValue) : [])
            }
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])
    useEffect(() => {
        if (isSideBarOpen) {
            const items = localStorage.getItem("cart")
            if (items) {
                setCartItems(JSON.parse(items))
            }
        }
    }, [isSideBarOpen])
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = Data.find(p => p.id === item.productId)
            if (!product) return total
            const price = product.discountedPrice > 0 ? product.discountedPrice : product.price
            return total + (price * item.quantity)
        }, 0)
    }
    const getCartProducts = () => {
        return cartItems.map(item => {
            const product = Data.find(p => p.id === item.productId)
            return {
                ...item,
                product
            }
        })
    }
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
                            {getCartProducts().map(({product, quantity, color, size}) => (
                                product && (
                                    <div key={`${product.id}-${color}-${size}`} className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={product.productImage} 
                                                alt={product.productName} 
                                                className="w-26 h-26 rounded-2xl object-cover"
                                            />
                                            <div>
                                                <h3 className="font-medium">{product.productName}</h3>
                                                <p className="flex flex-row gap-4 items-center">
                                                    {quantity} <X size={16}/> <span className="text-primary">${(product.discountedPrice || product.price) / 100}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <XCircle
                                            className="text-footerSubTexts cursor-pointer"
                                            onClick={() => {
                                                const updatedCart = cartItems.filter(
                                                    item =>
                                                        !(
                                                            item.productId === product.id &&
                                                            item.color === color &&
                                                            item.size === size
                                                        )
                                                );
                                                setCartItems(updatedCart);
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                            }}
                                        />
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="flex flex-row justify-between items-center p-1.5">
                            <p className="">Subtotal</p>
                            <p className="text-primary font-semibold">
                                ${centsToDollar(calculateTotal())}
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