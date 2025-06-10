"use client"

import PageHeader from '@/components/PageHeader'
import { centsToDollar } from '@/lib/utils'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Data from '@/data/db.json';
import Link from 'next/link'

interface CartItem {
    productId: number,
    color: string,
    size: string,
    quantity: number,
    price: number,
    image: string,
    name: string
}

const page = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    useEffect(() => {
        const items = localStorage.getItem("cart")
        if (items) {
            setCartItems(JSON.parse(items))
        }
    },[])
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = Data.find(p => p.id === item.productId)
            if (!product) return total
            const price = product.discountedPrice > 0 ? product.discountedPrice : product.price
            return total + (price * item.quantity)
        }, 0)}
    return (
        <div>
            <PageHeader currentPage='Cart'/>
            <div className="w-full p-10">
                <div className="h-full flex flex-row gap-7">
                    <div className="w-[75%]">
                        <div className="w-full p-4 bg-shopBenefitsBackground flex flex-row justify-evenly items-center">
                            <p className="font-semibold text-xl">Product</p>
                            <p className="font-semibold text-xl">Price</p>
                            <p className="font-semibold text-xl">Quantity</p>
                            <p className="font-semibold text-xl">Subtotal</p>
                        </div>
                        <div className="h-[390px] pt-5 overflow-y-scroll relative" style={{scrollbarWidth : "none"}}>
                            {cartItems.length !== 0 
                            ?
                            cartItems.map(item => (
                                <div key={`${item.productId}-${item.color}-${item.size}`} className="w-full h-[105px] my-7 flex flex-row justify-between">
                                    <div className="w-[11%] h-full rounded-xl overflow-hidden bg-shopBenefitsBackground">
                                        <Image src={item.image} alt={item.name} width={108} height={107}/>
                                    </div>
                                    <div className="w-[85%] flex flex-row justify-between items-center">
                                        <p className="text-footerSubTexts line-clamp-1">{item.name}</p>
                                        <p className="text-footerSubTexts">{centsToDollar(item.price)}$</p>
                                        <p className="px-3 py-1 border rounded-lg border-footerSubTexts">{item.quantity}</p>
                                        <p className="">{centsToDollar(item.price * item.quantity)}$</p>
                                        <Trash 
                                        className='cursor-pointer fill-primary text-primary'
                                        onClick={() => {
                                                const updatedCart = cartItems.filter(
                                                    i =>
                                                        !(
                                                            i.productId === item.productId &&
                                                            i.color === item.color &&
                                                            i.size === item.size
                                                        )
                                                );
                                                setCartItems(updatedCart);
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                            }}/>
                                    </div>
                                </div>
                            ))
                            : 
                            <h1 className="text-4xl absolute left-1/2 top-1/2">No Products</h1>
                            }
                        </div>
                    </div>
                    <div className="w-[25%]">
                        <div className="w-full h-[390px] flex flex-col items-center bg-shopBenefitsBackground py-1">
                            <h1 className="font-semibold text-3xl">Cart Totals</h1>
                            <div className="w-full flex flex-row justify-evenly items-center p-1.5 my-29">
                                <p className="text-2xl">Total</p>
                                <p className="text-2xl text-primary font-semibold">
                                    ${centsToDollar(calculateTotal())}
                                </p>
                            </div>
                            <Link href='/checkout' className='text-xl px-10 py-2 border rounded-2xl'>Check out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page