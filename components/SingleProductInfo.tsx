import { centsToDollar } from '@/lib/utils'
import { Product } from '@/types/type'
import { Facebook, Star, Twitter, Linkedin } from 'lucide-react'
import React from 'react'
import AddingToCart from './AddingToCart'

interface SingleProduct {
    product: Product
}

const SingleProductInfo = ({product} : SingleProduct) => {
    return (
        <div className="w-55/100">
            <h1 className='text-[42px] mb-4'>{product.productName}</h1>
            <p className="text-footerSubTexts text-2xl mb-4">{centsToDollar(product.price)}$</p>
            <div className="flex items-center gap-4 mb-6 relative">
                <div className="flex gap-1">
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
                <span className="text-sm text-gray-500 before:content-['|'] before:absolute before:left-[120px]">
                    {`${product.customerReview} Customer Review`}
                </span>
            </div>
            <p className="w-[420px]">{product.additionalInformation}</p>
            <div className="my-3">
                <span className="text-footerSubTexts mb-1">Size</span>
                <div className="flex flex-row gap-2.5">
                    <div className="px-2.5 py-2 bg-filterSectionBackground rounded-md">l</div>
                    <div className="px-2.5 py-2 bg-filterSectionBackground rounded-md">Xl</div>
                    <div className="px-2.5 py-2 bg-filterSectionBackground rounded-md">XS</div>
                </div>
            </div>
            <div className="my-3">
                <span className="text-footerSubTexts mb-1">Color</span>
                <div className="flex flex-row gap-5">
                    {product.colors.map((color, idx) => (
                        <div
                            key={idx}
                            className="w-[30px] h-[30px] rounded-full mt-1"
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>
            </div>
            <AddingToCart/>
            <div className="flex flex-col gap-4 pt-10">
                <div className="flex flex-row gap-2.5 text-footerSubTexts relative">
                    <p className="min-w-[70px] after:content-[':'] after:absolute after:left-18">SKU</p>
                    <p className="">SS001</p>
                </div>
                <div className="flex flex-row gap-2.5 text-footerSubTexts relative">
                    <p className="min-w-[70px] after:content-[':'] after:absolute after:left-18">Category</p>
                    <p className="">{product.category}</p>
                </div>
                <div className="flex flex-row gap-2.5 text-footerSubTexts relative">
                    <p className="min-w-[70px] after:content-[':'] after:absolute after:left-18">Tags</p>
                    {product.tags.map((tag, idx) => (
                        <span key={idx}>{tag},</span>
                    ))}
                </div>
                <div className="flex flex-row gap-2.5 text-footerSubTexts relative">
                    <p className="min-w-[70px] after:content-[':'] after:absolute after:left-18">Share</p>
                    <div className="flex flex-row gap-2 text-black">
                        <Facebook/>
                        <Twitter/>
                        <Linkedin/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProductInfo