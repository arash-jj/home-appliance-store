"use client"

import PageHeader from '@/components/PageHeader'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Clock, MapPin, Phone } from 'lucide-react'

interface FormikTypes {
    name: string,
    email: string,
    subject: string, 
    message: string
}

const page = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        },
        validationSchema: Yup.object({
            name: Yup.string().max(15,"The Name Is too long").required("Please Enter Your Name"),
            email: Yup.string().email("Invalid Email Address").required("Please Enter Your Email Address"),
            subject: Yup.string().optional(),
            message: Yup.string().max(100,"The Message Is too long").required("Please Enter Your Message"),
        })
    })
    return (
        <div>
            <PageHeader currentPage='Contact'/>
            <div className="p-10 flex flex-col justify-center items-center gap-5">
                <div className="flex justify-center items-center">
                    <div className="w-[650px] text-center">
                        <h1 className="font-semibold text-4xl">Get In Touch With Us</h1>
                        <p className="text-footerSubTexts">
                            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-evenly">
                    <div className="flex flex-col gap-2 w-[293px]">
                        <div className="flex flex-row gap-4">
                            <div className="">
                                <MapPin/>
                            </div>
                            <div className="pt-5">
                                <h2 className="text-2xl font-semibold">Address</h2>
                                <p>236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="">
                                <Phone/>
                            </div>
                            <div className="pt-5">
                                <h2 className="text-2xl font-semibold">Phone</h2>
                                <p>Mobile: +(84) 546-6789</p>
                                <p>Hotline: +(84) 456-6789</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="">
                                <Clock/>
                            </div>
                            <div className="pt-5">
                                <h2 className="text-2xl font-semibold">Working Time</h2>
                                <p>Monday-Friday: 9:00 - 22:00</p>
                                <p>Monday-Friday: 9:00 - 22:00</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-11'>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="name">Your Name</label>
                            <input 
                                type="text" id='name' 
                                name='name' value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder='Abc'
                                className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-2'/>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" id='email' 
                                name='email' value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder='Abc@def.com'
                                className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-2'/>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="subject">Subject</label>
                            <input 
                                type="text" id='subject' 
                                name='subject' value={formik.values.subject}
                                onChange={formik.handleChange}
                                placeholder='This is optional'
                                className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-2'/>
                            {formik.touched.subject && formik.errors.subject ? (
                                <div className="text-red-500 text-sm">{formik.errors.subject}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id='message'
                                name='message' value={formik.values.message}
                                onChange={formik.handleChange}
                                placeholder='Hi! i’d like to ask about ...'
                                className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[150px] text-2xl p-2 resize-none'/>
                            {formik.touched.message && formik.errors.message ? (
                                <div className="text-red-500 text-sm">{formik.errors.message}</div>
                            ) : null}
                        </div>
                        <button type='submit' className="bg-primary px-8 py-2 text-white rounded-lg cursor-pointer w-[200px]">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page