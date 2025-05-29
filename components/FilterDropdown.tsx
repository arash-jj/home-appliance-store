"use client"

import { SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
    name: string
    options: string[]
    onChange: (name: string, value: string) => void
}

const FilterDropdown = ({ name, options, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState('All Categories')
    const handleSelect = (value: string) => {
        setSelected(value || 'All Categories')
        setIsOpen(false)
        onChange(name, value) 
    }
    return (
        <div className="relative inline-block w-auto text-left">
            <div>
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[20px] cursor-pointer flex flex-row justify-center items-center gap-2.5"
                >
                <SlidersHorizontal size={20}/>
                Filter
                </button>
            </div>
            {isOpen && (
                <div className="absolute mt-2 w-auto rounded-md shadow-lg bg-white border border-gray-200 z-10">
                <ul className="py-1 text-sm text-gray-700">
                    <li
                    onClick={() => handleSelect('')}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                    All Categories
                    </li>
                    {options.map((option) => (
                    <li
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                        {option}
                    </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    )
}

export default FilterDropdown