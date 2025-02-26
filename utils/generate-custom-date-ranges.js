function generateCustomDateRanges() {
    const dateRanges = [];
    const currentDate = new Date();

    // Helper function to format date as YYYY-MM-DD
    const formatDate = (date) => date.toISOString();

    // Last Month
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last month", id: 1 });

    // Last 3 Months
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last 3 months", id: 2 });

    // Last 6 Months
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last 6 months", id: 3 });

    // Last Year
    startDate = new Date(currentDate.getFullYear() - 1, 0, 1); // Jan 1st of last year
    endDate = new Date(currentDate.getFullYear() - 1, 11, 31); // Dec 31st of last year
    dateRanges.push({ startDate: formatDate(startDate), endDate: formatDate(endDate), title: "Last year", id: 4 });

    return dateRanges;
}


export default generateCustomDateRanges;