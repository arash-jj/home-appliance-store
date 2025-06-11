"use client"

import PageHeader from '@/components/PageHeader'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React,{ useState, useEffect } from 'react'
import { ICountry, IState, City } from 'country-state-city'

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

const page = () => {
    const [countries, setCountries] = useState<ICountry[]>([])
    const [states, setStates] = useState<IState[]>([])
    const [cities, setCities] = useState<any[]>([])
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
            firstName: Yup.string().max(12,"The First Name is too long").required("required"),
            lastName: Yup.string().max(12,"The Last Name is too long").required("required"),
            componyName: Yup.string().max(10,"The Compony Name in too long").optional(),
            country : Yup.string().required("required"),
            streetAddress : Yup.string().required("required"),
            city : Yup.string().required("required"),
            province : Yup.string().required("required"),
            zipcode : Yup.string().required("required"),
            phone : Yup.string().required("required"),
            email: Yup.string().email('Invalid email address').required('Required'),
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
    return (
        <div>
            <PageHeader currentPage='Checkout'/>
            <div className="flex flex-row p-10 bg-red-100">
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8'>
                    {/* group one */}
                    <div className="flex flex-row gap-8">
                        {/*  */}
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
                         {/*  */}
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
                    {/* group two */}
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
                    {/* group three */}
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
                    {/* group four */}
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
                    {/* group five */}
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
                    {/* group six */}
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
                    {/* group seven */}
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
                    {/* group eight */}
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
                    {/* group nine */}
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
                    {/* group ten */}
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
                <div className=""></div>
            </div>
        </div>
    )
}

export default page