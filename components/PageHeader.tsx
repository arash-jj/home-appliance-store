import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PageHeader = ({currentPage} : {currentPage : string}) => {
    return (
        <div className="w-full h-[316px] headerBackground flex flex-col justify-center items-center gap-1.5">
            <h1 className='font-medium text-5xl'>{currentPage}</h1>
            <div className="flex">
                <Link className='flex' href="/">
                    Home <ChevronRight/>
                </Link>
                <span className="font-light">{currentPage}</span>
            </div>
        </div>
    )
}

export default PageHeader