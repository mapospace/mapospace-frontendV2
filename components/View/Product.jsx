import React from 'react'
import Category from './Category'
import SubCategory from './SubCategory'

const Product = ({ appliedFilter }) => {
    return (
        <div className='pb-4xl hide-scrollbar'>
            <div className='p-xl border rounded-bs  mt-xl'>
                <div className='text-neutral-1200 text-f-xl font-semibold'>Categories Analytics</div>
                <Category appliedFilter={appliedFilter} />
            </div>
            <div className='p-xl border rounded-bs mt-xl'>
                <div className='text-neutral-1200 text-f-xl font-semibold'>Sub Categories Analytics</div>
                <SubCategory appliedFilter={appliedFilter} />
            </div>
        </div>
    )
}

export default Product