"use client"
import React, {useState, useEffect} from 'react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/type'
import { GalleryVertical, Grid2X2 } from 'lucide-react'
import Filters from './Filters'


interface ShopContentProps {
    products: Product[],
    totalProducts: number
}
const ShopContent = ({ products,totalProducts }: ShopContentProps) => {
    const [filteredProducts,setFilteredProducts] = useState(products)
    const [filters, setFilters] = useState({
        category: '',
        color: '',
        minPrice: 0,
        maxPrice: Infinity,
    })
    useEffect(() => {
    const result = products.filter(product => { 
        const matchCategory = filters.category ? product.category === filters.category : true 
        const matchColor = filters.color ? product.colors.includes(filters.color) : true
        const matchPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice
        return matchCategory && matchColor && matchPrice 
    })
    setFilteredProducts(result)
    }, [filters, products])
    const handleFilterChange = (name: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    return (    
        <div>
            <div className="w-full h-[100px] p-2.5 bg-filterSectionBackground flex">
                <div className="filterSection w-1/6 h-full flex flex-row justify-between items-center">
                    <Filters onFilterChange={handleFilterChange} />
                    <Grid2X2 className='cursor-pointer'/>
                    <GalleryVertical className='cursor-pointer'/>
                </div>
                <div className="w-5/6 h-full flex flex-rox justify-between items-center pl-3">
                    <div className="w-auto h-9 border-l border-gray-400 flex justify-center items-center pl-3">
                        <p>{`Showing 1-${products.length} of ${totalProducts} results`}</p>
                    </div>
                    <div className="w-2/5 h-full flex flex-row items-center gap-4">
                        <div className="w-1/4 h-full flex flex-row items-center gap-5">
                            <span className=''>Show</span>
                            <span className='bg-white px-4 py-4 text-footerSubTexts'>{products.length}</span>
                        </div>
                        <div className="w-2/4 h-full flex flex-row items-center gap-5">
                            <span className=''>Sort by</span>
                            <span className='bg-white px-14 py-4 text-footerSubTexts'>Default</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-10">
                <div className='flex flex-row flex-wrap gap-8'>
                    {filteredProducts.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopContent