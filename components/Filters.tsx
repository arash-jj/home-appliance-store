"use client"

import React from 'react'
import FilterDropdown from './FilterDropdown'

interface FiltersProps {
    onFilterChange: (name: string, value: string) => void
}
const categories = ['Stylish', 'luxury', 'outdoor', 'lamp', 'sofa', 'mug']

const Filters = ({ onFilterChange }: FiltersProps) => {
    return (
    <div className="">
        <FilterDropdown
            name="category"
            options={categories}
            onChange={onFilterChange}
        />
    </div>
    )
}

export default Filters