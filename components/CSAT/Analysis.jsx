import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import React, { useEffect, useState } from 'react'
import InfoToast from '../Common/InfoToast';
import toCapitalizedCase from '@/utils/capitalized-case';
import LineChart from '../Common/LineChart';
import clsx from 'clsx';
import BarChart from '../Common/BarChart';
import HistogramChart from '../Common/HistogramChart';
import HexaPolygonMap from '../Maps/HexaPolygonMap';
import { customError } from '../Common/Toast';

const Analysis = ({ appliedFilter }) => {
    const [scoreAnalysis, setScoreAnalysis] = useState({
        "averageCsatScore": 0,
        "totalTickets": 0
    })

    const [raisedByUsers, setRaisedByUsers] = useState({
        "averageTickets": 0,
        "totalUsers": 0
    })

    const [resolutionTime, setResolutionTime] = useState({
        "averageResolutionTime": 0,
        "totalTickets": 0
    })
    const [lineScorePeriod, setLineScorePeriod] = useState('day');
    const [lineScorelabels, setLineScoreLabels] = useState([]);
    const [lineScoreValues, setLineScoreValues] = useState([]);
    const [scoreOverTime, setScoreOverTime] = useState([])
    const [linePeriod, setLinePeriod] = useState('day');
    const [linelabels, setLineLabels] = useState([]);
    const [lineValues, setLineValues] = useState([]);
    const [avgResolutionTimes, setAvgResolutionTimes] = useState([]);
    const [barValues, setBarValues] = useState([]);
    const [barlabels, setBarLabels] = useState([]);
    const [totalTickets, setTotalTickets] = useState([]);
    const [histogramRanges, setHistogramRanges] = useState([0, 50, 100, 200])
    const [histogramData, setHistogramData] = useState([4, 6, 7, 8, 8])

    const [barPeeksValues, setBarPeeksValues] = useState([]);
    const [barPeekslabels, setBarPeeksLabels] = useState([]);

    const [lineSupportTicketPeriod, setLineSupportTicketPeriod] = useState('day');
    const [lineSupportTicketlabels, setLineSupportTicketLabels] = useState([]);
    const [lineSupportTicketValues, setLineSupportTicketValues] = useState([]);
    const [h3Data, setH3Data] = useState([])
    const [h3Resolution, setH3Resolution] = useState(1)


    useEffect(() => {
        if (appliedFilter != null) {
            scoreAnalysisHandler();
            raisedByUsersHandler();
            resolutionTimeAnalysisHandler();
            scoreDistributionByDayOfWeekHandler();
            peakHoursAnalysisHandler();
        }
    }, [appliedFilter])



    useEffect(() => {
        if (appliedFilter != null) {
            h3ClustingHandler(h3Resolution);
        }
    }, [appliedFilter, h3Resolution])

    useEffect(() => {
        if (appliedFilter != null) {
            resolutionTimeOverTimeHandler();
        }
    }, [appliedFilter, linePeriod])

    useEffect(() => {
        if (appliedFilter != null) {
            ScoreOverTimeHandler();
        }
    }, [appliedFilter, lineScorePeriod])



    useEffect(() => {
        if (appliedFilter != null) {
            supportTicketVolumeOverTimeHandler();
        }
    }, [appliedFilter, lineSupportTicketPeriod])


    useEffect(() => {
        if (appliedFilter != null) {
            supportTicketDistributionHandler(histogramRanges);
        }
    }, [appliedFilter, histogramRanges])

    const scoreAnalysisHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.ScoreAnalysis, appliedFilter);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("scoreAnalysisHandler", response.data)
            setScoreAnalysis(response.data)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const raisedByUsersHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.RaisedByUsers, appliedFilter);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("raisedByUsersHandler", response.data)
            setRaisedByUsers(response.data)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const resolutionTimeAnalysisHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.ResolutionTimeAnalysis, appliedFilter);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("resolutionTimeAnalysisHandler", response.data)
            setResolutionTime(response.data)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const resolutionTimeOverTimeHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.ResolutionTimeOverTime, { ...appliedFilter, "period": linePeriod });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("resolutionTimeOverTimeHandler", response.data)
            let getlabels = response.data.map(data => { return data._id })
            let averageResolutionTime = response.data.map(data => { return data.averageResolutionTime })
            setAvgResolutionTimes(response.data)
            setLineLabels(getlabels)
            setLineValues(averageResolutionTime)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const supportTicketVolumeOverTimeHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.SupportTicketVolumeOverTime, { ...appliedFilter, "period": lineSupportTicketPeriod });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("supportTicketVolumeOverTimeHandler", response.data)
            let getlabels = response.data.map(data => { return data._id })
            let averageResolutionTime = response.data.map(data => { return data.totalTickets })
            setLineSupportTicketLabels(getlabels)
            setLineSupportTicketValues(averageResolutionTime)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const ScoreOverTimeHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.ScoreOverTime, { ...appliedFilter, "period": lineScorePeriod });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("resolutionTimeOverTimeHandler", response.data)
            let getlabels = response.data.map(data => { return data._id })
            let scoreValues = response.data.map(data => { return data.averageCsatScore })
            setScoreOverTime(response.data)
            setLineScoreLabels(getlabels)
            setLineScoreValues(scoreValues)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const scoreDistributionByDayOfWeekHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.ScoreDistributionByDayOfWeek, appliedFilter);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("scoreDistributionByDayOfWeekHandler", response.data)
            // setResolutionTime(response.data)
            let getlabels = response.data.map(data => { return data.dayOfWeek })
            let getValues = response.data.map(data => { return data.totalTickets })
            setBarLabels(getlabels);
            setBarValues(getValues);
            setTotalTickets(response.data)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const peakHoursAnalysisHandler = async () => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.PeakHoursAnalysis, appliedFilter);

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            console.log("scoreDistributionByDayOfWeekHandler", response.data)
            // setResolutionTime(response.data)
            let getlabels = response.data.map(data => { return data.hour })
            let getValues = response.data.map(data => { return data.totalTickets })
            setBarPeeksLabels(getlabels);
            setBarPeeksValues(getValues);
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const supportTicketDistributionHandler = async (range) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.SupportTicketDistributionByLocation, { ...appliedFilter, 'scoreRanges': range });

            if (response?.error) {
                console.log(response.message || "Failed to fetch data.");
                return;
            }
            const data = response.data.map((data) => { return data.count })
            console.log("supportTicketDistributionHandler", data)
            setHistogramData(data)
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

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

    const h3ClustingHandler = async (resolution) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(API_ENDPOINTS.CSAT.SupportTicketDistributionByLocationH3, { ...appliedFilter, "h3Resolution": resolution });

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

    return (
        <div className='pb-4xl hide-scrollbar'>
            <div className=' gap-xl grid  grid-cols-4  mt-xl'>
                <div className='relative col-span-1 rounded-bs    bg-white text-black border   text-center'>
                    <div className='text-f-5xl px-xl text-start font-semibold  text-neutral-1200 pt-l'>Average Csat Score</div>
                    <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(scoreAnalysis.averageCsatScore.toFixed(2))}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This indicates the total number of sales recorded in the system." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative flex-1 rounded-bs   bg-white text-black  border  '>
                    <div className='text-f-5xl px-xl font-semibold text-start text-neutral-1200 pt-l'>Total Tickets Raised</div>
                    <div className='text-center px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(scoreAnalysis.totalTickets)}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This represents the total number of orders placed." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative col-span-1 rounded-bs    bg-white text-black border  '>
                    <div className='text-f-5xl px-xl font-semibold text-start text-neutral-1200 pt-l'>Average Ticket Per User</div>
                    <div className='text-center px-xl  font-semibold text-f-10xl text-secondary-900'>{formatNumber((raisedByUsers.averageTickets))}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This provides insight into the average value of orders over a specific period." top={2} right={2} innerRight={-70} />
                </div>
                <div className='relative flex-1 rounded-bs  bg-white text-black  border  '>
                    <div className='text-f-5xl px-xl font-semibold  text-start  text-neutral-1200 pt-l'>Average Resolution Time</div>
                    <div className='text-center  px-xl font-semibold text-f-10xl text-secondary-900'>{formatNumber(resolutionTime.averageResolutionTime.toFixed(2))}</div>
                    {appliedFilter && appliedFilter.startDate && appliedFilter.endDate && <div className='bg-neutral-200 px-xl py-s text-neutral-900 text-f-m text-start'> From:  {appliedFilter.startDate.split('T')[0]} - {appliedFilter.endDate.split('T')[0]}</div>}
                    <InfoToast info="This shows the highest revenue recorded and the corresponding date." top={2} right={2} innerRight={-40} popAlign={false} />
                </div>

            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-xl mt-xl  ">
                <div className='col-span-2'>
                    {linelabels.length > 0 && lineValues.length > 0 && <LineChart labels={linelabels} values={lineValues} labelName="Resolution Over Time" period={setLinePeriod} />}
                </div>

                <div className="col-span-2  bg-white rounded-bs flex flex-col border border-neutral-200 ">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Average Resolution Time
                    </div>
                    <div className='p-xl pt-s h-full '>

                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b border-neutral-200 '>
                            <div className='py-m flex-[0.5] text-center px-l'>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>{toCapitalizedCase(linePeriod)}</div>
                            <div className='py-m flex-[0.7] text-center px-l'>Total Tickets</div>
                            <div className='py-m flex-1 text-center px-l'>Avg Resolution Time</div>

                        </div>

                        <div className='flex text-f-m  h-[270px]  flex-col overflow-y-scroll hide-scrollbar bg-white'>
                            {avgResolutionTimes.map((avgResolutionTime, index) => (<div className={clsx(' flex  border-b border-neutral-200  text-neutral-1200', index >= avgResolutionTime.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.5] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{avgResolutionTime._id}</div>
                                <div className='py-m px-l flex-[0.7] text-center'>{avgResolutionTime.totalTickets}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(avgResolutionTime.averageResolutionTime).toFixed(2)}</div>

                            </div>))}
                        </div>

                    </div>


                </div>
            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-xl mt-xl h-[400px]">

                <div className="col-span-2  bg-white rounded-bs flex flex-col border border-neutral-200 ">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Score Distribution By Day Of Week
                    </div>
                    <div className='p-xl pt-s h-full '>

                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b border-neutral-200 '>
                            <div className='py-m flex-[0.5] text-center px-l'>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>Days</div>
                            <div className='py-m flex-1 text-center px-l'>Total Tickets</div>
                            <div className='py-m flex-1 text-center px-l'>Avg Csat Score</div>

                        </div>

                        <div className='flex text-f-m  h-[270px]  flex-col overflow-y-scroll hide-scrollbar bg-white'>
                            {totalTickets.map((totalTicket, index) => (<div className={clsx(' flex  border-b border-neutral-200  text-neutral-1200', index >= totalTicket.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.5] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{totalTicket.dayOfWeek}</div>
                                <div className='py-m px-l flex-1 text-center'>{totalTicket.totalTickets}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(totalTicket.averageCsatScore).toFixed(2)}</div>

                            </div>))}
                        </div>

                    </div>


                </div>
                <div className='col-span-2'>
                    {barlabels.length > 0 && barValues.length > 0 && <BarChart labels={barlabels} values={barValues} labelName="  Score Distribution " showPeriod={false} />}
                </div>
            </div>
            <div className=' gap-xl grid  grid-cols-4 mt-xl  min-h-[500px]'>


                <div className="col-span-4 h-full bg-white rounded-bs flex flex-col border">

                    <HistogramChart data={histogramData} bins={histogramRanges} setBins={setHistogramRanges} label="Support Ticket Distribution" />


                </div>

            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-xl mt-xl  ">
                <div className='col-span-2'>
                    {lineScorelabels.length > 0 && lineScoreValues.length > 0 && <LineChart labels={lineScorelabels} values={lineScoreValues} labelName="Score Over Time" period={setLineScorePeriod} />}
                </div>

                <div className="col-span-2  bg-white rounded-bs flex flex-col border border-neutral-200 ">
                    <div className='px-xl pb-s pt-l text-f-l font-semibold text-neutral-1200 '>
                        Score Over Time
                    </div>
                    <div className='p-xl pt-s h-full '>

                        <div className=' text-f-m font-semibold text-neutral-1200 flex bg-neutral-200 border-b border-neutral-200 '>
                            <div className='py-m flex-[0.5] text-center px-l'>S. No</div>
                            <div className='py-m flex-1 text-center px-l  border-neutral-900'>{toCapitalizedCase(lineScorePeriod)}</div>
                            <div className='py-m flex-[0.7] text-center px-l'>Total Tickets</div>
                            <div className='py-m flex-1 text-center px-l'>Avg Csat Score</div>

                        </div>

                        <div className='flex text-f-m  h-[270px]  flex-col overflow-y-scroll hide-scrollbar bg-white'>
                            {scoreOverTime.map((score, index) => (<div className={clsx(' flex  border-b border-neutral-200  text-neutral-1200', index >= scoreOverTime.length - 1 && 'border-b-0')} key={index} >
                                <div className='py-m px-l flex-[0.5] text-center'>{index + 1}</div>
                                <div className='py-m px-l flex-1 text-center  '>{score._id}</div>
                                <div className='py-m px-l flex-[0.7] text-center'>{score.totalTickets}</div>
                                <div className='py-m px-l flex-1 text-center'>{Number(score.averageCsatScore).toFixed(2)}</div>

                            </div>))}
                        </div>

                    </div>


                </div>
            </div>

            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-xl mt-xl h-[400px]">

                <div className='col-span-2'>
                    {lineSupportTicketlabels.length > 0 && lineSupportTicketValues.length > 0 && <LineChart labels={lineSupportTicketlabels} values={lineSupportTicketValues} labelName="Support Ticket" period={setLineSupportTicketPeriod} />}
                </div>
                <div className='col-span-2'>
                    {barPeekslabels.length > 0 && barPeeksValues.length > 0 && <BarChart labels={barPeekslabels} values={barPeeksValues} labelName="Peak Hours Analysis" showPeriod={false} />}
                </div>
            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-xl mt-xl h-[600px]">


                <HexaPolygonMap h3Data={h3Data} setH3Resolution={setH3Resolution} label="Support Ticket Distribution" type="csat" />
            </div>


        </div>
    )
}

export default Analysis