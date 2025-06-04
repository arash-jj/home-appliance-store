import React from 'react'
import Link from 'next/link'
import SideBarCart from './SideBarCart'

const NabBar = () => {
    return (
        <div className='navBarContainer'>
            <div>
                <Link href="/">
                    <img src="/navbar/Furniro.svg" alt="Furniro Logo" />
                </Link>
            </div>
            <div className="navBarLinksContainer">
                <Link href="/">
                    <p>Home</p>
                </Link>
                <Link href="/shop">
                    <p>Shop</p>
                </Link>
                <Link href="/about">
                    <p>About</p>
                </Link>
                <Link href="/contact">
                    <p>Contact</p>
                </Link>
            </div>
            <div className="featuresContainer">
                <Link href="/">
                    <img src="/navbar/Account.svg" alt="Account Logo" />
                </Link>
                <Link href="/">
                    <img src="/navbar/Search.svg" alt="Search Logo" />
                </Link>
                <Link href="/">
                    <img src="/navbar/Heart.svg" alt="Heart Logo" />
                </Link>
                <SideBarCart/>
            </div>
        </div>
    )
}

export default NabBar