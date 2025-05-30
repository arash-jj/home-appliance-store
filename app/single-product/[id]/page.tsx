import React from 'react'
import { notFound } from "next/navigation";
import Data from '@/data/db.json';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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
        </div>
    )
}

export default Page