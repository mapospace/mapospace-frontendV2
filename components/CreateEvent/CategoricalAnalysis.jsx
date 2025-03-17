import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale);
import { VscDebugBreakpointData } from "react-icons/vsc";
import toCapitalizedCase from '@/utils/capitalized-case';

const style = {
    control: (provided) => ({
        ...provided,
        minHeight: 'unset',
        height: 'auto',
        padding: "2px",
        margin: 0,
        border: '1px solid #bfbfbf',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        color: '#bfbfbf',
        borderRadius: '8px'
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999, // Ensures dropdown appears above everything
        backgroundColor: '#ffffff', // Matches parent container background
        borderRadius: '8px',
        border: '1px solid #bfbfbf',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '4px',
        color: '#000',
        fontSize: '12px'
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999, // Ensures dropdown appears on top
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '2px',
        margin: 0,
        color: '#bfbfbf', // Matches text color
        borderRadius: '8px'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        padding: '5px',
        color: '#bfbfbf',
        borderRadius: '8px',

    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0px',
        margin: 0,
        color: '#bfbfbf',
        borderRadius: '8px',
        fontSize: '12px',

    }),
    singleValue: (provided) => ({
        ...provided,
        paddingLeft: '4px',
        margin: 0,
        borderRadius: '8px',

    }),
    multiValueRemove: (provided) => ({
        ...provided,
        padding: 0, // Removes padding around the cross icon
    }),
}
const data = {
    "username": {
        "uniqueValues": 3,
        "frequencies": {
            "john_doe": 6,
            "john_doe_2": 2,

        },
        "mostCommon": [
            {
                "value": "john_doe",
                "count": 6
            },
            {
                "value": "john_doe_2",
                "count": 2
            }


        ]
    }
}



const colors = [
    "#e74c3c", "#f39c12", "#f1c40f", "#1abc9c", "#3498db",
    "#9b59b6", "#2ecc71", "#34495e", "#16a085", "#27ae60",
    "#2980b9", "#8e44ad", "#2c3e50", "#c0392b", "#d35400",
    "#e67e22", "#e74c3c", "#f39c12", "#f1c40f", "#1abc9c",
    "#3498db", "#9b59b6", "#2ecc71", "#34495e", "#16a085",
    "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#c0392b",
    "#d35400", "#e67e22", "#ecf0f1", "#bdc3c7", "#95a5a6",
    "#7f8c8d", "#ff5733", "#c70039", "#900c3f", "#581845",
    "#6a0572", "#9400d3", "#4a235a", "#154360", "#0e6655",
    "#145a32", "#512e5f", "#76448a", "#2471a3", "#0b5345"
]



