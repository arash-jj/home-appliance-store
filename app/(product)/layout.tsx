import ShopBenefits from '@/components/ShopBenefits'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
    return (
        <div>
            {children}
            <ShopBenefits/>
        </div>
    )
}

export default layout