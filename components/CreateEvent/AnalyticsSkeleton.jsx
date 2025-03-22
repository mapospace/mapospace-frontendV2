'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AnalyticsSkeleton = () => {
    return (
        <div className="p-4 space-y-6">
            {/* Title */}
            <div className="w-1/3">
                <Skeleton height={30} />
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <Skeleton height={20} width="50%" />
                        <Skeleton height={30} width="80%" className="mt-2" />
                    </div>
                ))}
            </div>

            {/* Chart area */}
            <div className="mt-6">
                <Skeleton height={300} />
            </div>

            {/* Table */}
            <div className="mt-6">
                <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} />
            </div>
        </div>
    )
}

export default AnalyticsSkeleton
