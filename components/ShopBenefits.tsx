import React from 'react'
import Image from 'next/image'
import image1 from "../public/shop-benefits/quality.svg";
import image2 from "../public/shop-benefits/protection.svg";
import image3 from "../public/shop-benefits/shipping.svg";
import image4 from "../public/shop-benefits/support.svg";

const ShopBenefits = () => {
    const images = [
        {imageURL: image1, alt: "High Quality"},
        {imageURL: image2, alt: "Warranty Protection"},
        {imageURL: image3, alt: "Free Shipping"},
        {imageURL: image4, alt: "24 / 7 Support"}
    ]
    return (
        <div className='w-full h-[270px] bg-shopBenefitsBackground flex flex-row justify-between items-center px-4'>
            {images.map((img,idx)=>(
                <Image 
                    key={idx}
                    src={img.imageURL}
                    alt={img.alt}
                />
            ))}
        </div>
    )
}

export default ShopBenefits