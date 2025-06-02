import React from 'react'
import { notFound } from "next/navigation";
import Data from '@/data/db.json';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import SingleProductInfo from '@/components/SingleProductInfo';
import MoreProductInfo from '@/components/MoreProductInfo';
import { getRelatedProducts } from '@/lib/getRelatedProducts';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/type';

interface PageProps {
    params: {
        id: string
    }
}

const Page = ({ params }: PageProps) => {
    const product = Data.find(item => String(item.id) === String(params?.id));
    if (!product) {
        notFound();
    }
    const relatedProducts = getRelatedProducts(product, 4);
    return (
        <div>
            <section className="w-full h-[100px] px-10 py-2 bg-filterSectionBackground flex flex-row gap-1.5">
                <Link className='flex justify-center items-center gap-2' href="/home">
                    <span className="text-footerSubTexts">Home</span>
                    <ChevronRight/>
                </Link>
                <Link className='flex justify-center items-center gap-2' href="/shop">
                    <span className="text-footerSubTexts">Shop</span>
                    <ChevronRight/>
                </Link>
                <p className='flex justify-center items-center text-lg ml-2'>{product.productName}</p>
            </section>
            <section className="px-10 py-5">
                <section className="flex flex-row h-[780px]">
                    <div className="w-45/100 flex flex-row">
                        <div className="w-7/30 flex flex-col gap-7">
                            {product.previewImages && (
                                product.previewImages.map((img, idx) => (
                                    <Image 
                                        key={idx} 
                                        src={img} 
                                        alt={product.productName} 
                                        width={83} 
                                        height={55} 
                                        className='bg-filterSectionBackground rounded-lg'/>
                                ))
                            )}
                        </div>
                        <div className={product.previewImages ? "w-2/3" : "w-full"}>
                            <Image src={product.productImage} alt={product.productName} width={423} height={500} className='bg-filterSectionBackground'/>
                        </div>
                    </div>
                    <SingleProductInfo product={product}/>
                </section>
                <MoreProductInfo 
                description={product.description} 
                additionalInfo={product.additionalInformation}
                review={product.customerReview}/>
                <div className="my-3.5">
                    <h1 className="text-4xl text-center">Related Products</h1>
                    <div className='flex flex-row flex-wrap justify-center gap-8 my-5 m-auto'>
                        {relatedProducts.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="/shop" className='w-[245px] h-[48px] border-2 border-primary text-primary font-semibold flex justify-center items-center mt-3.5'>
                            <span>Show More</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page