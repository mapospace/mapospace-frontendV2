import React, { useEffect, useState } from 'react'
import Graphs from './Graphs'
import MapContainer from '../Maps/MapContainer'
import AuthServices from '@/utils/axios-api'
import { API_ENDPOINTS } from '@/utils/api-endpoints'
import { customError } from '../Common/Toast'
import LineChart from '../Common/LineChart'
import BarChart from '../Common/BarChart'
import clsx from 'clsx'
import InfoToast from '../Common/InfoToast'
import toCapitalizedCase from '@/utils/capitalized-case'


const TotalSales = ({ catalogList, setAppliedFilter, appliedFilter }) => {
    const [totalSales, setTotalSales] = useState({
        "totalSales": 0,
        "totalItems": 0,
    });
    const [orderSales, setOrderSales] = useState({
        "averageAmountSpentPerOrder": 76238752852,
    });

    const [averageOrder, setAverageOrder] = useState(0)
    const [maxRevenue, setMaxRevenue] = useState({
        totalRevenue: 0,
        _id: "NA"
    })
    const [totalSalesOverTime, setTotalSalesOverTime] = useState([]);
    const [labels, setLabels] = useState([]);
    const [linelabels, setLineLabels] = useState([]);

    const [totalOrders, setTotalOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);
    const [linePeriod, setLinePeriod] = useState('day');
    const [barPeriod, setBarPeriod] = useState('day');

    // order
    const [orderlabels, setOrderLabels] = useState([]);
    const [orderRevenue, setOrderRevenue] = useState([]);
    const [orderPeriod, setOrderPeriod] = useState('day');
    const [ordersOverTime, setOrderOverTime] = useState([]);

    useEffect(() => {
        console.log("appliedFilter", appliedFilter)
        if (appliedFilter != null) {
            totalSaleHandler()
            OrderSaleHandler()
        }
    }, [appliedFilter])

    useEffect(() => {
        if (appliedFilter != null) {
            totalSaleLineOverTimeHandler(linePeriod)
        }
    }, [linePeriod, appliedFilter])

    useEffect(() => {
        if (appliedFilter != null) {
            totalSaleBarOverTimeHandler(barPeriod)
        }
    }, [barPeriod, appliedFilter])

    useEffect(() => {
        if (appliedFilter != null) {
            orderSaleBarOverTimeHandler(orderPeriod)
        }
    }, [orderPeriod, appliedFilter])



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
    const OrderSaleHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.OrderSales, appliedFilter);

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("OrderSaleHandler", response?.data);
            setOrderSales(response.data[0])


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

    const orderSaleBarOverTimeHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.OrderSalesOverTime, { ...appliedFilter, "period": period });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("orderSaleBarOverTimeHandler", response?.data);
            let getlabels = response.data.map(data => { return data.period })
            let getTotalRevenue = response.data.map(data => { return data.averageOrderValue })
            setOrderOverTime(response?.data)
            setOrderLabels(getlabels);
            setOrderRevenue([getTotalRevenue]);
        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const totalSaleBarOverTimeHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TotalSalesOverTime, { ...appliedFilter, "period": period });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("total sales over all", response?.data);
            let getlabels = response.data.map(data => { return data._id })
            let getTotalRevenue = response.data.map(data => { return data.totalRevenue })
            setLabels(getlabels);
            setTotalRevenue([getTotalRevenue])
            let getTotalOrders = response.data.map(data => { return data.totalOrders })
            if (barPeriod == "day") {
                const averageOrder = getTotalOrders.reduce((sum, num) => sum + num, 0) / getTotalOrders.length;
                const maxEntry = response.data.reduce((max, entry) => (entry.totalRevenue > max.totalRevenue ? entry : max), response.data[0]);
                setAverageOrder(averageOrder)
                setMaxRevenue(maxEntry)
            }


        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const totalSaleLineOverTimeHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.TotalSalesOverTime, { ...appliedFilter, "period": period });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("total sales over all", response?.data);
            setTotalSalesOverTime(response.data);
            let getlabels = response.data.map(data => { return data._id })
            let getTotalOrders = response.data.map(data => { return data.totalOrders })
            // let getTotalRevenue = response.data.map(data => { return data.totalRevenue })
            setLineLabels(getlabels);
            setTotalOrders([getTotalOrders])
            // setTotalRevenue([getTotalRevenue])
            if (linePeriod == "day") {
                const averageOrder = getTotalOrders.reduce((sum, num) => sum + num, 0) / getTotalOrders.length;
                const maxEntry = response.data.reduce((max, entry) => (entry.totalRevenue > max.totalRevenue ? entry : max), response.data[0]);
                setAverageOrder(averageOrder)
                setMaxRevenue(maxEntry)
            }
        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    return (
        <div className='pb-4xl hide-scrollbar'>
            <div className="text-neutral-1000 pb-xl "><MapContainer catalogList={catalogList} setAppliedFilter={setAppliedFilter} /></div>
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
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-l mt-l h-[400px]  ">
                <div className='col-span-2'>
                    {labels.length > 0 && totalOrders.length > 0 && <LineChart labels={linelabels} values={totalOrders} labelName="Total Orders" period={setLinePeriod} />}
                </div>

                <div className="col-span-2  bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Revenue By Order
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.5] text-center px-l'>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>{toCapitalizedCase(linePeriod)}</div>
                            <div className='py-m flex-1 text-center px-l'>Order</div>
                            <div className='py-m flex-1 text-center px-l'>Revenue</div>

                        </div>

                        {/* list area */}
                        <div className='flex text-f-m  h-[260px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {totalSalesOverTime.map((sale, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= totalSalesOverTime.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.5] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{sale._id}</div>
                                <div className='py-m px-l flex-1 text-center'>{sale.totalOrders}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(sale.totalRevenue).toFixed(2)}</div>

                            </div>))}
                        </div>
                        {/* list area */}
                    </div>


                </div>
            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-l mt-l h-[400px]">

                <div className="col-span-1 h-full relative bg-white text-neutral-1200  rounded-lg flex justify-between flex-col border-2 border-neutral-200 shadow-md">
                    <div className='px-xl'>
                        <div className='text-f-8xl px-xl text-center font-semibold  text-neutral-1200 pt-l'>Average</div>
                        <div className='text-f-8xl px-xl text-center font-semibold  text-neutral-1200 '> Order Value</div>
                        <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(orderSales.averageAmountSpentPerOrder)}</div>
                    </div>

                    <InfoToast info="This indicates the average order value of sales recorded in the system." top={2} right={2} innerRight={-70} />
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-xl text-neutral-900 text-f-xl text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                </div>
                <div className='col-span-2'>
                    {labels.length > 0 && totalOrders.length > 0 && <BarChart labels={labels} values={totalRevenue} labelName="Total Revenue" period={setBarPeriod} />}
                </div>
            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-l mt-l h-[400px]">
                <div className='col-span-2'>
                    {orderlabels.length > 0 && totalOrders.length > 0 && <LineChart labels={orderlabels} values={orderRevenue} labelName="Average Order Over Time" period={setOrderPeriod} />}
                </div>

                <div className="col-span-1 h-full bg-white rounded-lg flex flex-col border-2 border-neutral-200 shadow-md">

                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Order Value
                    </div>
                    <div className='p-xl pt-s '>
                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b-2 border-neutral-200  '>
                            <div className='py-m flex-[0.4] text-center px-l '>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>{toCapitalizedCase(linePeriod)}</div>
                            <div className='py-m flex-1 text-center px-l'>Average Order</div>

                        </div>
                        <div className='flex text-f-m  h-[300px]  flex-col overflow-y-scroll hide-scrollbar'>
                            {ordersOverTime.map((order, index) => (<div className={clsx(' flex  border-b-2 border-neutral-200  text-neutral-1200', index >= ordersOverTime.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.4] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{order.period}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(order.averageOrderValue).toFixed(2)}</div>

                            </div>))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TotalSales