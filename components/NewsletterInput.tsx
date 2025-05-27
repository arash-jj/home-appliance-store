'use client'
import React from 'react'

const NewsletterInput = () => {
    return (
        <form className='flex flex-row gap-2' action="#">
            <input className='outline-0 focus:shadow-lg border-b-[1px] p-1' type="email" name="email" id="email" placeholder='Enter Your Email Address'/>
            <button type='button' className='cursor-pointer text-sm border-b-[1px] p-1 hover:pb-2 transition-all duration-150'>SUBSCRIBE</button>
        </form>
        
    )
}

export default NewsletterInput