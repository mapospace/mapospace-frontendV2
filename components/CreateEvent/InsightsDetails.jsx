import React from 'react'
import { VscDebugBreakpointData } from "react-icons/vsc";
import { FiInfo } from "react-icons/fi";
import { BsHexagon } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineReportProblem } from "react-icons/md";

const InsightsDetails = ({ insightsData }) => {
    return (<>
        <div className='text-f-2xl mt-l mb-l pb-s border-b'>Overview</div>
        <div className="grid grid-cols-2  gap-l  py-m text-gray-700 ">
            {insightsData.summary && <div className='rounded-bs bg-white px-xl py-s border'>
                <div className='text-f-xl font-semibold mb-s flex gap-s items-center'>
                    <FiInfo className='text-blue-500' />
                    <div >Summary</div>
                </div>
                <div className='text-f-l '>Total Records : {insightsData.summary.totalRecords}</div>
                {insightsData.summary.keyFindings.map((value, index) => (
                    <div key={index} className='mt-xs flex items-start gap-s'>
                        <div className='w-[25px] h-[25px] '>
                            <VscDebugBreakpointData className='w-xl h-xl ' />
                        </div>
                        <div className='flex-1'>{value}</div>
                    </div>
                ))}
            </div>}
            {insightsData.patterns && <div className='rounded-bs bg-white px-xl py-s border'>
                <div className='text-f-xl font-semibold mb-s flex gap-s items-center'>
                    <BsHexagon className='text-yellow-500' />
                    <div >Frequent And Unusual Patterns</div>
                </div>
                {insightsData.patterns.frequent && insightsData.patterns.frequent.map((value, index) => (
                    <div key={index} className='mt-xs flex items-start gap-s'>
                        <div className='w-[25px] h-[25px] '>
                            <VscDebugBreakpointData className='w-xl h-xl ' />
                        </div>
                        <div className='flex-1'>{value}</div>
                    </div>
                ))}
                {insightsData.patterns.unusual && insightsData.patterns.unusual.map((value, index) => (
                    <div key={index} className='mt-xs flex items-start gap-s'>
                        <div className='w-[25px] h-[25px] '>
                            <VscDebugBreakpointData className='w-xl h-xl ' />
                        </div>
                        <div className='flex-1'>{value}</div>
                    </div>
                ))}

            </div>}
            {insightsData.recommendations && <div className='rounded-bs bg-white px-xl py-s border'>
                <div className='text-f-xl font-semibold mb-s flex gap-s items-center'>
                    <IoShieldCheckmarkOutline className='text-green-500' />
                    <div >Recommendations</div>
                </div>

                {insightsData.recommendations.map((value, index) => (
                    <div key={index} className='mt-xs flex items-start gap-s'>
                        <div className='w-[25px] h-[25px] '>
                            <VscDebugBreakpointData className='w-xl h-xl ' />
                        </div>
                        <div className='flex-1'>{value}</div>
                    </div>
                ))}
            </div>}
            {insightsData.qualityIssues && <div className='rounded-bs bg-white px-xl py-s border'>
                <div className='text-f-xl font-semibold mb-s flex gap-s items-center'>
                    <MdOutlineReportProblem className='text-red-500' />
                    <div >Quality Issues</div>
                </div>
                {insightsData.qualityIssues.map((value, index) => (
                    <div key={index} className='mt-xs flex items-start gap-s'>
                        <div className='w-[25px] h-[25px] '>
                            <VscDebugBreakpointData className='w-xl h-xl ' />
                        </div>
                        <div className='flex-1'>{value}</div>
                    </div>
                ))}
            </div>}
        </div>
    </>

    )
}

export default InsightsDetails