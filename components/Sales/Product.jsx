import React, { useEffect, useState } from 'react'
import MapContainer from '../Maps/MapContainer'
import AuthServices from '@/utils/axios-api'
import { API_ENDPOINTS } from '@/utils/api-endpoints'
import { customError } from '../Common/Toast'
import InfoToast from '../Common/InfoToast'
import clsx from 'clsx'
import DoughnutChart from '../Common/Doughnut'
import HeatmapChart from '../Common/HeatmapChart'
import SankeyChart from '../Common/SankeyChart'
import HistogramChart from '../Common/HistogramChart'
import Heatmap from '../Maps/Heatmap'
import ClusterMap from '../Maps/ClusterMap'
import H3ClustingMap from '../Maps/H3ClustingMap'
import DoughnutContainer from '../Common/Doughnut/DoughnutContainer'

const data = [
    {
        name: 'Metric1',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    },
    {
        name: 'Metric2',
        data: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155],
    }
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

    const [topProductsByQuantity, setTopProductsByQuantity] = useState([]);
    const [topProductsByRevenue, setTopProductsByRevenue] = useState([]);
    // const [productPeriod, setProductPeriod] = useState('day');
    // const [productLabelForDoughnut, setProductLabelForDoughnut] = useState([]);
    // const [productValueForDoughnut, setProductValueForDoughnut] = useState([]);
    // const [productList, setProductList] = useState([]);
    // const [productListDoughtnutPeriod, setProductListDoughtnutPeriod] = useState([]);
    // const [selectedPeriod, setSelectedPeriod] = useState(null)
    const [sankeyData, setSankeyData] = useState([])
    const [histogramRanges, setHistogramRanges] = useState([0, 50, 100, 200, 500, 1000, 10000, 20000])
    const [histogramData, setHistogramData] = useState([])
    const [h3Data, setH3Data] = useState([])
    const [heatMapData, setHeatMapData] = useState([])
    const [h3Resolution, setH3Resolution] = useState(1)
    const [binSize, setBinSize] = useState(0.01)
    const [clusterData, setClusterData] = useState([])

    useEffect(() => {
        console.log("appliedFilter", appliedFilter)
        if (appliedFilter != null) {
            totalSaleHandler();
            totalSaleLineOverallHandler();
            topSellingProductsHandler();
            productSankeyHandler();
            // h3ClustingHandler()
            PerformClusteringHandler();

        }
    }, [appliedFilter])

    // useEffect(() => {
    //     if (appliedFilter != null) {
    //         topSellingProductOverallHandler(productPeriod)
    //     }
    // }, [appliedFilter, productPeriod])

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

    // useEffect(() => {
    //     if (selectedPeriod != null) {

    //         const getData = productList.filter((product) => product.period == selectedPeriod)
    //         console.log("vsfuyahvfsoyiaspyiughwhshdhdbsahhhjdnsblhdjsdhs", getData[0].period)
    //         let getlabels = getData[0].topProductsByRevenue.map(data => { return data.productName })
    //         let getValue = getData[0].topProductsByRevenue.map(data => { return data.totalRevenue })
    //         setProductLabelForDoughnut(getlabels);
    //         setProductValueForDoughnut(getValue);
    //     }
    // }, [selectedPeriod])


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

    // const topSellingProductOverallHandler = async (period) => {
    //     try {
    //         const authService = new AuthServices();
    //         const response = await authService.postApiCallHandler(API_ENDPOINTS.TopSellingProductsOverTime, { ...appliedFilter, "period": period, "limit": 10 });

    //         if (response?.error) {
    //             console.log(response)
    //             customError(response.message || "Failed to fetch data.");
    //             return;
    //         }
    //         console.log("topSellingProductOverallHandler", response?.data);
    //         setProductList(response.data)
    //         let periods = response.data.map((data) => { return data.period });
    //         console.log("periods", periods)
    //         setProductListDoughtnutPeriod(periods)
    //         let getlabels = response.data[0].topProductsByRevenue.map(data => { return data.productName })
    //         let getValue = response.data[0].topProductsByRevenue.map(data => { return data.totalRevenue })
    //         setProductLabelForDoughnut(getlabels);
    //         setProductValueForDoughnut(getValue)


    //     } catch (err) {
    //         console.error("Error fetching user details:", err);

    //     }
    // }

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
            {/* <div className="text-neutral-1000 pb-xl "><MapContainer catalogList={catalogList} setAppliedFilter={setAppliedFilter} /></div> */}
            <div className=' gap-l grid  grid-cols-4 '>
                <div className='relative col-span-1 rounded-md    bg-white text-black border-b-2 border-neutral-200 shadow-md text-center'>
                    <div className='text-f-5xl px-xl text-start font-semibold  text-neutral-1200 pt-l'>Total Sales</div>
                    <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(totalSales.totalSales)}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This indicates the total number of sales recorded in the system." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative flex-1 rounded-md   bg-white text-black  border-b-2 border-neutral-200 shadow-md'>
                    <div className='text-f-5xl px-xl font-semibold text-start text-neutral-1200 pt-l'>Total Order</div>
                    <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(totalSales.totalItems)}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This represents the total number of orders placed." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative col-span-1 rounded-md    bg-white text-black border-b-2 border-neutral-200 shadow-md'>
                    <div className='text-f-5xl px-xl font-semibold text-start text-neutral-1200 pt-l'>Average Order</div>
                    <div className='text-center px-xl  font-semibold text-f-10xl text-secondary-900'>{formatNumber((averageOrder.toFixed(0)))}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This provides insight into the average value of orders over a specific period." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative flex-1 rounded-md  bg-white text-black  border-b-2 border-neutral-200 shadow-md'>
                    <div className='text-f-5xl px-xl font-semibold  text-start  text-neutral-1200 pt-l'>Max Revenue</div>
                    <div className='text-center  px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(maxRevenue.totalRevenue)}</div>
                    <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m start'> At:  {maxRevenue._id}</div>
                    <InfoToast info="This shows the highest revenue recorded and the corresponding date." top={2} right={2} innerRight={-40} popAlign={false} />
                </div>

            </div>
            <div className=' gap-l grid  grid-cols-4 mt-xl'>
                <div className="col-span-4 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Top Products By Quantity
                    </div>
                    <div className='p-xl pt-s h-[450px] '>
                        {sankeyData.length > 0 && <SankeyChart data={sankeyData} />}
                    </div>

                </div>
            </div>
            <div className=' gap-l grid  grid-cols-4 mt-xl'>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Top Products By Revenue
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Name</div>
                            <div className='py-m flex-1 text-center px-l'>Total Quantity Sold</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Total Revenue</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {topProductsByQuantity.map((product, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= topProductsByQuantity.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{product._id}</div>
                                <div className='py-m px-l flex-1 text-center  '>{product.totalQuantitySold}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(product.totalRevenue).toFixed(2)}</div>

                            </div>))}

                        </div>
                    </div>

                </div>

                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Top Products By Quantity
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Name</div>
                            <div className='py-m flex-1 text-center px-l'>Total Quantity Sold</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Total Revenue</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {topProductsByRevenue.map((product, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= topProductsByRevenue.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{product._id}</div>
                                <div className='py-m px-l flex-1 text-center  '>{product.totalQuantitySold}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(product.totalRevenue).toFixed(2)}</div>

                            </div>))}

                        </div>
                    </div>

                </div>
            </div>
            <div className=' gap-l grid  grid-cols-4 mt-xl h-[500px]'>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">


                    <DoughnutContainer endpoint={API_ENDPOINTS.TopSellingProductsOverTime} appliedFilter={appliedFilter} label="Top Selling Products Over Time" From="SaleProduct" />

                </div>

                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">

                    <HistogramChart data={histogramData} bins={histogramRanges} setBins={setHistogramRanges} />


                </div>

            </div>
            <div className=' gap-l grid  grid-cols-4 mt-xl h-[500px]'>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    {/* <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Heat Map Representation
                    </div>
                    <div className='p-xl pt-s  h-full'> */}

                    {heatMapData.length > 0 && <Heatmap data={heatMapData} setBinSize={setBinSize} />}
                    {/* </div> */}
                </div>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Clusting Representation
                    </div>
                    <div className='p-xl pt-s  h-full'>

                        <ClusterMap data={clusterData} />
                    </div>
                </div>
            </div>
            <div className=' gap-l grid  grid-cols-4 mt-xl h-[500px]'>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    {/* <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Heat Map Representation
                    </div>
                    <div className='p-xl pt-s  h-full'> */}

                    {h3Data && <H3ClustingMap h3Data={h3Data} setH3Resolution={setH3Resolution} />}
                    {/* </div> */}
                </div>
                <div className="col-span-2 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Clusting Representation
                    </div>
                    <div className='p-xl pt-s  h-full'>

                        {/* <ClusterMap /> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product