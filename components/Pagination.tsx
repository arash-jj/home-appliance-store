import React from 'react'
import Link from "next/link";

interface Props {
    currentPage: number,
    totalPages : number,
}

const Pagination = ({totalPages, currentPage} : Props) => {
    const nextPage = currentPage + 1
    const prevPage = currentPage - 1
    return (
        <div className="flex justify-center mt-6 gap-2">
            {currentPage > 1 && (
                <Link
                    href={`/shop?page=${prevPage}`}
                    className="px-6 py-4 rounded font-light bg-shopBenefitsBackground text-black"
                >
                    PREV
                </Link>
            )}
            {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;
                return (
                <Link
                    key={page}
                    href={`/shop?page=${page}`}
                    className={`px-6 py-4 rounded ${isActive ? "bg-primary text-white" : "bg-shopBenefitsBackground text-black"}`}
                >
                    {page}
                </Link>
                );
            })}
            {currentPage < totalPages && (
                <Link
                    href={`/shop?page=${nextPage}`}
                    className="px-6 py-4 rounded font-light bg-shopBenefitsBackground text-black"
                >
                    NEXT
                </Link>
            )}
        </div>
    )
}

export default Pagination