import React, { useEffect } from 'react'
import Graphs from './Graphs'
import MapContainer from '../Maps/MapContainer'

const Order = ({ catalogList, setAppliedFilter, appliedFilter }) => {
    useEffect(() => {
        if (appliedFilter != null) {
            console.log("Order filter", appliedFilter)
        }
    }, [appliedFilter])
    return (
        <div>
            <div className="text-neutral-1000 pb-xl"><MapContainer catalogList={catalogList} setAppliedFilter={setAppliedFilter} /></div>
            <Graphs />
        </div>
    )
}

export default Order