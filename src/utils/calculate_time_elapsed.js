const num_to_month_mapping = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}

const getTimeString = (stringified_date) => {
    const currentDate = new Date();
    const oldDate = new Date(JSON.parse(stringified_date));

    const minutes = Math.floor((currentDate.getTime() - oldDate.getTime())/(1000*60));
    const hours = Math.floor(minutes / 60);

    if (hours > 12) {
        return num_to_month_mapping[oldDate.getMonth()] + oldDate.getDate();
    } else if (minutes > 60) {
        return `${hours} hour${hours == 1 ? "": "s"} ago`;
    } else if (minutes > 1) {
        return `${minutes} minute${minutes == 1 ? "": "s"} ago`;
    } else {
        return "Now";
    }
}

export default getTimeString;