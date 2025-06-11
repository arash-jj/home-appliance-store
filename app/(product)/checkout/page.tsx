"use client"

import PageHeader from '@/components/PageHeader'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React,{ useState, useEffect } from 'react'
import { ICountry, IState, City } from 'country-state-city'
import Data from '@/data/db.json';
import { X } from 'lucide-react'
import { centsToDollar } from '@/lib/utils'

interface FormikTypes {
    firstName: string,
    lastName: string,
    componyName: string,
    country: string,
    streetAddress: string,
    city: string,
    state: string,
    zipcode: string,
    phone: string,
    email: string,
    additionalInformation: string,
}
interface CartItem {
    productId: number,
    color: string,
    size: string,
    quantity: number,
    price: number,
    image: string,
    name: string
}

const page = () => {
    const [countries, setCountries] = useState<ICountry[]>([])
    const [states, setStates] = useState<IState[]>([])
    const [cities, setCities] = useState<any[]>([])
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = Data.find(p => p.id === item.productId)
            if (!product) return total
            const price = product.discountedPrice > 0 ? product.discountedPrice : product.price
            return total + (price * item.quantity)
    }, 0)}
    const formik = useFormik<FormikTypes>({
        initialValues: {
            firstName: "",
            lastName: "",
            componyName: "",
            country: "",
            streetAddress: "",
            city: "",
            state: "",
            zipcode: "",
            phone: "",
            email: "",
            additionalInformation: "",
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        },
        validationSchema: Yup.object({
            firstName: Yup.string().max(12,"The First Name is too long").required("Please Enter Your First Name"),
            lastName: Yup.string().max(12,"The Last Name is too long").required("Please Enter Your Last Name"),
            componyName: Yup.string().max(10,"The Compony Name in too long").optional(),
            country : Yup.string().required("Please Choose Your Country"),
            streetAddress : Yup.string().required("Please Enter Your Address"),
            city : Yup.string().required("Please Choose Your City"),
            province : Yup.string().required("Please Choose Your Province"),
            zipcode : Yup.string().required("Please Enter Your ZIP Code"),
            phone : Yup.string().required("Please Enter Your Phone Number"),
            email: Yup.string().email('Invalid email address').required('Please Enter Your Email Address'),
            additionalInformation: Yup.string().optional()
        })
    })
    useEffect(()=>{
        const allCountries = require('country-state-city').Country.getAllCountries()
        setCountries(allCountries)
    },[])
    useEffect(() => {
    if (formik.values.country) {
        const countryStates = require('country-state-city').State.getStatesOfCountry(
            formik.values.country
        )
        setStates(countryStates)
        setCities([])
        formik.setFieldValue('state', '')
        formik.setFieldValue('city', '')
    }
    }, [formik.values.country])
    useEffect(() => {
    if (formik.values.state) {
        const stateCities = require('country-state-city').City.getCitiesOfState(
            formik.values.country,
            formik.values.state
        )
        setCities(stateCities)
        formik.setFieldValue('city', '')
        }
    }, [formik.values.state])
    useEffect(() => {
        const items = localStorage.getItem("cart")
        if (items) {
            setCartItems(JSON.parse(items))
        }
    },[])
    return (
        <div>
            <PageHeader currentPage='Checkout'/>
            <div className="flex flex-row justify-around p-10">
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8'>
                    <h1 className="font-semibold text-4xl">Billing details</h1>
                    <div className="flex flex-row gap-8">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" id='firstName' 
                                name='firstName' value={formik.values.firstName}
                                onChange={formik.handleChange}
                                className='outline-none border border-footerSubTexts rounded-xl w-[210px] h-[75px] text-2xl px-1'/>
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                                ) : null}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" id='lastName' 
                                name='lastName' value={formik.values.lastName}
                                onChange={formik.handleChange}
                                className='outline-none border border-footerSubTexts rounded-xl w-[210px] h-[75px] text-2xl px-1'/>
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                                ) : null}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="componyName">Compony Name (Optional)</label>
                        <input 
                            type="text" id='componyName' 
                            name='componyName' value={formik.values.componyName}
                            onChange={formik.handleChange}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'/>
                        {formik.touched.componyName && formik.errors.componyName ? (
                            <div className="text-red-500 text-sm">{formik.errors.componyName}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="country">Country / Region</label>
                        <select  
                            id='country' 
                            name='country' value={formik.values.country}
                            onChange={formik.handleChange}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'>
                            <option value="">Select Country</option>
                                {countries.map(country => (
                                    <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.country && formik.errors.country ? (
                            <div className="text-red-500 text-sm">{formik.errors.country}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="streetAddress">Street Address</label>
                        <input 
                            type="text" id='streetAddress' 
                            name='streetAddress' value={formik.values.streetAddress}
                            onChange={formik.handleChange}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'/>
                        {formik.touched.streetAddress && formik.errors.streetAddress ? (
                            <div className="text-red-500 text-sm">{formik.errors.streetAddress}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="state">Province</label>
                        <select  
                            id='state' 
                            name='state' value={formik.values.state}
                            onChange={formik.handleChange}
                            disabled={!formik.values.country}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'>
                            <option value="">Select State</option>
                                {states.map(state => (
                                    <option key={state.isoCode} value={state.name}>
                                    {state.name}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.state && formik.errors.state ? (
                            <div className="text-red-500 text-sm">{formik.errors.state}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="city">Town / City</label>
                        <select  
                            id='city' 
                            name='city' value={formik.values.city}
                            onChange={formik.handleChange}
                            disabled={!formik.values.state}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'>
                            <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city.name} value={city.name}>
                                    {city.name}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.city && formik.errors.city ? (
                            <div className="text-red-500 text-sm">{formik.errors.city}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="zipcode">ZIP code</label>
                        <input 
                            type="text" id='zipcode' 
                            name='zipcode' value={formik.values.zipcode}
                            onChange={formik.handleChange}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'/>
                        {formik.touched.zipcode && formik.errors.zipcode ? (
                            <div className="text-red-500 text-sm">{formik.errors.zipcode}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="text" id='phone' 
                            name='phone' value={formik.values.phone}
                            onChange={formik.handleChange}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'/>
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" id='email' 
                            name='email' value={formik.values.email}
                            onChange={formik.handleChange}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'/>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                        <input 
                            placeholder='Additional Information'
                            type="text" id='additionalInformation' 
                            name='additionalInformation' value={formik.values.additionalInformation}
                            onChange={formik.handleChange}
                            className='outline-none border border-footerSubTexts rounded-xl w-[450px] h-[75px] text-2xl px-1'/>
                        {formik.touched.additionalInformation && formik.errors.additionalInformation ? (
                            <div className="text-red-500 text-sm">{formik.errors.additionalInformation}</div>
                        ) : null}
                    </div>
                </form>
                <div className=" p-5 w-[600px]">
                    <div className="flex flex-col gap-1 border-b border-footerSubTexts">
                        <div className="flex flex-row items-center justify-between">
                            <p className="text-2xl">Product</p>
                            <p className="text-2xl">Subtotal</p>
                        </div>
                        {cartItems.map(item => (
                            <div key={`name-${item.name}-color-${item.color}-size-${item.size}`} className="flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-footerSubTexts">{item.name}</p>
                                    <X size={16}/>
                                    <span>{item.quantity}</span>
                                </div>
                                <p>{centsToDollar(item.price)}$</p>
                            </div>
                        ))}
                        <div className="flex flex-row items-center justify-between">
                            <p className="text-2xl">Total</p>
                            <p className="text-2xl text-primary">{centsToDollar(calculateTotal())}$</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5 py-2">
                        <div className="flex flex-row items-center gap-2">
                            <input type="checkbox" name="payment" id="payment" />
                            <p className="text-sm">Direct Bank Transform</p>
                        </div>
                        <p className="text-footerSubTexts font-light">
                            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                        </p>
                        <p className="text-footerSubTexts font-light">
                            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our 
                            <span className="font-semibold cursor-pointer text-black"> privacy policy</span>.
                        </p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <form onSubmit={formik.handleSubmit}>
                            <button type='submit' className="border rounded-2xl px-8 py-2 font-light cursor-pointer">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page