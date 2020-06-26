function parseTime(fullStartTime, endTime) {
    let newTime = new Date();
    newTime.setFullYear(endTime.slice(0, 4));
    newTime.setMonth(parseInt(endTime.slice(4, 6)) - 1);
    newTime.setDate(endTime.slice(6, 8));
    newTime.setHours(fullStartTime.slice(8, 10));
    newTime.setMinutes(fullStartTime.slice(10 ,12));
    newTime.setSeconds(0);
    newTime.setMilliseconds(0);
    return newTime;
};

function isOutDated(fullStartDate, endDate) {
    return parseTime(fullStartDate, endDate) <= Date();
};

module.exports = {
    parseTime: parseTime,
    isOutDated: isOutDated
};