import React from 'react'
import Category from './Category'
import SubCategory from './SubCategory'

const Product = ({ appliedFilter }) => {
    return (
        <div className='pb-4xl hide-scrollbar'>
            <div className='p-xl border rounded-bs  mt-xl'>
                <div className='text-neutral-1200 text-f-xl font-semibold'>Categories Analytics</div>
                <p className='text-f-m text-neutral-600'>This section provides insights into how different product categories perform in terms of user interest. It highlights the total number of views each category receives and visualizes category-wise engagement over time, helping identify trends and customer preferences.</p>
                <Category appliedFilter={appliedFilter} />
            </div>
            <div className='p-xl border rounded-bs mt-xl'>
                <div className='text-neutral-1200 text-f-xl font-semibold'>Sub Categories Analytics</div>
                <p className='text-f-m text-neutral-600'>This section highlights user engagement at a more granular level, showing how different sub-categories are viewed. The table lists total views per sub-category, while the donut chart visualizes the share of views over time, helping spot which sub-categories drive user attention.</p>
                <SubCategory appliedFilter={appliedFilter} />
            </div>
        </div>
    )
}

export default Product