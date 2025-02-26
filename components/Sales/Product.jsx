import React, { useEffect, useState } from 'react'
import AuthServices from '@/utils/axios-api'
import { API_ENDPOINTS } from '@/utils/api-endpoints'
import { customError } from '../Common/Toast'
import InfoToast from '../Common/InfoToast'
import clsx from 'clsx'
import SankeyChart from '../Common/SankeyChart'
import HistogramChart from '../Common/HistogramChart'
import Heatmap from '../Maps/Heatmap'
import ClusterMap from '../Maps/ClusterMap'
import H3ClustingMap from '../Maps/H3ClustingMap'
import DoughnutContainer from '../Common/Doughnut/DoughnutContainer'
import Select from "react-select";
import Category from './Category'
import SubCategory from './SubCategory'
import h3 from '../../public/dashboard/h3.png'
import heatmap from '../../public/dashboard/heatmap.png'
import clusting from '../../public/dashboard/clusting.png'
// const data = [
//     {
//         name: 'Metric1',
//         data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
//     },
//     {
//         name: 'Metric2',
//         data: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155],
//     }
// ];

const dataValues = [
    { value: "revenue", label: "Revenue" },
    { value: "quantity", label: "Quantity" },
];

const Product = ({ appliedFilter }) => {
    const [totalSales, setTotalSales] = useState({
        "totalSales": 0,
        "totalItems": 0,
    });
    const [averageOrder, setAverageOrder] = useState(0)
    const [maxRevenue, setMaxRevenue] = useState({
        totalRevenue: 0,
        _id: "NA"
    })
    const [selectedSortOption, setSelectedSortOption] = useState(dataValues[0]);
    const [topProductsByQuantity, setTopProductsByQuantity] = useState([]);
    const [topProductsByRevenue, setTopProductsByRevenue] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [sankeyData, setSankeyData] = useState([])
    const [histogramRanges, setHistogramRanges] = useState([0, 50, 100, 200, 500, 1000, 10000, 20000])
    const [histogramData, setHistogramData] = useState([])
    const [h3Data, setH3Data] = useState([])
    const [heatMapData, setHeatMapData] = useState([])
    const [h3Resolution, setH3Resolution] = useState(1)
    const [binSize, setBinSize] = useState(0.01)
    const [clusterData, setClusterData] = useState([])
    const [currentMap, setCurrentMap] = useState(0)

    useEffect(() => {
        console.log("appliedFilter", appliedFilter)
        if (appliedFilter != null) {
            totalSaleHandler();
            totalSaleLineOverallHandler();
            topSellingProductsHandler();
            productSankeyHandler();
            PerformClusteringHandler();

        }
    }, [appliedFilter])

    useEffect(() => {
        topProductsByQuantity && topProductsByRevenue && selectedSortOption.value == "revenue" ? setTopProducts(topProductsByRevenue) : setTopProducts(topProductsByQuantity);
    }, [selectedSortOption, topProductsByQuantity, topProductsByRevenue])


    useEffect(() => {
        if (appliedFilter != null) {
            heatMapHandler(binSize)
        }
    }, [appliedFilter, binSize])

    useEffect(() => {
        if (appliedFilter != null) {
            h3ClustingHandler(h3Resolution)
        }
    }, [appliedFilter, h3Resolution])

    useEffect(() => {
        if (appliedFilter != null) {
            orderValueDistributionHandler(histogramRanges)
        }
    }, [histogramRanges, appliedFilter])

    const totalSaleHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TotalSales, appliedFilter);

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("total sales => ", response?.data);
            setTotalSales(response.data[0])


        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const productSankeyHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TopSellingProductSankey, appliedFilter);

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("productSankeyHandler => ", response?.data);
            // setTotalSales(response.data[0])
            setSankeyData(response?.data)


        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    function formatNumber(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + 'B'; // Billion
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M'; // Million
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K'; // Thousand
        }
        return num.toString(); // If less than 1000, return as is
    }

    const totalSaleLineOverallHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TotalSalesOverTime, { ...appliedFilter, "period": 'day' });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("total sales over all", response?.data);
            let getTotalOrders = response.data.map(data => { return data.totalOrders })
            const averageOrder = getTotalOrders.reduce((sum, num) => sum + num, 0) / getTotalOrders.length;
            const maxEntry = response.data.reduce((max, entry) => (entry.totalRevenue > max.totalRevenue ? entry : max), response.data[0]);
            setAverageOrder(averageOrder)
            setMaxRevenue(maxEntry)
        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const topSellingProductsHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TopSellingProduct, { ...appliedFilter, "limit": 10 });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("topSellingProductsHandler", response?.data);
            // setProductList(response?.data)
            setTopProductsByQuantity(response?.data.topProductsByQuantity)
            setTopProductsByRevenue(response?.data.topProductsByRevenue)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const orderValueDistributionHandler = async (ranges) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.OrderValueDistribution, { ...appliedFilter, "ranges": ranges });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("orderValueDistributionHandler", response?.data);
            const data = response.data.map((data) => { return data.count })
            setHistogramData(data)
            // setProductList(response?.data)
            // setTopProductsByQuantity(response?.data.topProductsByQuantity)
            // setTopProductsByRevenue(response?.data.topProductsByRevenue)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const h3ClustingHandler = async (resolution) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.H3Clusting, { ...appliedFilter, "h3Resolution": resolution });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("h3ClustingHandler", response?.data);
            setH3Data(response.data)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const heatMapHandler = async (bin) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.SalesDensity, { ...appliedFilter, "binSize": bin });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("heatMapHandler", response?.data);
            setHeatMapData(response.data)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const PerformClusteringHandler = async (bin) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.PerformClustering, { ...appliedFilter, "eps": 0.01, "min_samples": 2 });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("PerformClusteringHandler", response?.data);
            setClusterData(response.data)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    return (
        <div className='pb-4xl hide-scrollbar'>
            <div className=' gap-l grid  grid-cols-4 mt-xl'>
                <div className="col-span-4 h-full bg-white rounded-bs flex flex-col border  ">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Top Products By Quantity
                    </div>
                    <div className='p-xl pt-s h-[450px] '>
                        {sankeyData.length > 0 && <SankeyChart data={sankeyData} />}
                    </div>

                </div>
            </div>
            {/* <div className="text-neutral-1000 pb-xl "><MapContainer catalogList={catalogList} setAppliedFilter={setAppliedFilter} /></div> */}
            <div className=' gap-xl grid  grid-cols-4  mt-xl'>
                <div className='relative col-span-1 rounded-bs    bg-white text-black border   text-center'>
                    <div className='text-f-5xl px-xl text-start font-semibold  text-neutral-1200 pt-l'>Total Sales</div>
                    <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(totalSales.totalSales)}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This indicates the total number of sales recorded in the system." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative flex-1 rounded-bs   bg-white text-black  border  '>
                    <div className='text-f-5xl px-xl font-semibold text-start text-neutral-1200 pt-l'>Total Order</div>
                    <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(totalSales.totalItems)}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This represents the total number of orders placed." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative col-span-1 rounded-bs    bg-white text-black border  '>
                    <div className='text-f-5xl px-xl font-semibold text-start text-neutral-1200 pt-l'>Average Order</div>
                    <div className='text-center px-xl  font-semibold text-f-10xl text-secondary-900'>{formatNumber((averageOrder.toFixed(0)))}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This provides insight into the average value of orders over a specific period." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative flex-1 rounded-bs  bg-white text-black  border  '>
                    <div className='text-f-5xl px-xl font-semibold  text-start  text-neutral-1200 pt-l'>Max Revenue</div>
                    <div className='text-center  px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(maxRevenue.totalRevenue)}</div>
                    <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m start'> At:  {maxRevenue._id}</div>
                    <InfoToast info="This shows the highest revenue recorded and the corresponding date." top={2} right={2} innerRight={-40} popAlign={false} />
                </div>

            </div>

            <div className=' gap-xl grid  grid-cols-4 mt-xl '>
                <div className="col-span-2 h-full bg-white rounded-bs flex flex-col border">
                    <div className='flex justify-between px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        <h3 className="text-f-l font-semibold text-neutral-1200  ">
                            Top Product By {selectedSortOption.label}
                        </h3>
                        <div className='flex gap-s'>
                            <Select
                                options={dataValues}
                                value={selectedSortOption}
                                onChange={(selected) => setSelectedSortOption(selected)}
                                isSearchable={false}
                                className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black text-f-s"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        minHeight: 'unset',  // Remove default min-height
                                        height: 'auto',
                                        padding: "2px",
                                        margin: 0,
                                        border: '1px solid #4d4d4d',
                                        boxShadow: 'none',
                                        backgroundColor: 'transparent',
                                    }),
                                    valueContainer: (provided) => ({
                                        ...provided,
                                        padding: '2px', // Ensure no extra padding
                                        margin: 0,
                                    }),
                                    indicatorsContainer: (provided) => ({
                                        ...provided,
                                        padding: '2px',
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        padding: '0px', // Removes space around the dropdown arrow
                                        margin: 0,
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        padding: 0,
                                        margin: 0,
                                    }),
                                }}
                            />

                        </div>
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Name</div>
                            <div className='py-m flex-1 text-center px-l'>Total Quantity Sold</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Total Revenue</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {topProducts.map((product, index) => (<div className={clsx(' flex  border-b border-neutral-200  text-neutral-1200', index >= topProductsByQuantity.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{product._id}</div>
                                <div className='py-m px-l flex-1 text-center  '>{product.totalQuantitySold}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(product.totalRevenue).toFixed(2)}</div>

                            </div>))}

                        </div>
                    </div>

                </div>

                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col ">
                    <DoughnutContainer endpoint={API_ENDPOINTS.TopSellingProductsOverTime} appliedFilter={appliedFilter} label="Top Selling Products Over Time" From="SaleProduct" />
                </div>

            </div>
            <div className=' gap-xl grid  grid-cols-4 mt-xl  min-h-[500px]'>
                {/* <div className="col-span-2 h-full bg-white rounded-bs flex flex-col ">


                    <DoughnutContainer endpoint={API_ENDPOINTS.TopSellingProductsOverTime} appliedFilter={appliedFilter} label="Top Selling Products Over Time" From="SaleProduct" />

                </div> */}

                <div className="col-span-4 h-full bg-white rounded-bs flex flex-col border">

                    <HistogramChart data={histogramData} bins={histogramRanges} setBins={setHistogramRanges} />


                </div>

            </div>
            {/* <div className=' gap-xl grid  grid-cols-4 mt-xl h-[500px]'>
                <div className="col-span-2 h-full bg-white rounded-bs flex flex-col">


                    {heatMapData.length > 0 && <Heatmap data={heatMapData} setBinSize={setBinSize} />}
                </div>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Clusting Representation
                    </div>
                    <div className='p-xl pt-s  h-full'>

                        <ClusterMap data={clusterData} />
                    </div>
                </div>
            </div> */}
            <div className='p-xl  border rounded-bs mt-xl flex flex-col gap-xl'>
                <div className='text-neutral-1200 text-f-xl font-semibold'>
                    Map Visualization
                </div>
                <div className=' gap-xl grid  grid-cols-5  h-[100vh]'>
                    <div className='col-span-4 h-full'>
                        {currentMap == 0 && h3Data && <H3ClustingMap h3Data={h3Data} setH3Resolution={setH3Resolution} />}
                        {currentMap == 1 && heatMapData.length > 0 && <Heatmap data={heatMapData} setBinSize={setBinSize} />}
                        {currentMap == 2 && heatMapData.length > 0 && <ClusterMap data={clusterData} />}

                    </div>
                    <div className='col-span-1 h-full  flex flex-col gap-xl '>
                        <button className={clsx("w-full h-[150px] bg-white text-neutral-1200 text-f-s py-xs rounded-bs border", currentMap == 0 && 'border-secondary-900')} onClick={() => setCurrentMap(0)}>
                            <div>
                                <div className='pb-xs'>H3 Visualization</div>
                                <div className='relative w-full h-full'>
                                    <img className='w-full  h-[130px] object-cover rounded-bs' src='../dashboard/h3.png' alt='h3' />
                                    <div className='absolute bg-black inset-0 rounded-bs bg-opacity-40'></div>
                                </div>
                            </div>

                        </button>
                        <button className={clsx("w-full h-[150px] bg-white text-neutral-1200 text-f-s py-xs rounded-bs border", currentMap == 1 && 'border-secondary-900')} onClick={() => setCurrentMap(1)}>
                            <div>
                                <div className='pb-xs'>Clusting Visualization</div>
                                <div className='relative w-full h-full'>

                                    <img className='w-full object-cover rounded-bs h-[130px]' src='../dashboard/clusting.png' alt='clusting' />
                                    <div className='absolute bg-black inset-0 rounded-bs bg-opacity-40'></div>
                                </div>
                            </div>

                        </button>
                        <button className={clsx("w-full h-[150px] bg-white text-neutral-1200 text-f-s py-xs rounded-bs border", currentMap == 2 && 'border-secondary-900')} onClick={() => setCurrentMap(2)}>
                            <div>
                                <div className='pb-xs'>Heatmap Visualization</div>
                                <div className='relative w-full h-full'>

                                    <img className='w-full object-cover rounded-bs h-[130px]' src='../dashboard/heatmap.png' alt='heatmap' />
                                    <div className='absolute bg-black inset-0 rounded-bs bg-opacity-40'></div>
                                </div>
                            </div>

                        </button>
                    </div>
                </div>
            </div>


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