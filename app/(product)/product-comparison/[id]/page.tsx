import React from 'react'
import { notFound } from "next/navigation";
import Data from '@/data/db.json';

interface PageProps {
    params: {
        id: number
    }
}

const page = ({ params } : PageProps) => {
    const product = Data.find(item => String(item.id) === String(params?.id));
    if(!product) notFound()
    return (
        <div></div>
    )
}

export default page