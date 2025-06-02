import { Product } from "@/types/type";
import Data from '@/data/db.json';

export function getRelatedProducts(currentProduct: Product, limit : number) {
    return Data.filter(item => 
        item.category === currentProduct.category && 
        item.id !== currentProduct.id
    ).slice(0, limit)
}