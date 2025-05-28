"use client"
import React from 'react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/type'


interface ShopContentProps {
    products: Product[]
}
const ShopContent = ({ products }: ShopContentProps) => {
    return (
        <div className="p-10">
            <div className='flex flex-row flex-wrap gap-8'>
                {products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ShopContent