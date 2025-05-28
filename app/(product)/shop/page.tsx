import { getPaginatedProducts } from '@/lib/getLocalProducts'
import PageHeader from '@/components/PageHeader'
import React from 'react'
import ShopContent from '@/components/ShopContent';
import Pagination from '@/components/Pagination';

const page = async ({searchParams} : {searchParams:{page? : string}}) => {
  const currentPage = Number(searchParams.page) || 1;
  const perPage = 6;
  const {products, total} = await getPaginatedProducts(currentPage , perPage)
  const totalPages = Math.ceil(total / perPage)
  return (
    <div className='mb-10'>
      {/* TODO : filtering products section */}
      <PageHeader currentPage="Shop"/>
      <ShopContent products={products}/>
      <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </div>
  )
}

export default page