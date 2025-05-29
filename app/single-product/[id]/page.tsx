import React from 'react'
import { notFound } from "next/navigation";
import Data from '@/data/db.json';

interface PageProps {
    params: {
        id: string
    }
}

const Page = ({ params }: PageProps) => {
    const product = Data.find(item => item.id === parseInt(params.id));
    if (!product) {
        notFound();
    }
    return (
        <div></div>
    )
}

export default Page