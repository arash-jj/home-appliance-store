import Link from 'next/link'
import React from 'react'
import NewsletterInput from './NewsletterInput'

const Footer = () => {
    return (
        <footer className='px-15 border-t-1 border-footerSubTexts'>
            <section className="flex flex-row gap-25 py-7">
                <div className="">
                    <p className="font-bold text-2xl mb-9">Furniro.</p>
                    <p className="text-footerSubTexts">400 University Drive Suite 200 Coral Gables,</p>
                    <span className="text-footerSubTexts">FL 33134 USA</span>
                </div>
                <div className="flex flex-row gap-2.5">
                    <div className='flex flex-col gap-7'>
                        <span className="text-footerSubTexts mb-3">Link</span>
                        <Link href="/" className="">Home</Link>
                        <Link href="/shop" className="">Shop</Link>
                        <Link href="/about" className="">About</Link>
                        <Link href="/contact" className="">Contact</Link>
                    </div>
                </div>
                <div className="flex flex-row gap-2.5">
                    <div className='flex flex-col gap-7'>
                        <span className="text-footerSubTexts mb-3">Help</span>
                        <Link href="/" className="">Payment Options</Link>
                        <Link href="/" className="">Returns</Link>
                        <Link href="/" className="">Privacy Policies</Link>
                    </div>
                </div>
                <div className="flex flex-row gap-2.5">
                    <div className='flex flex-col gap-5'>
                        <span className="text-footerSubTexts mb-3">Newsletter</span>
                        <NewsletterInput/>
                    </div>
                </div>
            </section>
            <section className="border-t-1 border-footerSubTexts p-10">
                <p className="">2023 furino. All rights reverved</p>
            </section>
        </footer>
    )
}

export default Footer