const CategoricalAnalysis = ({ list, categoricalData }) => {
    const [currentTab, setCurrentTab] = useState('');
    const [categoricalList, setCategoricalList] = useState([])
    const [currentcategoricalData, setCurrentcategoricalData] = useState(null);
    const [barData, setBarData] = useState(null)
    const [doughnutData, setDoughnutData] = useState(null);
    const [maxData, setMaxdata] = useState(null)

    useEffect(() => {
        const categorical = list.map((value) => { return { value: value, label: value } })
        setCategoricalList(categorical);
        setCurrentTab(categorical[0].value);
        console.log('categorical categoricalData ', categorical, categoricalData[categorical[0].value], categoricalData)
    }, []);

    function findMaxFrequenciesAndMostCommon(data) {
        if (!data || typeof data !== "object") {
            return { maxFrequency: null, maxMostCommon: null };
        }

        let maxFrequency = null;
        let maxMostCommon = null;

        if (data.frequencies && typeof data.frequencies === "object") {
            maxFrequency = Object.entries(data.frequencies).reduce((max, [key, value]) => {
                return value > max.count ? { value: key, count: value } : max;
            }, { value: null, count: -Infinity });
        }

        if (Array.isArray(data.mostCommon) && data.mostCommon.length > 0) {
            maxMostCommon = data.mostCommon.reduce((max, item) => {
                return item.count > max.count ? item : max;
            }, { value: null, count: -Infinity });
        }

        return { maxFrequency, maxMostCommon };
    }

    useEffect(() => {
        if (currentTab != '') {
            setCurrentcategoricalData(categoricalData[currentTab])
            const maxes = findMaxFrequenciesAndMostCommon(categoricalData[currentTab])
            console.log("findMaxFrequenciesAndMostCommon", maxes)
            setMaxdata(maxes);
            const doughnutLabel = Object.keys(categoricalData[currentTab].frequencies)
            const doughnutDatasets = [{
                label: "User Frequency",
                data: Object.values(categoricalData[currentTab].frequencies),
                borderColor: '#fff',
                backgroundColor: colors,
                tension: 0.4,
                fill: true,
            }];
            const barLabel = categoricalData[currentTab].mostCommon.map((common) => { return common.value })
            const barDatasets = [{
                label: "User Frequency",
                data: categoricalData[currentTab].mostCommon.map(common => common.count),  // ✅ Correct - Array of counts
                backgroundColor: '#0136f8',
            }];
            setBarData({ labels: barLabel, datasets: barDatasets })
            setDoughnutData({ labels: doughnutLabel, datasets: doughnutDatasets })
        }
    }, [currentTab])


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } }
        },
        plugins: {
            legend: {
                position: "top"
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        // Prepend "Date: " before the date value
                        return `Date: ${tooltipItems[0].label}`;
                    },
                    label: function (tooltipItem) {
                        // Custom label text
                        return `Total Orders: ${tooltipItem.raw}`;
                    }
                }
            }
        },
    };
    return (
        <div className='border mt-l rounded-bs'>

            <div className='flex justify-between py-s px-l border-b'>
                <div className='text-f-2xl'> Categorical Analysis </div>
                <div className='w-[300px]'>
                    <Select
                        options={categoricalList}
                        value={categoricalList.find(option => option.value === currentTab)}
                        onChange={(selected) => {
                            setCurrentTab(selected.value);

                        }}
                        menuPortalTarget={document.body} // Moves dropdown outside of parent to prevent clipping
                        menuPosition="fixed" // Ensures the dropdown stays visible
                        isSearchable={false}
                        className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black !text-f-s z-30"
                        styles={style}
                    />
                </div>

            </div>
            <div className='p-l flex justify-between items-center'>
                <div className='text-f-4xl'>{toCapitalizedCase(currentTab)}</div>
                {currentcategoricalData && <div className='bg-neutral-200 py-s px-xl rounded-blg'>Unique Values : {currentcategoricalData.uniqueValues}</div>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-l px-l pb-xl">
                <div className='col-span-1  rounded-bs border'>
                    <div className=' text-f-xl p-l border-b'>User Activity Frequency Analysis</div>
                    <div className='p-xl text-neutral-900'>
                        This visualization provides insights into the frequency of user activity within the dataset. The donut chart represents the distribution of occurrences for different users, offering a clear view of engagement levels.
                    </div>
                    <div className='w-full px-xl h-[300px] mt-xl'>

                        {doughnutData != null && <Doughnut data={doughnutData} options={options} />}
                    </div>
                    <div className='flex gap-s flex-col p-xl'>
                        <div className='text-f-l font-semibold'>Key observations:</div>
                        <div className='flex gap-s flex-col'>

                            {maxData && maxData.maxFrequency && <div className='flex gap-s items-start '>
                                <div className='w-[25px] h-[25px] '>
                                    <VscDebugBreakpointData className='w-xl h-xl ' />
                                </div>
                                <div>
                                    {maxData.maxFrequency.value} has the highest frequency of occurrences, indicating a dominant presence in the dataset.
                                </div>
                            </div>}
                            <div className='flex gap-s items-start '>
                                <div className='w-[25px] h-[25px] '>
                                    <VscDebugBreakpointData className='w-xl h-xl ' />
                                </div>
                                <div>
                                    The chart provides an easy way to compare user activity at a glance, helping identify trends and potential areas of further exploration.
                                </div>

                            </div>
                        </div>
                    </div>

                    {currentcategoricalData && currentcategoricalData.frequencies && <div className='py-xl'>
                        <div className='px-xl  flex '>
                            <div className='flex-1 text-center bg-neutral-200 py-s rounded-tl-bs'>S No.</div>
                            <div className='flex-1 text-center  border-x border-neutral-500 bg-neutral-200 py-s '>{currentTab}</div>
                            <div className='flex-1 text-center bg-neutral-200 py-s rounded-tr-bs'>Frequency</div>
                        </div>
                        <div className=' max-h-[400px] overflow-y-scroll'>


                            {Object.entries(currentcategoricalData.frequencies).map(([key, value], index) => (
                                <div key={key} className={clsx(' flex mx-xl ')}>
                                    <div className='flex-1 text-center  bg-white py-s '>{index}</div>
                                    <div className='flex-1 text-center border-x bg-white py-s '>{key}</div>
                                    <div className='flex-1 text-center bg-white py-s '>{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
                <div className='col-span-1  rounded-bs border'>
                    <div className=' text-f-xl p-l border-b'> User Activity Most Common Analysis</div>
                    <div className='p-xl text-neutral-900'>
                        This analysis provides an overview of user activity based on frequency distribution. The bar chart visually represents how often different users appear in the dataset
                    </div>
                    <div className='w-full h-[300px] px-xl  mt-xl'>
                        {barData != null && <Bar data={barData} options={barOptions} />}
                    </div>
                    <div className='flex gap-s flex-col p-xl'>
                        <div className='text-f-l font-semibold'>Key Takeaways:</div>
                        <div className='flex gap-s flex-col'>

                            {maxData && maxData.maxMostCommon && <div className='flex gap-s items-start '>
                                <div className='w-[25px] h-[25px] '>
                                    <VscDebugBreakpointData className='w-xl h-xl ' />
                                </div>
                                <div>
                                    {maxData.maxMostCommon.value}  exhibits the highest frequency of occurrences, appearing  {maxData.maxMostCommon.count} times, indicating a significant level of engagement.
                                </div>
                            </div>}
                            <div className='flex gap-s items-start '>
                                <div className='w-[25px] h-[25px] '>
                                    <VscDebugBreakpointData className='w-xl h-xl ' />
                                </div>
                                <div>
                                    The distribution highlights a clear disparity in user activity, which could be useful for identifying active users or optimizing engagement strategies.
                                </div>

                            </div>
                        </div>
                    </div>
                    {currentcategoricalData && currentcategoricalData.mostCommon && <div className='py-xl'>
                        <div className='px-xl  flex '>
                            <div className='flex-1 text-center bg-neutral-200 py-s rounded-tl-bs'>S No.</div>
                            <div className='flex-1 text-center  border-x border-neutral-500 bg-neutral-200 py-s '>{currentTab}</div>
                            <div className='flex-1 text-center bg-neutral-200 py-s rounded-tr-bs'>Count</div>
                        </div>
                        <div className='max-h-[400px] overflow-y-scroll'>
                            {currentcategoricalData.mostCommon.map((common, index) => (
                                <div key={index} className={clsx(' flex mx-xl ')}>
                                    <div className='flex-1 text-center  bg-white py-s '>{index}</div>
                                    <div className='flex-1 text-center border-x bg-white py-s '>{common.value}</div>
                                    <div className='flex-1 text-center bg-white py-s '>{common.count}</div>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            </div >
        </div >
    )
}

export default CategoricalAnalysis

