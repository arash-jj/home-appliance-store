"use client"

import { Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import React, {useState} from 'react'

interface PageProps {
    productId: number,
    productColor: string,
    productSize: string,
    productPrice: number,
    productImg: string,
    productName: string,
}
interface CartItem {
    productId: number,
    color: string,
    size: string,
    quantity: number,
    price: number,
    image: string,
    name: string,
}

const AddingToCart = ({productId, productColor, productSize, productPrice, productImg, productName} : PageProps) => {
    const [numberOfProducts, setNumberOfProducts] = useState(1)
    const addToCartHandler = ()=>{
        const savedCart = localStorage.getItem("cart")
        let cartItems : CartItem[] = savedCart ? JSON.parse(savedCart) : [];
        const existingItemIndex = cartItems.findIndex(item => 
            item.productId === productId && 
            item.color === productColor && 
            item.size === productSize
        )
        if ( existingItemIndex >= 0){
            cartItems[existingItemIndex].quantity = numberOfProducts;
        }else{
            const newItem = {
                productId,
                color: productColor,
                size: productSize,
                quantity: numberOfProducts,
                price: productPrice,
                image: productImg,
                name: productName
            }
            cartItems.push(newItem)
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    return (
        <div className='flex flex-row gap-2.5 border-b-2 border-footerSubTexts pb-15'>
            <div className="flex flex-row items-center px-2 py-2 border rounded-xl border-footerSubTexts">
                <Minus size={16} onClick={() => setNumberOfProducts(prev => Math.max(1, prev - 1))} className='cursor-pointer'/>
                <input
                    className="w-10 text-center focus:outline-none"
                    type="text"
                    value={numberOfProducts}
                    readOnly
                />
                <Plus size={16} onClick={() => setNumberOfProducts(prev => prev + 1)} className='cursor-pointer'/>
            </div>
            <div onClick={addToCartHandler} className="px-6 py-2 border rounded-xl border-footerSubTexts cursor-pointer flex justify-center items-center">
                <p>Add To Cart</p>
            </div>
            <Link 
            href={`/product-comparison/${productId}`} 
            className='px-6 py-2 border-[1px] rounded-xl border-footerSubTexts cursor-pointer flex justify-center items-center'>
                <Plus size={18}/>
                <p>Compare</p>
            </Link>
        </div>
    )
}

export default AddingToCart