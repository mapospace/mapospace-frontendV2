function generateCustomDateRanges() {
    const dateRanges = [];
    const currentDate = new Date();

    // Format with explicit UTC start time
    const formatStartDate = (date) => {
        const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
        return d.toISOString();
    };

    // Format with explicit UTC end time
    const formatEndDate = (date) => {
        const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59));
        return d.toISOString();
    };

    // Helper to subtract days
    const subtractDays = (date, days) => new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

    let startDate, endDate;

    // Today
    startDate = new Date();
    endDate = new Date();
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Today",
        id: 1
    });

    // Last 2 Days
    startDate = subtractDays(currentDate, 2);
    endDate = subtractDays(currentDate, 1);
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Last 2 days",
        id: 2
    });

    // Last 7 Days (Last Week)
    startDate = subtractDays(currentDate, 7);
    endDate = subtractDays(currentDate, 1);
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Last week",
        id: 3
    });

    // Last 14 Days (Last 2 Weeks)
    startDate = subtractDays(currentDate, 14);
    endDate = subtractDays(currentDate, 1);
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Last 2 weeks",
        id: 4
    });

    // Last 30 Days
    startDate = subtractDays(currentDate, 30);
    endDate = subtractDays(currentDate, 1);
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Last 30 days",
        id: 5
    });

    // Last 90 Days
    startDate = subtractDays(currentDate, 90);
    endDate = subtractDays(currentDate, 1);
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Last 90 days",
        id: 6
    });

    // Last 180 Days
    startDate = subtractDays(currentDate, 180);
    endDate = subtractDays(currentDate, 1);
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Last 180 days",
        id: 7
    });

    // Last 365 Days
    startDate = subtractDays(currentDate, 365);
    endDate = subtractDays(currentDate, 1);
    dateRanges.push({
        startDate: formatStartDate(startDate),
        endDate: formatEndDate(endDate),
        title: "Last 365 days",
        id: 8
    });

    return dateRanges;
}

export default generateCustomDateRanges;
