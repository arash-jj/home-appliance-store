"use client"

import React, { useState } from 'react'

interface PageProps {
    description: string
    additionalInfo: string
    review: number
}

type TabType = 'description' | 'additionalInfo' | 'review'

const MoreProductInfo = ({ description, additionalInfo, review }: PageProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('description')
    const tabs = [
        { id: 'description', label: 'Description', content: description },
        { id: 'additionalInfo', label: 'Additional Information', content: additionalInfo },
        { id: 'review', label: 'Reviews', content: review, showCount: true }
    ]
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center gap-10 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`
                            text-2xl transition-colors duration-200 cursor-pointer
                            ${activeTab === tab.id 
                                ? "text-black font-medium" 
                                : "text-footerSubTexts hover:text-gray-700"
                            }
                        `}
                    >
                        {tab.label}
                        {tab.showCount && `[${review}]`}
                    </button>
                ))}
            </div>
            <div 
                className={`
                    px-7 py-4 text-footerSubTexts
                    ${activeTab === 'review' ? "text-7xl text-center" : ""}
                `}
            >
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    )
}

export default MoreProductInfo