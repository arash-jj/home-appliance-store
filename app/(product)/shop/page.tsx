import { getPaginatedProducts } from '@/lib/getLocalProducts'
import PageHeader from '@/components/PageHeader'
import React from 'react'
import ShopContent from '@/components/ShopContent';
import Pagination from '@/components/Pagination';

interface PageProps {
  searchParams: {
    page?: string;
  }
}

async function Page({ searchParams }: PageProps) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const perPage = 6;
  const { products, total } = await getPaginatedProducts(page, perPage);
  const totalPages = Math.ceil(total / perPage);
  return (
    <div className='mb-10'>
      <PageHeader currentPage="Shop"/>
      <ShopContent products={products} totalProducts={total}/>
      <Pagination currentPage={page} totalPages={totalPages}/>
    </div>
  )
}

export default Page